import React from "react";

const Modal = ({ isOpen, onClose, title, children, hideHeader }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div className="relative flex flex-col justify-center items-center bg-white shadow-2xl rounded-xl overflow-visible max-w-lg w-full mx-4 min-h-[160px] py-4 px-3 sm:px-4">
        {/* modal header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-3 border-b border-gray-200 w-full">
            <h3 className="md:text-base font-medium text-gray-800">{title}</h3>
          </div>
        )}

        <button 
          type="button" 
          className="text-gray-600 bg-gray-100 hover:bg-orange-100 hover:text-gray-800 rounded-lg text-xs p-1.5 inline-flex items-center justify-center absolute top-3 right-3 cursor-pointer shadow-sm"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* modal body scrollable and centered */}
        <div className="flex-1 flex items-center justify-center w-full overflow-y-auto custom-scrollbar py-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
