"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MouseCursor from '@/components/MouseCursor';
import { register } from '@/utils/auth';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    }
    try {
      await register(username, password);
      setError('');
      console.log('Registered with username:', username);
      router.push('/sign-in');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <MouseCursor />
      <div className="overflow-hidden justify-center items-center text-sky-100 bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C] min-h-screen flex flex-col">
        <div className="flex flex-col w-[80%] max-w-md min-w-xs gap-4 p-8 rounded-2xl shadow-md bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
          <h1 className="text-4xl text-white">Register</h1>
          <p className="text-lg text-white">Create an account</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span className="text-lg text-white">Username:</span>
              <input
                type="text"
                className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg text-white">Password:</span>
              <input
                type="password"
                className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-lg text-white">Confirm Password:</span>
              <input
                type="password"
                className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="mt-8 cursor-pointer bg-yellow-500 text-white p-2 rounded-2xl w-full">
              Register
            </button>
          </form>
          <p className="text-center text-sm text-white">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-yellow-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

