import React, { useState } from 'react'
import Hero_Img from "../assets/HeroImage.png"
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const [openAuthModel, setOpenAuthModel] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => {}

  return (
  <div className='w-full min-h-full bg-[#f3e9b7]'>

    {/* Blurred amber layer */}
    <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0'></div>

      {/* Main content */}
      <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>

        {/* Header */}
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl text-black font-bold'>Skill Drill AI</div>
          <button
            className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:scale-105 hover:shadow-md border border-white transition-all duration-200 ease-in-out cursor-pointer'
            onClick={() => setOpenAuthModel(true)}
          >
            Login / Sign Up
          </button>
        </header>

        {/* Hero Section */}
        <div className='flex flex-col md:flex-row items-center'>
          {/* Left Column */}
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <div className='flex items-center justify-start mb-2'>
              <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                AI Powered
              </div>
            </div>

            <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
              Ace Interview with<br />
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                AI-Powered
              </span>{" "}
              Learning
            </h1>
          </div>

          {/* Right Column */}
          <div className='w-full md:w-1/2'>
            <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
              Get role-specific questions, expand answers when you need them, dive deeper into concepts, and
              organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
            </p>

            <button
              className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LandingPage
