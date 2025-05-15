import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data?.session) {
        console.log(
          "✅ Updated questions fetched:",
          response.data.session.questions
        );
        // Force new object to trigger re-render
        setSessionData({ ...response.data.session });
      }
    } catch (error) {
      toast.error("Failed to fetch session details.");
      console.error(error);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later.");
      console.error("Explanation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 2,
        }
      );

      const generatedQuestions = aiResponse.data;
      console.log("🧠 Generated Questions:", generatedQuestions);

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          question: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added more Q&A");
        await fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) {
        await fetchSessionDetailsById();
      }
    } catch (error) {
      toast.error("Failed to pin/unpin question.");
      console.error("Error toggling pin:", error);
    }
  };

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  // Only updated styles: tailwind classes & layout improvements

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto px-4 md:px-6 pt-6 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray mb-6">
          Interview Q&A
        </h2>

        <div className="grid grid-cols-12 gap-6">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            {sessionData?.questions?.length > 0 ? (
              <AnimatePresence>
                {sessionData.questions.map((data, index) => (
                  <motion.div
                    key={data._id || `${data.question}-${index}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                    className="mb-6"
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      openLeanMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex justify-center mt-6">
                          <button
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                            className="flex items-center gap-2 text-sm font-medium bg-black text-white hover:bg-gray-900 px-6 py-2.5 rounded-lg shadow-md disabled:opacity-50 transition duration-200"
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}
                            Load More
                          </button>
                        </div>
                      )}
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-300 text-base">
                  No questions found for this session.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drawer */}
        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className="text-red-500 flex gap-2 items-start font-medium text-sm mb-4">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};
export default InterviewPrep;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import moment from "moment";
// import { AnimatePresence, motion } from "framer-motion";
// import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import RoleInfoHeader from "./components/RoleInfoHeader";
// import QuestionCard from "../../components/cards/QuestionCard";
// import AIResponsePreview from "./components/AIResponsePreview";
// import Drawer from "../../components/Drawer";
// import SkeletonLoader from "../../components/loader/SkeletonLoader";
// import SpinnerLoader from "../../components/loader/SpinnerLoader";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

// const InterviewPrep = () => {
//   const { sessionId } = useParams();
//   const [sessionData, setSessionData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isUpdateLoader, setIsUpdateLoader] = useState(false);
//   const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
//   const [explanation, setExplanation] = useState(null);

//   const fetchSessionDetailsById = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
//       if (response.data?.session) {
//         setSessionData(response.data.session);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch session details.");
//       console.error(error);
//     }
//   };

//   const generateConceptExplanation = async (question) => {
//     try {
//       setErrorMsg("");
//       setExplanation(null);
//       setIsLoading(true);
//       setOpenLeanMoreDrawer(true);

//       const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
//       if (response.data) {
//         setExplanation(response.data);
//       }
//     } catch (error) {
//       setExplanation(null);
//       setErrorMsg("Failed to generate explanation. Try again later.");
//       console.error("Explanation error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const uploadMoreQuestions = async () => {
//     try {
//       setIsUpdateLoader(true);
//       const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
//         role: sessionData?.role,
//         experience: sessionData?.experience,
//         topicsToFocus: sessionData?.topicsToFocus,
//         numberOfQuestions: 10,
//       });

//       const generatedQuestions = aiResponse.data;
//       const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
//         sessionId,
//         question: generatedQuestions,
//       });

//       if (response.data) {
//         toast.success("Added more Q&A");
//         fetchSessionDetailsById();
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setErrorMsg(error.response.data.message);
//       } else {
//         setErrorMsg("Something went wrong");
//       }
//     } finally {
//       setIsUpdateLoader(false);
//     }
//   };

//   const toggleQuestionPinStatus = async (questionId) => {
//     try {
//       const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
//       if (response.data?.question) {
//         fetchSessionDetailsById();
//       }
//     } catch (error) {
//       toast.error("Failed to pin/unpin question.");
//       console.error("Error toggling pin:", error);
//     }
//   };

//   useEffect(() => {
//     if (sessionId) fetchSessionDetailsById();
//   }, [sessionId]);

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
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Interview Q&A</h2>

//         <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
//           <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
//             {sessionData?.questions?.length > 0 ? (
//               <AnimatePresence>
//                 {sessionData.questions.map((data, index) => (
//                   <motion.div
//                     key={data._id || index}
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{
//                       duration: 0.4,
//                       type: "spring",
//                       stiffness: 100,
//                       delay: index * 0.1,
//                       damping: 15,
//                     }}
//                     layout
//                     layoutId={`question-${data._id || index}`}
//                     className="mb-4"
//                   >
//                     <QuestionCard
//                       question={data?.question}
//                       answer={data?.answer}
//                       openLeanMore={() => generateConceptExplanation(data.question)}
//                       isPinned={data?.isPinned}
//                       onTogglePin={() => toggleQuestionPinStatus(data._id)}
//                     />

//                     {!isLoading && sessionData?.questions?.length === index + 1 && (
//                       <div className="flex items-center justify-center mt-5">
//                         <button
//                           disabled={isLoading || isUpdateLoader}
//                           onClick={uploadMoreQuestions}
//                           className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
//                         >
//                           {isUpdateLoader ? (
//                             <SpinnerLoader />
//                           ) : (
//                             <LuListCollapse className="text-lg" />
//                           )}
//                           Load More
//                         </button>
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 dark:text-gray-300">
//                   No questions found for this session.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Drawer Component */}
//         <Drawer
//           isOpen={openLeanMoreDrawer}
//           onClose={() => setOpenLeanMoreDrawer(false)}
//           title={!isLoading && explanation?.title}
//         >
//           {errorMsg && (
//             <p className="text-red-500 flex gap-2 items-start font-medium text-sm mb-4">
//               <LuCircleAlert className="mt-1" /> {errorMsg}
//             </p>
//           )}
//           {isLoading && <SkeletonLoader />}
//           {!isLoading && explanation && (
//             <AIResponsePreview content={explanation?.explanation} />
//           )}
//         </Drawer>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default InterviewPrep;
