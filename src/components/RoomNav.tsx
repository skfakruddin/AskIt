import toast from 'react-hot-toast'
import { useRoom } from '../hooks/useRoom'
import { endRoom, leaveRoom } from '../handlers/socketHandlers'
import { useNavigate } from 'react-router'
type RoomNavProps = {
  roomName: string
  roomDescription?: string
  joinCode: string
  attendeeCount?: number
  askCount?: number
  answeredCount?: number
  role: 'speaker' | 'attendee'
}

function RoomNav ({
  roomName,
  joinCode,
  attendeeCount,
  askCount,
  answeredCount,
  role
}: RoomNavProps) {
  const link = window.location.href
  function CopyToClipboard () {
    navigator.clipboard.writeText(link)
    toast('Link Copied', {
      icon: '🔗'
    });
  };

  if(roomName.split('').length>15){
    roomName = roomName.slice(0,10)+'...'
  }

  const { socketRef } = useRoom()
  const navigate = useNavigate()

  return (
    <>
      <div className='flex items-center justify-between w-full mb-5 roomFont'>
        <div className='bg-dlightgrey px-2 py-2 rounded-md '>
          <p className='text-white'>{roomName}</p>
        </div>
        <div
          onClick={CopyToClipboard}
          className='bg-dlightgrey px-4 py-2 cursor-pointer rounded-md'
        >
          <p className='text-white '>{joinCode}</p>
        </div>
        <div className='flex items-center text-white space-x-4 justify-center'>
          <div className='hidden lg:flex'>
            <div className='bg-dlightgrey px-4 py-2 rounded-l-md'>
              <p className='text-white'>
                Attendees {attendeeCount}
                <span className='mx-3'>|</span>
              </p>
            </div>
            <div className='bg-dlightgrey pe-4 py-2'>
              <p className='text-white'>
                Asks {askCount} <span className='mx-3'>|</span>
              </p>
            </div>
            <div className='bg-dlightgrey pe-4 py-2 rounded-r-md'>
              <p className='text-white'>Answered {answeredCount} </p>
            </div>
          </div>
        </div>

        {role === 'speaker' ? (
          <button
            onClick={() => {
              if (socketRef) endRoom(socketRef, joinCode)
              navigate('/')
              toast('Room Ended', {
                icon: '🔚'
              })
            }}
            className='bg-dlightgrey text-red-600 px-6 py-2 rounded-md hover:bg-gray-700 transition'
          >
            End
          </button>
        ) : (
          <button
          onClick={() => {
            if (socketRef) leaveRoom(socketRef, joinCode)
            navigate('/')
            toast('Room Left', {
              icon: '🚪'
            })
          }}
            className='bg-dlightgrey text-red-600 px-6 py-2 rounded-md hover:bg-gray-700 transition'
          >
            Leave
          </button>
        )}
      </div>
    </>
  )
}

export default RoomNav
