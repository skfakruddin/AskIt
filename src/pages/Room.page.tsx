import { useParams } from 'react-router'
import { useEffect } from 'react'
import Bento from '../components/Bento'
import RoomNav from '../components/RoomNav'
import { useRoom } from '../hooks/useRoom'

const Room = () => {
  const {
    setJoinCode,
    loading,
    roomDescription,
    roomName,
    answeredCount,
    asks,
    joinCount,
    role,
  } = useRoom()

  const { joinCode } = useParams<{ joinCode: string }>()

  useEffect(() => {
    if (joinCode) {
      setJoinCode(joinCode)
    };
  }, [joinCode,setJoinCode, loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-140px)]">
        <p className="text-xl font-semibold">Joining Room...</p>
      </div>
    )
  }

  return (
    <>
      <RoomNav
        roomName={roomName as string}
        roomDescription={roomDescription as string}
        joinCode={joinCode as string}
        attendeeCount={joinCount}
        askCount={Object.keys(asks).length}
        answeredCount={answeredCount}
        role={role}
      />
      <Bento />
    </>
  )
}
export default Room
