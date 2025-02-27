import { useEffect,useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useParams } from "react-router"
import { useNavigate } from 'react-router'


const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const params = useParams<{joinCode:string}>()
  
  useEffect(()=>{
    console.log('params: ', params);
    if(!params.joinCode){
      navigate('/profile')
    }

  },[])

  useEffect(()=>{
    async function fetchData(){
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/user/archive`,{
        method:"GET",
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json()
      console.log(data);
    }
    fetchData()
  },[])
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
