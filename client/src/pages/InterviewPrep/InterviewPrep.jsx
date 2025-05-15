import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import QuestionCard from "../../components/cards/QuestionCard";
const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateConceptExplanation = async (question) => {};

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN( questionId)
      );
      console.log(response);
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("Error in toggleQuestionPinStatus", error);
    }
  };

  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);
  
  useEffect(() => {
    console.log("Session Data:", sessionData);
  }, [sessionData]);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length | "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MMM YYYY")
            : ""
        }
      />
      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">Interview Q&A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{opacity:0, scale:0.95}}


                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        openLeanMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />
                    </>
                  </motion.div>
                );
              })}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;






// import React, { useEffect, useState } from "react"; // React is used in JSX
// import { useParams } from "react-router-dom";
// import moment from "moment";
// import { AnimatePresence, motion } from "framer-motion";
// import { LuCircleAlert } from "react-icons/lu"; // Removed unused LuListCollapse
// import SpinnerLoader from "../../components/loader/SpinnerLoader";
// import { toast } from "react-hot-toast";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import RoleInfoHeader from "./components/RoleInfoHeader";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";
// import QuestionCard from "../../components/cards/QuestionCard";

// const InterviewPrep = () => {
//   const { sessionId } = useParams();
//   const [sessionData, setSessionData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [openLeanMoreDrawer] = useState(false); // Removed unused setter
//   const [explanation] = useState(null); // Removed unused setter
//   const [isUpdateLoader] = useState(false); // Removed unused setter

//   const fetchSessionDetailsById = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(
//         API_PATHS.SESSION.GET_ONE(sessionId)
//       );
//       if (response.data && response.data.session) {
//         setSessionData(response.data.session);
//         console.log("Session data fetched:", response.data.session);
//       }
//     } catch (error) {
//       console.error("Error fetching session data:", error);
//       setErrorMsg("Failed to load session data");
//       toast.error("Failed to load session data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const generateConceptExplanation = async (question) => {
//     // Implementation would go here
//     console.log("Generating explanation for:", question);
//   };

//   const toggleQuestionPinStatus = async (questionId) => {
//     // Implementation would go here
//     console.log("Toggling pin status for question:", questionId);
//   };

//   useEffect(() => {
//     if (sessionId) {
//       fetchSessionDetailsById();
//     }
//     return () => {};
//   }, [sessionId]);
  
//   useEffect(() => {
//     console.log("Session Data:", sessionData);
    
//     // Debug: Check if questions exist and their structure
//     if (sessionData && sessionData.questions) {
//       console.log(`Found ${sessionData.questions.length} questions`);
//       if (sessionData.questions.length > 0) {
//         console.log("First question sample:", sessionData.questions[0]);
//       }
//     }
//   }, [sessionData]);

//   // Show loading state
//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <div className="flex items-center justify-center h-64">
//           <SpinnerLoader />
//         </div>
//       </DashboardLayout>
//     );
//   }

//   // Show error state
//   if (errorMsg) {
//     return (
//       <DashboardLayout>
//         <div className="flex flex-col items-center justify-center h-64">
//           <LuCircleAlert className="text-red-500 text-4xl mb-2" />
//           <p className="text-gray-700">{errorMsg}</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <RoleInfoHeader
//         role={sessionData?.role || ""}
//         topicsToFocus={sessionData?.topicsToFocus || ""}
//         experience={sessionData?.experience || "-"}
//         questions={sessionData?.questions?.length || "-"}
//         description={sessionData?.description || ""}
//         lastUpdated={
//           sessionData?.updatedAt
//             ? moment(sessionData.updatedAt).format("DD MMM YYYY")
//             : ""
//         }
//       />

//       <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
//         <h2 className="text-lg font-semibold color-black">Interview Q&A</h2>
        
//         {/* Debug info */}
//         {sessionData?.questions?.length === 0 && (
//           <div className="bg-yellow-50 p-4 rounded-md mt-2 mb-4">
//             <p className="text-yellow-700">
//               No questions available. Please generate questions first.
//             </p>
//           </div>
//         )}
        
//         <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
//           <div
//             className={`col-span-12 ${
//               openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
//             }`}
//           >
//             <AnimatePresence>
//               {sessionData?.questions?.map((data, index) => {
//                 return (
//                   <motion.div
//                     key={data._id || index}
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, scale: 1 }} 
//                     transition={{
//                       duration: 0.4,
//                       type: "string",
//                       stiffness: 100,
//                       delay: index * 0.1,
//                       damping: 15,
//                     }}
//                     layout
//                     layoutId={`question-${data._id || index}`}
//                     className="mb-4 p-4 bg-white rounded-lg shadow-sm"
//                   >
//                     <QuestionCard
//                       question={data?.question}
//                       answer={data?.answer}
//                       openLeanMore={() =>
//                         generateConceptExplanation(data.question)
//                       }
//                       isPinned={data?.isPinned}
//                       onTogglePin={() => toggleQuestionPinStatus(data._id)}
//                     />
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
            
//             {/* Show message if no questions */}
//             {(!sessionData?.questions || sessionData.questions.length === 0) && (
//               <div className="text-center py-10">
//                 <p className="text-gray-500">No questions available yet.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default InterviewPrep;