import { createContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import {
  generateRandomEmoji,
  joinRoomHandler
} from '../handlers/socketHandlers'
import { joinRoom } from '../handlers/initRoom'
import toast from 'react-hot-toast'
import { ask, Asks } from '../types/AskTypes'

const RoomContext = createContext<{
  loading: boolean
  joinCode: string
  setJoinCode: (joinCode: string) => void
  roomName: string
  roomDescription: string
  socketRef: WebSocket | null
  asks: Asks
  setAsks: React.Dispatch<React.SetStateAction<Asks>>
  joinCount: number
  answeredCount: number
  role: 'attendee' | 'speaker'
}>(null as any)

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [joinCode, setJoinCode] = useState<string>('')
  const [roomName, setRoomName] = useState<string | null>(null)
  const [roomDescription, setRoomDescription] = useState<string | null>(null)
  const navigate = useNavigate()
  const { user } = useAuth()
  const socketRef = useRef<WebSocket | null>(null)
  const [asks, setAsks] = useState<Asks>({})

  const [joinCount, setJoinCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [role, setRole] = useState<'attendee' | 'speaker'>('attendee')

  const [, forceUpdate] = useState(0)

  useEffect(() => {
    if (joinCode) {
      setLoading(true)
      joinRoom(joinCode)
        .then(joinedRoom => {
          if (joinedRoom.error) {
            console.error('error:', joinedRoom)
            toast.error(joinedRoom.message || 'Error joining room')
            navigate('/')
          } else {
            toast.success('Room joined successfully')
            const room = joinedRoom.room
            if (room) {
              setRoomName(room.title)
              setRoomDescription(room.description)
            } else {
              setRoomName('Untitled Room')
              setRoomDescription('No description provided')
            }
          }
        })
        .then(() => {
          if (user) {
            const token = user.token
            socketRef.current = new WebSocket(
              'wss://4cfw3zvk-8080.inc1.devtunnels.ms/',
              token
            )
            socketRef.current.onopen = () => {
              setLoading(false)
              forceUpdate(prev => prev + 1)
              if (socketRef.current)
                joinRoomHandler(socketRef.current as WebSocket, joinCode)
            }
            socketRef.current.onmessage = event => {
              const message = JSON.parse(event.data)
              if (message.type === 'joinPing' || message.type === 'leavePing') {
                setJoinCount(message.payload.attendees)
              }
              if (message.type === 'joinNotify') {
                setRole(message.payload.role)
                const newAsks: Record<string, ask> = {}
                const asks = message.payload.asks
                for (const ask of asks) {
                  const isUpvoted = ask.upvotedBy.includes(user._id)
                  newAsks[ask.id] = {
                    askId: ask.id,
                    question: ask.question,
                    upvotes: ask.upvotes,
                    answered: ask.answered,
                    upvoted: isUpvoted,
                    emoji: generateRandomEmoji()
                  }
                }
                setAsks(prevAsks => ({ ...prevAsks, ...newAsks }))
              }
              if (message.type === 'endRoomPing') {
                toast.error('Room has been ended')
                navigate('/')
              }
              if (message.type === 'askPing') {
                if (message.payload) {
                  const newAsk: ask = {
                    askId: message.payload.id,
                    question: message.payload.ask,
                    upvotes: message.payload.upvote,
                    answered: false,
                    upvoted: false,
                    emoji: generateRandomEmoji()
                  }
                  setAsks(prevAsks => ({
                    ...prevAsks,
                    [message.payload.id]: newAsk
                  }))
                }
              }

              if(message.type==="answeredPing"){
                if(message.payload){
                  const askId = message.payload.id;
                  setAsks(prevAsks => {
                    const newAsks = { ...prevAsks };
                    Object.values(newAsks).forEach(ask=>{
                      if(ask.askId === askId){
                        ask.answered = !ask.answered;
                      }
                    })
                    return newAsks;
                  });
                }
              }

              if (message.type === "upvotePing") {
                if (message.payload) {
                  const askId = message.payload.id;
                  const upvotes = message.payload.upvote;
                  const upvotedBy = message.payload.upvotedBy;
                  setAsks(prevAsks => {
                    const newAsks = { ...prevAsks };
                    Object.values(newAsks).forEach(ask=>{
                      if(ask.askId === askId){
                        ask.upvotes = upvotes;
                        ask.upvoted = upvotedBy.includes(user._id);
                      }
                    })
                    return newAsks;
                  });
                }
              }
            }
          }
        })
    }
    return () => {
      if (socketRef.current) socketRef.current.close()
    }
  }, [joinCode, user, navigate])

  useEffect(() => {
    setAnsweredCount(Object.values(asks).filter(ask => ask.answered).length);
  }, [asks])

  return (
    <RoomContext.Provider
      value={{
        setJoinCode,
        joinCode,
        roomName: roomName || '',
        roomDescription: roomDescription || '',
        socketRef: socketRef.current,
        asks,
        joinCount: joinCount || 0,
        answeredCount: answeredCount || 0,
        role,
        loading: loading,
        setAsks
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomProvider



export {RoomContext}