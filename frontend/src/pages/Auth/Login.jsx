import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = ({ setCurrentPage }) => {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[error, setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)) {
      setError("Plaese enter a valid email address!")
      return
    }

    if(!password || password.length < 6) {
      setError("Plaese enter a valid Password!")
      return
    }
    setError("")
    //API CALL LOGIN
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token } = response.data

      if(token) {
         localStorage.setItem("token", token)
         updateUser(response.data)
         navigate("/dashboard")
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something Went Wrong!!!")
      }
    }
  }
  return (
    <div className='w-[-90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

      <form onSubmit={handleLogin}>
          <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          />

          <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 6 Characters Required"
          type="password"
          />

          {error && <p className='text-red-500 test-xs pb-2.5 '>{error}</p>}

          <button type='submit'
          className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <button
            className='font-medium text-purple-500 underline cursor-pointer'
            onClick={() => {
              setCurrentPage("signup")
            }}>
              SignUp
            </button>
          </p> 
      </form>
    </div>
  )
}

export default Login
