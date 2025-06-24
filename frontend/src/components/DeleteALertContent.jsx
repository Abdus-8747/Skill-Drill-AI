import React from 'react';

const DeleteAlertContent = ({ onDelete, data }) => {
  const role = data.role;

  return (
    <div className='px-4 py-6 sm:px-6 md:p-8'>
      <p className='text-sm sm:text-base text-center'>
        Are you sure you want to <b><span className='text-red-600'>DELETE</span> {role} Session?</b>
      </p>

      <div className='flex justify-center mt-6'>
        <button
          className='px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200'
          onClick={onDelete}
        >
          Delete Session
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
