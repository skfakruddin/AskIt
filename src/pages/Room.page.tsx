import { useParams } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import Bento from '../components/Bento'
import RoomNav from '../components/RoomNav'
import { useRoom } from '../store/RoomProvider'

interface JoinedRoom {
  room: {
    title: string
    description: string
  }
  error?: boolean
  message?: string
}
const Room = () => {
  const navigate = useNavigate()

  const {
    setJoinCode,
    loading,
    roomDescription,
    roomName,
    answeredCount,
    asks,
    joinCount,
    role,
    socketRef
  } = useRoom()

  const { joinCode } = useParams<{ joinCode: string }>()

  useEffect(() => {
    if (joinCode) {
      setJoinCode(joinCode)
    };
    console.log("Loading state in Room:", loading);
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
