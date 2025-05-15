// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../../components/inputs/Input";
// import axiosInstance from "../../pages/utils/axiosInstance";
// import { API_PATHS } from "../../pages/utils/apiPaths";
// import { toast } from "react-hot-toast";
// import SpinnerLoader from "../../components/loader/SpinnerLoader";

// const CreateSessionForm = ({ onSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     role: "",
//     topicsToFocus: "",
//     experience: "",
//     description: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const handleCreateSession = async (e) => {
//     e.preventDefault();
//     const { role, topicsToFocus, experience } = formData;
//     if (!role || !topicsToFocus || !experience) {
//       setError("All fields are required");
//       return;
//     }
//     setError("");
//     setIsLoading(true);
//     try {
//         //call api to generate questions
//         const aiResponse = await axiosInstance.post(
//             API_PATHS.AI.GENERATE_QUESTIONS,
//             {
//                 role,
//                 topicsToFocus,
//                 experience,
//                 numberOfQuestions: 10,
//             }
//         );
//         const generatedQuestions = aiResponse.data;
//         const response = await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, {
//             ...formData,
//             questions: generatedQuestions,
//         });
//         if(response.data?.session?._id) {
//             navigate(`/interview-prep/${response.data?.session?._id}`);
//         }
//     } catch (error) {
//         if(error.response && error.response.data.message) {
//             setError(error.response.data.message);
//         } else {
//             setError("An unexpected error occurred. Please try again later.");
//         }
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
//       <h3 className="text-xl font-semibold text-black">
//         Start a New Interview Journey
//       </h3>
//       <p className="text-xs text-slate-700 mt-[5px] mb-3">
//         Fill out a few quick details and we'll get you started in no time.
//       </p>
//       <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
//         <Input
//           value={formData.role}
//           onChange={({target}) => handleChange("role", target.value)}
//           label="Target Role"
//           placeholder="e.g Software Engineer, UI/UX Designer, etc"
//           type="text"
//           required
//         />

//         <Input
//           value={formData.experience}
//           onChange={({target}) => handleChange("experience", target.value)}
//           label="Years of Experience"
//           placeholder="e.g 1 year, 2 years, 3 years, etc"
//           type="number"
//           required
//         />
        
//         <Input
//           value={formData.topicsToFocus}
//           onChange={({target}) => handleChange("topicsToFocus", target.value)}
//           label="Topics to Focus"
//           placeholder="Comma-separated, e.g 'React, Node.js, SQL'"
//           type="text"
//           required
//         />

//         <Input
//           value={formData.description}
//           onChange={({target}) => handleChange("description", target.value)}
//           label="Description"
//           placeholder="Describe your goals, expectations, or any specific requirements"
//           type="text"
//         />

//         {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
//         <button 
//           type="submit" 
//           disabled={isLoading}
//           className="btn-primary w-full mt-2"
//         >
//           {isLoading ? <SpinnerLoader/> : "Create Session"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateSessionForm;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../pages/utils/axiosInstance";
import { API_PATHS } from "../../pages/utils/apiPaths";
import { toast } from "react-hot-toast";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const CreateSessionForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, topicsToFocus, experience } = formData;
    if (!role || !topicsToFocus || !experience) {
      setError("All fields are required");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          topicsToFocus,
          experience,
          numberOfQuestions: 10,
        }
      );
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.SESSION.CREATE_SESSION,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-8 rounded-2xl shadow-lg bg-white">
      <h3 className="text-2xl font-bold text-gray-900 mb-1.5">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Fill out a few quick details and we'll get you started in no time.
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g Software Engineer, UI/UX Designer"
          type="text"
          required
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g 1, 2, 3"
          type="number"
          required
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus"
          placeholder="e.g React, Node.js, SQL"
          type="text"
          required
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="Your goals, expectations, or requirements"
          type="text"
        />

        {error && (
          <p className="text-red-500 text-sm font-medium -mt-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full py-2.5 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
