import { useContext } from 'react'
import { RoomContext } from '../store/RoomProvider'
export const useRoom = () => {
  return useContext(RoomContext)
}
