import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router'

function Layout () {
  const location = useLocation()
  return (
    <div className={`overscroll-none`}>
      <div className='min-h-[calc(100vh-140px)] mt-5 overscroll-none  w-11/12 md:w-8/12 mx-auto z-10 '>
        <Navbar />
        <div></div>
        <Outlet />
      </div>
      {location.pathname !== '/' && (
        <div
          className={`fixed  -z-100 
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
