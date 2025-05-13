import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../pages/utils/axiosInstance";
import { API_PATHS } from "../../pages/utils/apiPaths";
import { toast } from "react-hot-toast";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const CreateSessionForm = ({ onSuccess }) => {
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
    
    try {
      setIsLoading(true);
      const sessionData = {
        ...formData,
        experience: formData.experience.toString()
      };
      await axiosInstance.post(API_PATHS.SESSION.CREATE_SESSION, sessionData);
      toast.success('Session created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error(error.response?.data?.message || 'Failed to create session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and we'll get you started in no time.
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({target}) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g Software Engineer, UI/UX Designer, etc"
          type="text"
          required
        />

        <Input
          value={formData.experience}
          onChange={({target}) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g 1 year, 2 years, 3 years, etc"
          type="number"
          required
        />
        
        <Input
          value={formData.topicsToFocus}
          onChange={({target}) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus"
          placeholder="Comma-separated, e.g 'React, Node.js, SQL'"
          type="text"
          required
        />

        <Input
          value={formData.description}
          onChange={({target}) => handleChange("description", target.value)}
          label="Description"
          placeholder="Describe your goals, expectations, or any specific requirements"
          type="text"
        />

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary w-full mt-2"
        >
          {!isLoading && <SpinnerLoader/>} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
