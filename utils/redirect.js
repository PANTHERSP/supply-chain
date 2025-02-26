"use client"

import { useRouter } from 'next/navigation';

export const redirect = (path) => useRouter().push(path);