"use client";

import React, { useState } from 'react';

const NotificationModal = ({ message, onClose, visible, setVisible }) => {
//   const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    visible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl z-60 flex flex-col items-center w-3/5 max-w-sm">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Notification</h3>
          <p className="text-gray-700 text-lg">{message}</p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClose}
              className="cursor-pointer text-xl px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;

