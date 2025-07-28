import React, { useContext, useState } from 'react'
import Hero_Img from "../assets/HeroImage.png"
import { APP_FEATURES } from "../utils/data"
import { LuSparkles } from "react-icons/lu"
import { Link, useNavigate } from 'react-router-dom'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Modal from '../components/Modal'
import { UserContext } from '../context/userContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [openAuthModel, setOpenAuthModel] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModel(true)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <>
      {/* Hero Section */}
      <div className='w-full min-h-screen bg-white relative overflow-hidden'>
        {/* Background Glows */}
        <div className='absolute top-[-100px] left-[-100px] w-[700px] h-[700px] bg-purple-300/20 blur-[120px] rounded-full z-0'></div>
        <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(196,181,253,0.3)_0%,_transparent_70%)] rounded-full z-0"></div>

        <div className='relative z-10 container mx-auto px-4 pt-6 pb-12'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-purple-700 font-bold'><Link to={"/"}>Skill Drill AI</Link></div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-gradient-to-r from-purple-600 to-purple-700 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:scale-105 hover:shadow-md border border-white transition-all duration-200 ease-in-out cursor-pointer'
                onClick={() => setOpenAuthModel(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className='flex flex-col lg:flex-row items-start gap-10 lg:gap-16'>
            {/* Text Section */}
            <div className='flex flex-col items-start gap-6'>
              <div className='flex items-center'>
                <div className='flex items-center gap-2 text-sm text-purple-700 font-semibold bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm'>
                  <LuSparkles className='text-purple-600 w-4 h-4' /> AI Powered
                </div>
              </div>

              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900'>
                Ace Interviews with
                <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600'>
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              <p className='text-base sm:text-lg text-gray-600 max-w-xl'>
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and
                organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              <button
                className='bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-purple-700 hover:to-purple-800 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer text-base'
                onClick={handleCTA}
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section className='w-full relative z-10 flex justify-center mt-8 sm:mt-7 lg:-mt-14 mb-20 px-4'>
        <img
          src={Hero_Img}
          alt="Hero"
          className='w-[95%] max-w-5xl rounded-xl shadow-2xl'
        />
      </section>

      {/* Testimonials Section */}
      <section className='bg-white py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-purple-700 mb-16'>
            What Our Users Say
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {[
              {
                name: "Ayesha Khan",
                feedback: "This platform helped me crack my dream role. The AI-generated questions are super relevant!",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                title: "Product Designer @ Zappix"
              },
              {
                name: "Rohit Verma",
                feedback: "Absolutely love the clean UI and the way it guides your preparation. 10/10 experience.",
                avatar: "https://randomuser.me/api/portraits/men/46.jpg",
                title: "Full Stack Dev @ InnovateTech"
              },
              {
                name: "Priya Shah",
                feedback: "The personalized learning and answer expansions helped me understand tricky concepts fast.",
                avatar: "https://randomuser.me/api/portraits/women/48.jpg",
                title: "SDE @ Nexa"
              }
            ].map((t, i) => (
              <div
                key={i}
                className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-xl border border-purple-200 hover:scale-[1.02] transition-transform duration-300'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className='w-12 h-12 rounded-full border-2 border-purple-300 object-cover'
                  />
                  <div>
                    <p className='text-sm font-semibold text-purple-800'>{t.name}</p>
                    <p className='text-xs text-purple-500'>{t.title}</p>
                  </div>
                </div>
                <p className='text-gray-700 text-sm leading-relaxed italic'>
                  “{t.feedback}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className='w-full bg-[#f9f9ff] py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-purple-700 mb-12'>
            Features That Make You Shine
          </h2>

          <div className='flex flex-col items-center gap-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className='bg-white p-6 rounded-xl shadow hover:shadow-lg shadow-purple-100 transition border border-purple-100'
                >
                  <h3 className='text-base font-semibold mb-3 text-purple-800'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className='bg-white p-6 rounded-xl shadow hover:shadow-lg shadow-purple-100 transition border border-purple-100'
                >
                  <h3 className='text-base font-semibold mb-3 text-purple-800'>{feature.title}</h3>
                  <p className='text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-sm font-semibold bg-purple-50 text-purple-700 text-center p-5'>
        Made With 💜 By <Link className='text-purple-500' to={"https://www.linkedin.com/in/abdus-samad-shamsi-a61161286/"}>Abdus Samad</Link>
      </footer>

      {/* Modal */}
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
