import { useEffect } from 'react'
import { useAuth } from '../store/AuthProvider'
import { useNavigate, useLocation } from 'react-router'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authStatus } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (authStatus === false) {
      toast.error('You need to login first')
      const joinCode = location.pathname.split('/')[2]
      if (location.pathname.split('/')[1] === 'ask') {
        console.log('Login Prot');
        navigate('/'+joinCode)
      }else{
        navigate('/')
      }
    }
  }, [authStatus])

  if (authStatus === null) return <>Loading...</>
  if (authStatus === false) return null

  return <>{children}</>
}

export default ProtectedRoute
