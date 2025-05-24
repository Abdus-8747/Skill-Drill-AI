import React, { useState } from 'react'
import Hero_Img from "../assets/HeroImage.png"
import { APP_FEATURES } from "../utils/data"
import { LuSparkles } from "react-icons/lu"
import { Link, useNavigate } from 'react-router-dom'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Modal from '../components/Modal'

const LandingPage = () => {
  const navigate = useNavigate()
  const [openAuthModel, setOpenAuthModel] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => { }

  return (
    <>
      {/* Hero Section with Background Blur */}
      <div className='w-full min-h-screen bg-[#fffeb1] relative overflow-hidden'>

        {/* Background Glows */}
        <div className='absolute top-[-100px] left-[-100px] w-[700px] h-[700px] bg-amber-300/30 blur-[120px] rounded-full z-0'></div>
        <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(255,234,138,0.3)_0%,_transparent_70%)] rounded-full z-0"></div>

        {/* Main Content */}
        <div className='relative z-10 container mx-auto px-4 pt-6 pb-[200px]'>
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

          {/* Hero Text and CTA */}
          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-start mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                  <LuSparkles /> AI Powered
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

      {/* Hero Image */}
      <section className='w-full relative z-10 -mt-24 flex justify-center mb-20'>
        <img
          src={Hero_Img}
          alt="Hero"
          className='w-[80vw] max-w-5xl rounded-lg shadow-md'
        />
      </section>

      {/* Features Section */}
      <div className='w-full bg-[#fffec1] py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-medium text-center mb-12'>
            Features That Make You Shine
          </h2>

          <div className='flex flex-col items-center gap-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className='bg-[#fffef8] p-6 rounded-xl shadow hover:shadow-lg shadow-amber-100 transition border border-amber-100'
                >
                  <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className='bg-[#fffef8] p-6 rounded-xl shadow hover:shadow-lg shadow-amber-100 transition border border-amber-100'
                >
                  <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-sm font-semibold bg-gray-50 text-gray-700 text-center p-5'>
        Made With 💛 By <Link className='text-amber-500' to={"https://www.linkedin.com/in/abdus-samad-shamsi-a61161286/"}>Abdus Samad</Link>
      </footer>

      <Modal 
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false)
          setCurrentPage("login")
        }}
        hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "signup" && (
              <SignUp setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
    </>
  )
}

export default LandingPage
