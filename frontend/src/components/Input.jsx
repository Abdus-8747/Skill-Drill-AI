import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const Input = ({
  value, onChange, label, placeholder, type
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="mb-4">
      {label && (
        <label className='block mb-1 text-[13px] text-slate-800 font-medium'>
          {label}
        </label>
      )}

      <div className='flex items-center border border-slate-300 px-3 py-2 rounded-md bg-white focus-within:ring-2 focus-within:ring-yellow-400'>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className='w-full bg-transparent outline-none text-sm text-slate-700'
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <button
            type="button"
            className='ml-2 text-slate-500 hover:text-yellow-500'
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
