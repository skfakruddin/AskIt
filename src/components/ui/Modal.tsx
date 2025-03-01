import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import googleIcon from '../../assets/googleIcon.svg'
import Button from './Button'
import ModalInput from './ModalInput'
import { useNavigate } from 'react-router'
import { createRoom } from '../../handlers/initRoom'
import toast from 'react-hot-toast'
import { useEffect, useRef } from 'react'
interface ModalProps {
  type: 'createRoom' | 'joinRoom'
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  joinCode?: string
}

const Modal = ({ type, isOpen, setIsOpen, joinCode }: ModalProps) => {
  const { user, login } = useAuth()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])


  // Function to extract the join code from input
  function extractJoinCode(input: string): string | null {
    const regex = /(?:^|\b|\/)(\d{6})(?:$|\b|\/)/;
    const match = input.match(regex);
    return match ? match[1] : null;
  }

  async function handleFormSubmit (data: any) {
    if (!user) {
      localStorage.setItem('loginIntent', type)
      localStorage.setItem('intentData', JSON.stringify(data))
      login()
    } else {
      if (type == 'createRoom') {
        if(!data.roomTitle || !data.roomDescription){
          toast.error('Please fill all the fields');
          return;
        }
        const newRoom = await createRoom(data)
        if (newRoom.error) {
          console.error('Error creating room: ', newRoom.message)
          navigate('/')
        } else {
          navigate(`/ask/${newRoom.joinCode}`)
        }
      } else if (type == 'joinRoom') {
        const extractedCode = extractJoinCode(data.joinCode);
        if (!extractedCode) {
          toast.error('Invalid Join Code or Link');
          return;
        }
        navigate(`/ask/${extractedCode}`)
      }
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <form
        ref={modalRef}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`flex flex-col rounded-lg 
                    bg-dmodel backdrop-blur-lg p-5 w-96
                     ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className='flex justify-center pb-3'>
          <h1 className={`text-2xl text-center`}>
            {type == 'createRoom' ? 'Create Room' : 'Join Room'}
          </h1>
          {/* <button onClick={() => setIsOpen(false)} className=''>Close</button> */}
        </div>
        {type === 'createRoom' && (
          <>
            <ModalInput
              id='roomTitle'
              label='Title'
              placeholder=''
              register={register}
              type='text'
              key={1}
              inputClassName='mb-3 py-1'
            ></ModalInput>
            <ModalInput
              id='roomDescription'
              label='Description'
              placeholder=''
              register={register}
              type='text'
              key={2}
              inputClassName='mb-3 py-4'
            ></ModalInput>
          </>
        )}
        {type === 'joinRoom' &&
          (joinCode ? (
            <ModalInput
              id='joinCode'
              label='Enter Code / Link'
              placeholder=''
              register={register}
              type='text'
              key={3}
              inputClassName='mb-3'
              defaultValue={joinCode}
            ></ModalInput>
          ) : (
            <ModalInput
              id='joinCode'
              label='Enter Code / Link'
              placeholder=''
              register={register}
              type='text'
              key={3}
              inputClassName='mb-3 py-1'
            ></ModalInput>
          ))}

        {user === null ? (
          <Button
            text='Login to Create'
            variant='primary'
            className='mt-2 bg-[#1e1e1e] border-0'
            action={() => login()}
            icon={
              <img src={googleIcon} alt='google icon' className='w-5 h-5' />
            }
          ></Button>
        ) : type === 'joinRoom' ? (
          <button type='submit' className={`mt-2 bg-[#1e1e1e] border-0 py-2 font-bold rounded-sm cursor-pointer`}>Join Room</button>
        ) : (
          <button type='submit' className={`mt-2 bg-[#1e1e1e] border-0 py-2 font-bold rounded-sm cursor-pointer`}>Create Room</button>
        )}
        <Button
          text='Cancel'
          variant='danger'
          className='mt-2 text-red-500 bg-[#1e1e1e] border-0 h'
          action={() => setIsOpen(false)}
        ></Button>
      </form>
    </div>
  )
}
export default Modal
