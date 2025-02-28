import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useParams } from "react-router"
import { useNavigate } from 'react-router'
import { useProfile } from "../hooks/useProfile"
import Sidebar from "../components/Sidebar"
import ProfileStats from "../components/ProfileStats"
import { Archive, Ask, Room } from "../store/ProfileProvider"
import Thread from "../components/Thread"


const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const params = useParams<{ joinCode: string }>();
  const [joinCode, setJoinCode] = useState<string>('');
  const { fetchRoom, isInRoom, setIsInRoom, currentRoom, setCurrentRoom } = useProfile();

  useEffect(() => {
    console.log('params: ', params);
    if (!params.joinCode) {
      setIsInRoom(false);
      navigate('/profile')
    }
    else {
      setJoinCode(params.joinCode!);
    }
  }, [params.joinCode]);

  // For Getting the Room Data
  useEffect(() => {
    if (joinCode === '') {
      return;
    }
    fetchRoom(joinCode)
      .then((data) => {
        setCurrentRoom(data.room.asks);
      })
      .catch(() => {
        setCurrentRoom(null);
      })
  }, [joinCode]);


  return (
    <div className="flex flex-col w-full">
      {/* <ProfileStats
        created={createdRooms.count}
        attended={joinedRooms.count}
        answered={12}
      /> */}
      <ProfileStats
        created={888}
        attended={888}
        answered={888}
      />

      <div className="flex flex-col h-[calc(100vh-16rem)] w-full sm:h-[calc(100vh-11rem)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4 flex-grow h-full">
          <div className={
            `${!isInRoom ? 'flex' : 'hidden md:flex'}
            col-span-2 bg-dcardbg rounded-lg h-full overflow-y-scroll scrollbar-hide -webkit-scrollbar-button`
          } >
            <Sidebar isOpen={true} />
          </div>
          <div className={
            `${isInRoom ? 'flex' : 'hidden'}
             md:flex flex-col col-span-4 bg-dcardbg rounded-lg p-4 overflow-y-scroll`
          }>
            {
              currentRoom &&
              (
                currentRoom.map((ask, index) => {
                  return (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col justify-between">
                        {/* <div className="text-lg">{ask.question}</div> */}
                        <Thread
                          ask={ask}
                        />
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile
