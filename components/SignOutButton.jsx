"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/utils/auth'

const SignOutButton = () => {
  
  const router = useRouter();

  const handleSignOut = async () => {
      await signOut();
      router.push('/');
  }

  return (
    <button onClick={handleSignOut} className="text-nowrap bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3">
        Sign out
    </button>
  )
}

export default SignOutButton;