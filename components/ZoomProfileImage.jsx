"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ZoomProfileImage = ({ user, style, onClose }) => {
  const [isZoomProfileImage, setIsZoomProfileImage] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // สำหรับให้แน่ใจว่าเรารันใน browser

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsZoomProfileImage(false);
    if (onClose) onClose();
  };

  const imageSrc = user?.profileImage || '/images/avatar.jpg';

  return (
    <>
      <div className={`${style}`} onClick={() => setIsZoomProfileImage(true)}>
        <Image
          alt="avatar"
          width={1000}
          height={1000}
          src={imageSrc}
          className="rounded-full cursor-pointer h-full w-full object-cover"
          priority
        />
      </div>

      {isMounted && isZoomProfileImage &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
            <div className="h-100 aspect-square">
              <Image
                alt="avatar"
                width={1000}
                height={1000}
                src={imageSrc}
                className="rounded-full cursor-pointer h-full w-full object-cover"
                priority
              />
            </div>
            <button
              onClick={handleClose}
              className="cursor-pointer fixed top-5 right-5 text-xl px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>,
          document.body
        )
      }
    </>
  );
};

export default ZoomProfileImage;
