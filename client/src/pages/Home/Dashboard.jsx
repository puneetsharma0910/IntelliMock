// import React, { useEffect, useState } from 'react'
// import {LuPlus} from "react-icons/lu"
// import {CARD_BG} from "../utils/data"
// import {toast} from "react-hot-toast"
// import DashboardLayout from '../../components/layouts/DashboardLayout'
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../utils/axiosInstance'
// import { API_PATHS } from '../utils/apiPaths'
// import SummaryCard from '../../components/cards/SummaryCard'
// import moment from 'moment'
// import Modal from '../../components/loader/Modal'

// import CreateSessionForm from './CreateSessionForm'

// const Dashboard = () => {
//   const navigate = useNavigate()
//   const [openCreateModal, setOpenCreateModal] = useState(false)
//   const [sessions, setSessions] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     data: null
//   })

//   // Create session form state
//   const [formData, setFormData] = useState({
//     role: '',
//     topicsToFocus: '',
//     experience: '',
//     description: ''
//   })

//   const fetchAllSessions = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       console.log('Fetching sessions...')
//       const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
//       console.log('Sessions response:', response.data)
//       setSessions(response.data)
//     } catch (error) {
//       console.error("Error fetching sessions:", error)
//       setError(error.response?.data?.message || 'Failed to fetch sessions')
//       toast.error(error.response?.data?.message || 'Failed to fetch sessions')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCreateSession = async (e) => {
//     e.preventDefault()
//     try {
//       const sessionData = {
//         ...formData,
//         experience: formData.experience.toString() // Convert to string
//       }
//       const response = await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, sessionData)
//       toast.success('Session created successfully!')
//       setOpenCreateModal(false)
//       setFormData({
//         role: '',
//         topicsToFocus: '',
//         experience: '',
//         description: ''
//       })
//       fetchAllSessions() // Refresh the sessions list
//     } catch (error) {
//       console.error('Error creating session:', error)
//       toast.error(error.response?.data?.message || 'Failed to create session')
//     }
//   }

//   const deleteSession = async (sessionData) => {}

//   useEffect(() => {
//     fetchAllSessions()
//   }, [])
 
//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <div className="text-red-500">{error}</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className='container mx-auto pt-4 pb-4'>
//         <div className='grid grid-cols-1 md:grid-cols-3 md:gap-7 gap-4 pt-1 pb-6 md:px-0 px-4'>
//           {sessions?.length === 0 ? (
//             <div className="col-span-full text-center py-10">
//               <p className="text-gray-500">No sessions found. Create your first session to get started!</p>
//             </div>
//           ) : (
//             sessions?.map((data, index) => (
//               <SummaryCard 
//                 key={data?._id}
//                 colors={CARD_BG[index % CARD_BG.length]}
//                 role={data?.role || ""}
//                 topicsToFocus={data?.topicsToFocus || ""}
//                 experience={data?.experience || "-"}
//                 questions={data?.questions?.length || "-"}
//                 description={data?.description || ""}
//                 lastUpdated={
//                   data?.updatedAt ? moment(data?.updatedAt).format("DD MMM YYYY") : ""
//                 }
//                 onSelect={() => navigate(`/interview-prep/${data?._id}`)}
//                 onDelete={() => setOpenDeleteAlert({open: true, data})}
//               />
//             ))
//           )}
//         </div>
//         <button 
//           className='h-12 md:h-12 flex items-center justify-center gap-3 text-white bg-linear-to-r from-[#FF9324] to-[#FF9324] rounded-full text-sm font-semibold px-7 py-2.5 hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
//           onClick={() => setOpenCreateModal(true)}
//         >
//           <LuPlus className='text-2xl text-white'/>
//           Add New
//         </button>
//       </div>

//       {/* Create Session Modal */}
//       <Modal 
//         isOpen={openCreateModal} 
//         onClose={() => setOpenCreateModal(false)} 
//         title="Create New Session"
//       >
//         <div>

      
//         <CreateSessionForm/>
//           </div>
        
//       </Modal>
//     </DashboardLayout>
//   )
// }

// export default Dashboard







import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu"
import { CARD_BG } from "../utils/data"
import { toast } from "react-hot-toast"
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import SummaryCard from '../../components/cards/SummaryCard'
import moment from 'moment'
import Modal from '../../components/loader/Modal'
import CreateSessionForm from './CreateSessionForm'

const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const [formData, setFormData] = useState({
    role: '',
    topicsToFocus: '',
    experience: '',
    description: ''
  })

  const fetchAllSessions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.error("Error fetching sessions:", error)
      setError(error.response?.data?.message || 'Failed to fetch sessions')
      toast.error(error.response?.data?.message || 'Failed to fetch sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSession = async (e) => {
    e.preventDefault()
    try {
      const sessionData = {
        ...formData,
        experience: formData.experience.toString()
      }
      await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, sessionData)
      toast.success('Session created successfully!')
      setOpenCreateModal(false)
      setFormData({
        role: '',
        topicsToFocus: '',
        experience: '',
        description: ''
      })
      fetchAllSessions()
    } catch (error) {
      console.error('Error creating session:', error)
      toast.error(error.response?.data?.message || 'Failed to create session')
    }
  }

  const deleteSession = async (sessionData) => {
    // Optional: add delete logic here if needed
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-red-500 text-base font-medium">{error}</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-12 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions?.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500 text-base font-medium">
              No sessions found. Create your first session to get started!
            </div>
          ) : (
            sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt ? moment(data?.updatedAt).format("DD MMM YYYY") : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl" />
          Add New
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create New Session"
      >
        <CreateSessionForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleCreateSession}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard
