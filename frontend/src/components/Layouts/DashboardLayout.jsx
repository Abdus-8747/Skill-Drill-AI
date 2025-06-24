import React, { useContext } from 'react'
import { UserContext } from "../../context/userContext"
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </div>

      {/* Main content wrapper with padding to offset Navbar height */}
      <main className="flex-1 pt-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
