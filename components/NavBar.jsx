"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router = useRouter()

  return (
    <nav className="flex flex-col gap-6 p-6 absolute top-20 left-0 text-sky-100 w-3xs h-full border-amber-100 border-r-1">
      <Link href="/" className={`${router.pathname === '/' ? 'font-bold' : ''}`}>
        Home
      </Link>
      <Link href="/explorer" className={`${router.pathname === '/about' ? 'font-bold' : ''}`}>
        Explorer
      </Link>
      <Link href="/add-product" className={`${router.pathname === '/contact' ? 'font-bold' : ''}`}>
        Add Product
      </Link>
      <Link href="/ship-product" className={`${router.pathname === '/documentation' ? 'font-bold' : ''}`}>
        Ship Product
      </Link>
      <Link href="/all-product" className={`${router.pathname === '/documentation' ? 'font-bold' : ''}`}>
        All Product
      </Link>
    </nav>
  )
}

export default NavBar

