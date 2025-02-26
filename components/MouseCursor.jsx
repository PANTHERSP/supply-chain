"use client"

import { useEffect, useRef } from 'react';

const MouseCursor = () => {
  const cursorPositionRef = useRef(null);

  useEffect(() => {

    const updatePosition = (x, y) => {
      const { width, height } = cursorPositionRef.current?.style || { width: 0, height: 0 };
      cursorPositionRef.current.style.transform = `translate(${x - parseInt(width) / 2}px, ${y - parseInt(height) / 2}px)`
    }
    const handleMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY)
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorPositionRef}
      className="fixed rounded-full bg-radial from-white/8 to-gray-950/3 via-transparent pointer-events-none"
      style={{
        width: 800,
        height: 800,
        transform: `translate(-50%, -50%)`
      }}
    />
  );
};

export default MouseCursor;
