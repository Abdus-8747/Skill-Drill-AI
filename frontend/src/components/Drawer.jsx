import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Drawer Panel */}
      <div
        className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-base font-semibold text-black flex items-center">
            {title}
          </h5>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="text-sm mb-6">{children}</div>
      </div>
    </>
  );
};

export default Drawer;