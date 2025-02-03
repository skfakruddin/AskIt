import Button from './ui/Button'
import googleIcon from '../assets/googleIcon.svg'
import { useAuth } from '../store/AuthProvider'
import { Link } from 'react-router'
function Navbar () {
  const { login, user, logout } = useAuth()
  const userPhoto = user?.photo ? user.photo : 'https://via.placeholder.com/150'
  return (
    <div
      className={`w-[calc(100vw-10%)] h-16 mt-3 mx-auto 
        flex items-center justify-end
        rounded-md bg-black/0 text-white
        sticky top-3 z-100
        `}
    >
      {user ? (
        <div className='mr-3'>
          <Link to='/profile'>
            <img src={userPhoto} alt='user' className='w-8 h-8 rounded-full' />
          </Link>
          <Button
            text='Logout'
            variant='danger'
            className='mt-1'
            action={() => logout()}
          ></Button>
        </div>
      ) : (
        <Button
          text='Login'
          variant='primary'
          className='mt-5'
          action={() => login()}
          icon={<img src={googleIcon} alt='google icon' className='w-5 h-5' />}
        ></Button>
      )}
    </div>
  )
}

export default Navbar
