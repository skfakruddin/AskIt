import { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export type Ask = {
  question: string
  timestamp: string
  replies: any[]
  _id: string
}

export type Room = {
  joinCode: string
  title: string
}

export type ArchiveRooms = {
  count: number
  rooms: Room[]
}

export type Archive = {
  createdRooms: ArchiveRooms
  joinedRooms: ArchiveRooms
}

export type ProfileContextType = {
  archive: Archive
  fetchRoom: (joinCode: string) => Promise<any>
  isInRoom: boolean
  setIsInRoom: React.Dispatch<React.SetStateAction<boolean>>
  sendReply: (askId: string, reply: string) => void
  currentRoom: Ask[] | null
  setCurrentRoom: React.Dispatch<React.SetStateAction<Ask[] | null>>
  joinCode: string
  setJoinCode: React.Dispatch<React.SetStateAction<string>>
}

export const ProfileContext = createContext<ProfileContextType>({
  archive: {
    createdRooms: {
      count: 0,
      rooms: []
    },
    joinedRooms: {
      count: 0,
      rooms: []
    }
  },
  fetchRoom: async () => {},
  isInRoom: false,
  setIsInRoom: () => {},
  sendReply: () => {},
  currentRoom: null,
  setCurrentRoom: () => {},
  joinCode: '',
  setJoinCode: () => {}
})

export const ProfileProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [archive, setArchive] = useState<Archive>({
    createdRooms: { count: 0, rooms: [] },
    joinedRooms: { count: 0, rooms: [] }
  })
  const [isInRoom, setIsInRoom] = useState<boolean>(false)
  const [currentRoom, setCurrentRoom] = useState<Ask[] | null>(null)
  const [joinCode, setJoinCode] = useState<string>('')
  useEffect(() => {
    if (joinCode === '') {
      return
    }
    fetchRoom(joinCode)
      .then(data => {
        setCurrentRoom(data.room.asks)
      })
      .catch(() => {
        setCurrentRoom(null)
      })
    return () => {
      setCurrentRoom(null)
    }
  }, [joinCode])

  async function fetchData () {
    const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/archive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json()
    if (data.error) {
      setArchive({
        createdRooms: {
          count: 0,
          rooms: []
        },
        joinedRooms: {
          count: 0,
          rooms: []
        }
      })
    } else {
      setArchive(data.archive)
      // setArchive(dummyArchive);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  async function fetchRoom (joinCode: string) {
    const res = await fetch(
      `${import.meta.env.VITE_BE_URL}/user/room/?joincode=${joinCode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }
    )
    const data = await res.json()
    if (data.error) {
      // navigate('/profile');
      setIsInRoom(false)
      toast('Room not found', {
        icon: '🚫'
      })
    } else {
      setIsInRoom(true)
      return data
    }
  }

  async function sendReply (askId: string, reply: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          askId,
          reply
        })
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.messge)
      } else {
        setCurrentRoom(prev => {
          if (prev) {
            const newRoom = prev.map(ask => {
              if (ask._id === askId) {
                ask.replies.push(data.reply)
              }
              return ask
            })
            return newRoom
          } else {
            return prev
          }
        })
        toast.success(data.message)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        archive,
        fetchRoom,
        isInRoom,
        setIsInRoom,
        sendReply,
        currentRoom,
        setCurrentRoom,
        joinCode,
        setJoinCode
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
