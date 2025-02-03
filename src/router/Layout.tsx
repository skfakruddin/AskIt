import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function Layout () {
  return (
    <div>
      <Navbar />
      <div className='min-h-[calc(100vh-140px)] mt-5 overscroll-none  w-11/12 md:w-8/12 mx-auto z-10 '>
        <Outlet />
      </div>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dgreen max-w-[636px] w-[80vw] h-[50vh] rounded-full blur-[24vh] mx-auto -z-100'></div>
    </div>
  )
}

export default Layout
