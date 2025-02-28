"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import MouseCursor from '@/components/MouseCursor';
import { signIn } from '@/utils/auth';
const SignInPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Signing in...');
      const user = await signIn(username, password);
      console.log('Signed in with username:', username, 'role:', user.role);
      setError('');
      router.push(`/dashboard/${user.role}/home`);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <>
      <MouseCursor />
      <div className="overflow-hidden justify-center items-center text-sky-100 bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C] min-h-screen flex flex-col">
        <div className="flex flex-col w-[80%] max-w-md min-w-xs gap-4 p-8 rounded-2xl shadow-md bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
          <h1 className="text-4xl text-white">Sign In</h1>
          <p className="text-lg text-white">Sign in to your account</p>
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
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="mt-8 cursor-pointer bg-yellow-500 text-white p-2 rounded-2xl w-full">
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-white">
            Don't have an account?{' '}
            <Link href="/register" className="text-yellow-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignInPage;

