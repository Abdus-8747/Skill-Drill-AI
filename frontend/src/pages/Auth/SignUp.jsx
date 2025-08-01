import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import ProfilePhotoSelector from '../../components/ProfilePhotoSelector'
import { validateEmail } from '../../utils/helper'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError("Plaese enter your full name!")
      return
    }

    if (!validateEmail(email)) {
      setError("Plaese enter a valid email address!")
      return
    }

    if (!password || password.length < 6) {
      setError("Plaese enter a valid Password!")
      return
    }
    setError("")

    //SignUp Api Call
    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });


      const token = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong!")
      }
    }
  }
  return (
    <div className='w-[-95vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create An Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="john@example.com"
          placeholder="Email Address"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Passoword"
          placeholder="Min 6 Characters Required"
          type="password"
        />

        {error && <p className='text-red-500 test-xs pb-2.5 '>{error}</p>}

        <button type='submit'
          className='btn-primary'>Create Account</button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already have an account?{"  "}
          <button
            className='font-medium tex-purple-500 underline cursor-pointer'
            onClick={() => {
              setCurrentPage("login")
            }}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp
