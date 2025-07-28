import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext)
  
  
  const navigate = useNavigate()

  const handleLogout = () => {
    clearUser()
    navigate("/")
  }
  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }
  return (
    <div className='flex items-center'>
      <img
        src={user.profileImageUrl}
        alt=''
        className='w-12 h-12 bg-gray-300 rounded-full mr-3'
      />
      <div>
        <div
          className='text-[15px] text-black font-bold leading-3'
        >
          {user.name || ""}
        </div>
        <button
          className='text-purple-600 text-sm font-semibold cursor-pointer hover:underline'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfoCard
