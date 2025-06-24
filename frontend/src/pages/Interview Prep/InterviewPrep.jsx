import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from "moment"
import { AnimatePresence, motion } from "framer-motion"
import { LuCircleAlert, LuListCollapse } from "react-icons/lu"
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import { toast } from "react-hot-toast"
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import RoleInfoHeader from '../../components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/Cards/QuestionCard'
import Drawer from '../../components/Drawer'
import SkeletonLoader from '../../components/Loader/SkeletonLoader'
import AiResponsePreview from '../../components/AiResponsePreview'

const InterviewPrep = () => {
  const { sessionId } = useParams()

  const [sessionData, setSessionData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))
      if (response.data?.session) {
        setSessionData(response.data.session)
      }
    } catch (error) {
      console.error("Error fetching session details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("")
      setExplanation(null)
      setIsLoading(true)
      setOpenLearnMoreDrawer(true)

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question })
      if (response.data) {
        setExplanation(response.data)
      }
    } catch (error) {
      console.error("Explanation error:", error)
      setErrorMsg("Failed to generate explanation. Please try again!")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
      if (response.data?.question) {
        await fetchSessionDetailsById()
      }
    } catch (error) {
      console.error("Pin toggle failed:", error)
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true)

      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 5
      })

      const generatedQuestions = aiResponse.data

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions
      })

      if (response.data) {
        toast.success("Added more Q&A!")
        fetchSessionDetailsById()
      }

    } catch (error) {
      console.error("Upload questions failed:", error)
      setErrorMsg("Something went wrong. Please try again!")
    } finally {
      setIsUpdateLoader(false)
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById()
    }
  }, [sessionId])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        experience={sessionData?.experience || "-"}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        questions={sessionData?.questions?.length || 0}
        description={sessionData?.description || "-"}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>

        {isLoading && !sessionData ? (
          <SkeletonLoader />
        ) : (
          <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
            <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"} transition-all duration-300`}>
              <AnimatePresence>
                {Array.isArray(sessionData?.questions) && sessionData.questions.map((data, index) => (
                  <motion.div
                    key={`${data._id || data.question}-${index}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {!isLoading && sessionData?.questions?.length === index + 1 && (
                      <div className='flex items-center justify-center mt-5'>
                        <button
                          className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className='text-lg' />}
                          Load More
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className='flex items-center gap-2 text-sm text-amber-600 font-medium'>
              <LuCircleAlert className='mt-[1px]' />
              {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AiResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep
