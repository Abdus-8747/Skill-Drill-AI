import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu"
import { CARD_BG } from "../../utils/data"
import toast from "react-hot-toast"
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from '../../components/Cards/SummaryCard'
import moment from "moment"
import CreateSessionForm from './CreateSessionForm'
import Modal from "../../components/Modal"
import DeleteALertContent from '../../components/DeleteALertContent'


const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data.session)
    } catch (error) {
      console.error("Error in fetching session data", error)
    }
  }
  console.log(openDeleteAlert.data);
  
  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))

      toast.success("Session Deleted Successfully")
      setOpenDeleteAlert({
        open: false,
        data: null
      })
      fetchAllSessions()
    } catch (error) {
      console.error("Error deleting session data:", error)
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])
  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
  {sessions?.length > 0 ? (
    sessions.map((data, index) => (
      <SummaryCard
        key={data?._id}
        role={data?.role}
        topicsToFocus={data?.topicsToFocus}
        description={data?.description}
        experience={data?.experience}
        questions={data?.questions?.length}
        lastUpdated={moment(data?.updatedAt).format("Do MMM YYYY")}
        colors={CARD_BG[index % CARD_BG.length]}
        onSelect={() => navigate(`/interview-prep/${data._id}`)}
        onDelete={() => setOpenDeleteAlert({ open: true, data })}
      />
    ))
  ) : (
    <p className="col-span-full text-center text-gray-400">No sessions found.</p>
  )}
</div>


        <button
          className='h-12 md:h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#3624ff] to-[#6f07a3] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-300 fixed bottom-6 md:bottom-10 right-6 md:right-10 z-40'
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className='text-xl md:text-2xl' />
          Add New
        </button>
      </div>


      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false)
        }}
        hideHeader
        >
          <div>
            <CreateSessionForm />
          </div>
        </Modal>
        <Modal 
          isOpen={openDeleteAlert?.open}
          onClose={() => {
            setOpenDeleteAlert({ open: false , data: null})
          }}
          title={"Delete Alert"}>
          <div className='w-[30vw] '>
            <DeleteALertContent 
              onDelete={() => deleteSession(openDeleteAlert.data)}
              data={openDeleteAlert.data}
            />
          </div>
          </Modal>
    </DashboardLayout>
  )
}

export default Dashboard
