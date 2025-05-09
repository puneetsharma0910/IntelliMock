import React from "react";

const Modal = ({ isOpen, onClose, title, children, hideHeader }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* modal header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-800">{title}</h3>
          </div>
        )}
        <button type="button" 
        className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-800 rounded-lg text-sm  inline-flex items-center justify-center absolute top-3.5 right-3.5 cursor-pointer"
         onClick={onClose}>
          <svg
            className=""
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

        {/* modal body scrollable */}
        <div
        className="flex-1 overflow-y-auto custom-scrollbar" 
        >{children}</div>
      </div>
    </div>
  );
};

export default Modal;
