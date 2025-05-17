import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 md:px-12">
        <div className="h-[220px] flex flex-col justify-center items-start relative z-10">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{role}</h2>
            <p className="text-base text-gray-700 mt-1 max-w-xl">{topicsToFocus}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <span className="text-xs font-semibold text-white bg-gray-900 px-4 py-1 rounded-full shadow-md">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </span>
            <span className="text-xs font-semibold text-white bg-gray-900 px-4 py-1 rounded-full shadow-md">
              {questions} Q&A
            </span>
            <span className="text-xs font-semibold text-white bg-gray-900 px-4 py-1 rounded-full shadow-md">
              Last Updated: {new Date(lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Blob background decoration */}
        <div className="absolute top-0 right-0 w-[70vw] md:w-[35vw] lg:w-[25vw] h-[220px] flex items-center justify-center pointer-events-none select-none">
          <div className="relative w-24 h-24 rounded-full bg-lime-400 opacity-30 blur-[70px] animate-blob1"></div>
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-teal-400 opacity-30 blur-[70px] animate-blob2"></div>
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-cyan-300 opacity-30 blur-[70px] animate-blob3"></div>
          <div className="absolute top-12 left-12 w-24 h-24 rounded-full bg-fuchsia-400 opacity-30 blur-[70px] animate-blob1"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
