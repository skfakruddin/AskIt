import Button from './ui/Button'
import googleIcon from '../assets/googleIcon.svg'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router'
import { useLocation } from 'react-router'
function Navbar () {
  const { login, user, logout } = useAuth()
  const userPhoto = user?.photo ? user.photo : 'https://via.placeholder.com/150'
  const location = useLocation()
  return (
    <div
      className={`h-16 mt-3 mx-auto 
        flex items-center ${location.pathname==='/'?'justify-end':'justify-between'}
        rounded-md bg-black/0 text-white
         top-3 z-100 mb-3
        `}
    >
      {
        location.pathname!=='/' && 
        <Link to='/'>
          <h1 className='text-3xl navFont'>Ask it.</h1>
        </Link>
      }
      <div className=''>
        {user ? (
          <div className='mr-3'>
            <Link to='/profile'>
              <img
                src={userPhoto}
                alt='user'
                className='w-8 h-8 rounded-full'
              />
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
            icon={
              <img src={googleIcon} alt='google icon' className='w-5 h-5' />
            }
          ></Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
