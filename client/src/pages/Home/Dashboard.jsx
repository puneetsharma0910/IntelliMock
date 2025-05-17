// import React, { useEffect, useState } from 'react'
// import { LuPlus } from "react-icons/lu"
// import { CARD_BG } from "../utils/data"
// import { toast } from "react-hot-toast"
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
//       const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
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
//         experience: formData.experience.toString()
//       }
//       await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, sessionData)
//       toast.success('Session created successfully!')
//       setOpenCreateModal(false)
//       setFormData({
//         role: '',
//         topicsToFocus: '',
//         experience: '',
//         description: ''
//       })
//       fetchAllSessions()
//     } catch (error) {
//       console.error('Error creating session:', error)
//       toast.error(error.response?.data?.message || 'Failed to create session')
//     }
//   }

//   const deleteSession = async (sessionData) => {
//     // Optional: add delete logic here if needed
//   }

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
//           <div className="text-red-500 text-base font-medium">{error}</div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="container mx-auto pt-6 pb-12 px-4 md:px-0">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sessions?.length === 0 ? (
//             <div className="col-span-full text-center py-12 text-gray-500 text-base font-medium">
//               No sessions found. Create your first session to get started!
//             </div>
//           ) : (
//             sessions.map((data, index) => (
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
//                 onDelete={() => setOpenDeleteAlert({ open: true, data })}
//               />
//             ))
//           )}
//         </div>

//         {/* Floating Add Button */}
//         <button
//           className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
//           onClick={() => setOpenCreateModal(true)}
//         >
//           <LuPlus className="text-xl" />
//           Add New
//         </button>
//       </div>

//       {/* Create Session Modal */}
//       <Modal
//         isOpen={openCreateModal}
//         onClose={() => setOpenCreateModal(false)}
//         title="Create New Session"
//       >
//         <CreateSessionForm
//           formData={formData}
//           setFormData={setFormData}
//           handleSubmit={handleCreateSession}
//         />
//       </Modal>
//     </DashboardLayout>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../utils/data";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import SummaryCard from "../../components/cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/loader/Modal";
import CreateSessionForm from "./CreateSessionForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });
  const deleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId));
      toast.success("Session deleted successfully!");
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error(error.response?.data?.message || "Failed to delete session");
    }
  };

  const fetchAllSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError(error.response?.data?.message || "Failed to fetch sessions");
      toast.error(error.response?.data?.message || "Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      const sessionData = {
        ...formData,
        experience: formData.experience.toString(),
      };
      await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, sessionData);
      toast.success("Session created successfully!");
      setOpenCreateModal(false);
      setFormData({
        role: "",
        topicsToFocus: "",
        experience: "",
        description: "",
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error(error.response?.data?.message || "Failed to create session");
    }
  };

  useEffect(() => {
    fetchAllSessions();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-orange-100 via-white to-orange-50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-400 shadow-xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-red-100 via-white to-red-50">
          <div className="text-red-600 text-lg font-semibold px-4 py-2 bg-red-50 rounded-lg shadow">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between px-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Interview Prep Sessions
              </span>
            </h2>
            <button
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-7 py-3 rounded-full shadow-lg transition-all duration-200"
              onClick={() => setOpenCreateModal(true)}
            >
              <LuPlus className="text-2xl" />
              <span>Add New</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0">
            {sessions?.length === 0 ? (
              <div className="col-span-full text-center py-14 text-gray-400 text-lg font-semibold bg-white rounded-xl shadow-inner">
                No sessions found.
                <br />
                <span className="text-orange-500">
                  Create your first session to get started!
                </span>
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
                    data?.updatedAt
                      ? moment(data?.updatedAt).format("DD MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                 onDelete={() => deleteSession(data?._id)} 
                  className="hover:scale-[1.025] transition-transform duration-150"
                />
              ))
            )}
          </div>
          {/* Floating Add Button for mobile */}
          <button
            className="fixed bottom-7 right-7 md:hidden flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-7 py-3 rounded-full shadow-2xl transition-all duration-200 z-50"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-2xl" />
            <span>Add New</span>
          </button>
        </div>
      </div>
      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title={
          <div className="flex items-center gap-2">
            <LuPlus className="text-xl text-orange-500" />
            <span className="font-semibold text-lg text-gray-800">
              Create New Session
            </span>
          </div>
        }
      >
        <div className="px-1 py-2">
          <CreateSessionForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleCreateSession}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
