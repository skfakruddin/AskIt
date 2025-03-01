import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useProfile } from "../hooks/useProfile";
import Sidebar from "../components/Sidebar";
import ProfileStats from "../components/ProfileStats";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams<{ joinCode: string }>();
  const { archive, isInRoom, setIsInRoom, currentRoom, setCurrentRoom, setJoinCode } = useProfile();
  useEffect(() => {
    if (!params.joinCode) {
      setIsInRoom(false);
      navigate("/profile");
      setJoinCode("")
      return () => {
        setCurrentRoom(null);
      };
    } else {
      setJoinCode(params.joinCode!);
      setIsInRoom(true);
    }
  }, [params.joinCode]);


  return (
    <div className="flex flex-col w-full">
      <ProfileStats
        created={archive.createdRooms.count}
        attended={archive.joinedRooms.count}
        asks={currentRoom?.length!}
      />
      <div className="flex flex-col h-[calc(100vh-16rem)] w-full sm:h-[calc(100vh-11rem)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4 flex-grow h-full">
          <div
            className={
              `${
                !isInRoom ? "flex" : "hidden md:flex"
              } col-span-2 bg-dcardbg rounded-lg h-full overflow-y-scroll  scrollbar-hide -webkit-scrollbar-button`
            }
          >
            <Sidebar isOpen={true} />
          </div>
          <div
            className={
              `${
                isInRoom ? "flex" : "hidden md:flex"
              } flex-col col-span-4 bg-dcardbg rounded-lg overflow-x-hidden  overflow-y-scroll`
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;