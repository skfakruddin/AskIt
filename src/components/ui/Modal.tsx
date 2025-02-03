import { useForm } from 'react-hook-form'
import { useAuth } from '../../store/AuthProvider'
import googleIcon from '../../assets/googleIcon.svg'
import Button from './Button'
import ModalInput from './ModalInput'
import { useNavigate } from 'react-router'
import { createRoom } from '../../handlers/initRoom'
interface ModalProps {
  type: 'createRoom' | 'joinRoom'
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  joinCode?: string
}

const Modal = ({ type, isOpen, setIsOpen, joinCode }: ModalProps) => {
  const { user, login } = useAuth()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  async function handleFormSubmit (data: any) {
    console.log('data: ', data)
    if (!user) {
      localStorage.setItem('loginIntent', type)
      localStorage.setItem('intentData', JSON.stringify(data))
      console.log('Login in Modal')
      login()
    } else {
      if (type == 'createRoom') {
        const newRoom = await createRoom(data)
        if (newRoom.error) {
          console.log('Error creating room: ', newRoom.message)
          navigate('/')
        } else {
          console.log('New room created: ', newRoom)
          navigate(`/ask/${newRoom.joinCode}`)
        }
      } else if (type == 'joinRoom') {
        navigate(`/ask/${data.joinCode}`)
      }
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`flex flex-col rounded-lg 
                    glass-card p-5 w-96
                     ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className='flex justify-between pb-3'>
          <h1 className={`text-xl `}>
            {type == 'createRoom' ? 'Create Room' : 'Join Room'}
          </h1>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        {type === 'createRoom' && (
          <>
            <ModalInput
              id='roomTitle'
              label='Room Title'
              placeholder='Enter Room Title'
              register={register}
              type='text'
              key={1}
            ></ModalInput>
            <ModalInput
              id='roomDescription'
              label='Room Description'
              placeholder='Enter Room Description'
              register={register}
              type='text'
              key={2}
            ></ModalInput>
          </>
        )}
        {type === 'joinRoom' &&
          (joinCode ? (
            <ModalInput
              id='joinCode'
              label='Enter Code / Link'
              placeholder='Enter Join Code'
              register={register}
              type='text'
              key={3}
              defaultValue={joinCode}
            ></ModalInput>
          ) : (
            <ModalInput
              id='joinCode'
              label='Enter Code / Link'
              placeholder='Enter Join Code'
              register={register}
              type='text'
              key={3}
            ></ModalInput>
          ))}

        {user === null ? (
          <Button
            text='Login'
            variant='primary'
            className='mt-5'
            action={() => login()}
            icon={
              <img src={googleIcon} alt='google icon' className='w-5 h-5' />
            }
          ></Button>
        ) : type === 'joinRoom' ? (
          <button type='submit'>Join Room</button>
        ) : (
          <button type='submit'>Create Room</button>
        )}
      </form>
    </div>
  )
}
export default Modal
