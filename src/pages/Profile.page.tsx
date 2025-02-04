import { useAuth } from '../store/AuthProvider'

const Profile = () => {
  const { user } = useAuth()
  return (
    <>
      <h1>Profile</h1>
      <img
        className={`rounded-full`}
        src={user?.photo}
        alt={user?.name.charAt(0)}
      />
      <p>{user?.name}</p>
      <p>Email: {user?.email}</p>
      <h1>Archives</h1>
      <ul className={`md:flex`}>
        <li>Archive 1</li>
        <li>Archive 2</li>
        <li>Archive 3</li>
      </ul>
    </>
  )
}
export default Profile
