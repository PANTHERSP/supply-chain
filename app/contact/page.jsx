"use client";

import React, { useState } from 'react';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    alert('Thank you for contacting us!');
  };

  return (
    <>
      
      <div className="overflow-hidden relative justify-center items-center text-sky-100 min-h-screen flex flex-col">
      <div className="flex flex-col w-[80%] max-w-md min-w-xs gap-4 p-8 rounded-2xl shadow-md bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
        <h1 className="text-4xl text-white">Contact Us</h1>
        <p className="text-lg text-white">We would love to hear from you!</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Name:</span>
            <input
              type="text"
              name="name"
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Email:</span>
            <input
              type="email"
              name="email"
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Message:</span>
            <textarea
              name="message"
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-8 cursor-pointer bg-yellow-500 text-white p-2 rounded-2xl w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
     
    
  );
};

export default ContactPage;
