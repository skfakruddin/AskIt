import Button from './ui/Button'
import googleIcon from '../assets/googleIcon.svg'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router'
import { useLocation } from 'react-router'
import { useState } from 'react'
function Navbar () {
  const { login, user, logout } = useAuth()
  const userPhoto = user?.photo ? user.photo : 'https://via.placeholder.com/150'
  const location = useLocation();
  const [isIconClicked, setIsIconClicked] = useState(false);
  return (
    <div
      className={`h-16 mt-3 mx-auto 
        flex items-center ${
          location.pathname === '/' ? 'justify-end' : 'justify-between'
        }
        rounded-md bg-black/0 text-white
         top-3 z-100 mb-3
        `}
    >
      {location.pathname !== '/' && (
        <Link to='/'>
          <h1 className='text-3xl navFont'>Ask it.</h1>
        </Link>
      )}
      <div className=''>
        {user ? (
          <div className=''>
            <div className='mr-3 flex items-center gap-2 cursor-pointer' onClick={()=> setIsIconClicked(!isIconClicked)}>
              <div className='flex flex-row-reverse items-center gap-2 bg-dgrey p-2 pl-3 rounded-full'>
                <img
                  src={userPhoto}
                  alt='user'
                  className='w-8 h-8 rounded-full'
                />
                <p className=''>Hi, {user.name.split(' ')[0]}</p>
              </div>
            </div>
            <div className={
              `${isIconClicked ? 'block' : 'hidden'}
              bg-dgrey absolute z-100 rounded-lg p-2 flex flex-col gap-3 mt-2 mr-3.5 px-3 right-[calc((100vw-100vw*11/12)/2)] md:right-[calc((100vw-100vw*8/12)/2)]`
            }>
              <Link onClick={()=>{
                setIsIconClicked(false)
              }} to='/profile'>Profile</Link>
              <button className={`cursor-pointer hover:text-red-500`} onClick={()=> {
                setIsIconClicked(false)
                logout()
              }}>Logout</button>
            </div>
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
