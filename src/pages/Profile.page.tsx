import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useProfile } from "../hooks/useProfile";
import Sidebar from "../components/Sidebar";
import ProfileStats from "../components/ProfileStats";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<{ joinCode: string }>();
  const [joinCode, setJoinCode] = useState<string>("");
  const { archive, fetchRoom, isInRoom, setIsInRoom, currentRoom, setCurrentRoom } = useProfile();

  // Update joinCode and isInRoom when params.joinCode changes
  useEffect(() => {
    console.log("params: ", params);
    if (!params.joinCode) {
      setIsInRoom(false);
      navigate("/profile");
      return () => {
        setCurrentRoom(null);
      };
    } else {
      setJoinCode(params.joinCode!);
      setIsInRoom(true);
    }
  }, [params.joinCode]);

  // Fetch room data when joinCode changes
  useEffect(() => {
    if (joinCode === "") {
      return;
    }
    fetchRoom(joinCode)
      .then((data) => {
        setCurrentRoom(data.room.asks);
      })
      .catch(() => {
        setCurrentRoom(null);
      });
    return () => {
      setCurrentRoom(null); // Reset currentRoom when the component unmounts
    };
  }, [joinCode]);

  return (
    <div className="flex flex-col w-full">
      <ProfileStats
        created={archive.createdRooms.count}
        attended={archive.joinedRooms.count}
        asks={currentRoom?.length!}
      />

      <div className="flex flex-col h-[calc(100vh-16rem)] w-full sm:h-[calc(100vh-11rem)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4 flex-grow h-full">
          {/* Sidebar - Hidden on mobile when in a room */}
          <div
            className={
              `${
                !isInRoom ? "flex" : "hidden md:flex"
              } col-span-2 bg-dcardbg rounded-lg h-full overflow-y-scroll scrollbar-hide -webkit-scrollbar-button`
            }
          >
            <Sidebar isOpen={true} />
          </div>

          {/* Outlet - Hidden on mobile when not in a room */}
          <div
            className={
              `${
                isInRoom ? "flex" : "hidden md:flex"
              } flex-col col-span-4 bg-dcardbg rounded-lg p-4 overflow-y-scroll`
            }
          >
            <Outlet key={joinCode} /> {/* Add key prop to force re-render */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;