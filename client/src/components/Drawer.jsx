import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] px-5 py-6 overflow-y-auto transition-transform duration-300 ease-in-out bg-white w-full md:w-[40vw] shadow-xl border-l border-gray-200
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between mb-6">
        <h5
          id="drawer-right-label"
          className="flex items-center text-lg font-bold text-gray-900"
        >
          {title}
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-colors duration-150"
        >
          <LuX className="text-lg" />
        </button>
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
};

export default Drawer;
