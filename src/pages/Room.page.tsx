import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { joinRoom } from '../handlers/initRoom'
import { useNavigate } from 'react-router'

interface JoinedRoom
{
  room: {
    title: string,
    description: string
  };
  error?: boolean,
  message?: string
}
const Room = () => {
  const { joinCode } = useParams<{ joinCode: string }>()
  const [loading, setLoading] = useState(true)
   const [roomName, setRoomName] = useState<string|null>(null)
   const [roomDescription, setRoomDescription] = useState<string|null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('joinCode:', joinCode)
  }, [joinCode])

  useEffect(() => {
    if (joinCode) {
      joinRoom(joinCode).then((joinedRoom) => {
        if (joinedRoom.error) {
          console.log('error:', joinedRoom)
          toast.error(joinedRoom.message || "Error joining room")
          navigate('/')
        } else {
          console.log('joinedRoom:', joinedRoom)
          toast.success('Room joined successfully')
          const room = joinedRoom.room;
          console.log('room:', room)
          if(room ){
            setRoomName(room.title)
            setRoomDescription(room.description)
          }
          else{
            setRoomName('Untitled Room')
            setRoomDescription('No description provided')
          }
          setLoading(false)
        }
      })
    }
  }, [joinCode])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-3xl font-semibold  text-white-800 mb-4">{roomName}</h1>
          <p>Description: {roomDescription}</p>
          <p>Room code: {joinCode}</p>
        </>
      )}
    </>
  )
}
export default Room
