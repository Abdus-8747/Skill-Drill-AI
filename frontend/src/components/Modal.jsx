import React from 'react'
import { ImCross } from "react-icons/im";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
      <div className='relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-[100vw] max-w-xl max-h-[90vh]'>
        
        {!hideHeader && (
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
          </div>
        )}

        <button
          type='button'
          className='text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer'
          onClick={onClose}
          aria-label="Close modal"
        >
          <ImCross className="w-4 h-4" />
        </button>

        <div className='flex-1 overflow-y-auto custom-scrollbar p-4'>
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal;
