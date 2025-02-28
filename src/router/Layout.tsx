import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router'
import { useState, useEffect } from 'react'

function Layout () {
  const location = useLocation()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className={`overscroll-none`}>
      {!isOnline && (
        <div className='fixed w-full pt-4 text-white text-center flex items-center justify-center z-50'>
          <div className='bg-dgrey backdrop-blur-md px-4 py-2 rounded-lg animate-pulse'>
            <p className='text-xl'>⚠️ No internet connection</p>
          </div>
        </div>
      )}
      <div className='min-h-[calc(100vh-140px)] mt-5 overscroll-none  w-11/12 md:w-8/12 mx-auto z-10 '>
        <Navbar />
        <Outlet />
      </div>
      {location.pathname !== '/' && (
        <div
          className={`fixed -z-100 
          top-[calc(3/4*100%)] left-1/2
          -translate-x-1/2 -translate-y-1/2 
          bg-dgreen max-w-[636px] w-[60vw] h-[20vh]
          rounded-full blur-[14vh] md:blur-[25vh]`}
        ></div>
      )}
    </div>
  )
}

export default Layout
