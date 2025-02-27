import Link from 'next/link'

const customerTabs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Explorer',
      href: '/explorer',
    },
    {
      label: 'Purchase',
      href: '/purchase',
    },
    {
      label: 'Receive',
      href: '/receive',
    },
    {
      label: 'Your Products',
      href: '/your-products',
    },
  ]

  const distributorTabs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Explorer',
      href: '/explorer',
    },
    {
      label: 'Buy Product',
      href: '/buy-product',
    },
    {
      label: 'Receive',
      href: '/receive',
    },
    {
      label: 'Ship Product',
      href: '/ship-product',
    },
  ]

  const farmerTabs = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Explorer',
      href: '/explorer',
    },
    {
      label: 'Add Product',
      href: '/add-product',
    },
    {
      label: 'Ship Product',
      href: '/ship-product',
    },
    {
      label: 'All Product',
      href: '/all-product',
    },
  ]

  const allTabs = {
    customer: customerTabs,
    distributor: distributorTabs,
    farmer: farmerTabs
  }

function capitalizeWords(string) {
  return string.replace(/\b\w/g, (c) => c.toUpperCase());
}

const NavBar = ({ role, isNavOpen }) => {
  
  const tabs = allTabs[role]

  // const isNavOpen = true

  return (
    <nav className={`${isNavOpen ? 'w-65' : 'w-25'} flex flex-col fixed top-20 left-0 gap-10 p-8 text-sky-100 h-full border-amber-50 border-r-2 transition-all duration-300 ease-in-out bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C]`}>
      <div className="text-3xl font-bold text-center border-b-2 border-amber-50 rounded-b-4xl w-full p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          {capitalizeWords(role)}
      </div>
      <div className='flex flex-col gap-6 w-full'>
        {
          tabs.map(({ label, href }, index) => (
            <Link href={href} key={index} className='border-amber-50 border-b-2 p-2 text-l font-semibold transition-all duration-300 ease-in-out w-[80%] hover:w-full'>
              {label}
            </Link>
          ))
        }
      </div>
    </nav>
  )
}

export default NavBar

