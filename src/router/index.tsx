import type { RouteObject } from 'react-router'
import Layout from './Layout'
import HomePage from '../pages/Home.page'
import Room from '../pages/Room.page'
import Profile from '../pages/Profile.page'
import ProtectedRoute from './ProtectedRoute'
import RoomProvider from '../store/RoomProvider'
import ProfileProvider from '../store/ProfileProvider'
const normalRoutes: RouteObject = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/:joinCode',
      element: <HomePage />
    },
    {
      path: '/ask/:joinCode',
      element: (
        <RoomProvider>
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        </RoomProvider>
      )
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        </ProtectedRoute>
      )
    },
    {
      path: '/profile/:joinCode',
      element: (
        <ProtectedRoute>
          <ProfileProvider>
            <Profile />
          </ProfileProvider>
        </ProtectedRoute>
      )
    }
  ]
}

const router: RouteObject[] = [normalRoutes]

export default router
