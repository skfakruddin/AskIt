import { useState, useEffect } from 'react'
import Modal from '../components/ui/Modal'
import { useAuth } from '../store/AuthProvider'
import { createRoom } from '../handlers/initRoom'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'
type CreateRoomHandlerType = {
  roomTitle: string
  roomDescription: string
}
function HomePage () {
  const [isCreateRoom, setIsCreateRoom] = useState(false)
  const [isJoinRoom, setIsJoinRoom] = useState(false)
  const [joinCodeState, setJoinCodeState] = useState<string | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const {joinCode} = useParams();

  useEffect(()=>{
    if(joinCode){
      setJoinCodeState(joinCode)
      setIsJoinRoom(true)
    }
  },[joinCode])

  useEffect(() => {
    const loginIntent = localStorage.getItem('loginIntent')
    let data = localStorage.getItem('intentData')
    const intentData = data ? JSON.parse(data) : null
    if (loginIntent === 'createRoom' && intentData && user) {
      console.log('creating room', intentData)
      createRoom(intentData as CreateRoomHandlerType).then(createdRoom => {
        if (createdRoom.error) {
          console.log('Error creating room', createdRoom.error)
          toast.error('Error creating room')
        } else {
          console.log('Room created', createdRoom)
          toast.success('Room created')
          navigate(`/ask/${createdRoom.room.joinCode}`)
        }
      })
      localStorage.removeItem('loginIntent')
      localStorage.removeItem('intentData')
    } else if (loginIntent === 'joinRoom' && intentData && user) {
      console.log('joining room', intentData)
      if(!(intentData.joinCode === '' || intentData.joinCode === null || intentData.joinCode === undefined)) {
        navigate(`/ask/${intentData.joinCode}`)
        localStorage.removeItem('loginIntent')
        localStorage.removeItem('intentData')
      }
    }
  }, [user])

  return (
    <>
      <div className='flex items-center justify-center h-[calc(100vh-26rem)]  sm:h-[calc(100vh-20rem)] mt-16'>
        <div>
          <h1 className='font-dm-sans text-center text-7xl sm:text-8xl font-bold navFont'>
            Ask It.
          </h1>
          <div className='flex justify-center mt-5 gap-5'>
            {/* Ended Button */}
            {/* <button className='bg-dgrey text-dgreen font-bold rounded-md flex items-end h-20 p-5'>
              Create Room
            </button> */}
            <button
              onClick={() => {
                setIsCreateRoom(true)
              }}
              className='bg-dgrey cursor-pointer sm:py-4 sm:px-5 p-3 text-dgreen text-end sm:font-bold font-semibold  hover:bg-dgreen hover:bg-opacity-70 hover:text-black  rounded-md'
            >
              Create Room
            </button>
            <button
              onClick={() => {
                setIsJoinRoom(true)
              }}
              className='bg-dgrey cursor-pointer sm:py-4 sm:px-5 p-3 text-dgreen text-end sm:font-bold hover:bg-dgreen hover:bg-opacity-70 hover:text-black font-semibold rounded-md'
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
      <div 
        className={
          `absolute -z-100 
           top-[55%] left-1/2
          -translate-x-1/2 -translate-y-1/2 
          bg-dgreen max-w-[636px] w-[60vw] h-[30vh]
          rounded-full blur-[14vh] md:blur-[25vh]`
        }>
      </div>
      {isCreateRoom && (
        <Modal
          type='createRoom'
          isOpen={isCreateRoom}
          setIsOpen={setIsCreateRoom}
        />
      )}
      {isJoinRoom && (
        joinCodeState? <Modal type='joinRoom' isOpen={isJoinRoom} setIsOpen={setIsJoinRoom} joinCode={joinCodeState} /> :
        <Modal type='joinRoom' isOpen={isJoinRoom} setIsOpen={setIsJoinRoom} />
      )}
    </>
  )
}

export default HomePage
