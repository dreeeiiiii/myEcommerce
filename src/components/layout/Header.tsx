"use client"; // This file is client-side only
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { logOutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";



const AnnouncementBar = () => {
  return (
    <div className='w-full bg-black py-2'>
      <div className='container mx-auto flex items-center justify-center px-8'>
        <span className='text-center text-sm font-medium tracking-wide text-white'>
          FREE SHIPPING ON ORDERS OVER $15.00 𔘓 FREE RETURNS
        </span>
      </div>
    </div>
  )
}

type HeaderProps = {
  user: Omit<User, "passwordHash"> | null;
}


const Header = ({ user }: HeaderProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [previousY, setPreviousY] = useState<number>(0)


  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollUp = currentY < previousY;

      if (scrollUp) {
        setIsOpen(true)
      } else if (currentY > 100) {
        setIsOpen(false)
      }
      setPreviousY(currentY)
    }
    setPreviousY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [previousY])


  return (
    <header className='w-full sticky top-0 z-50'>
      <div className={`w-full flex transfrom transition-transfrom duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <AnnouncementBar />
      </div>

      <div className='w-full flex justify-between items-center py-3 sm:py4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm text-black'>
        <div className="flex justify-between items-center container mx-auto px-8" >
          <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'>

            <button className="text-gray-700 hover:text-gray-900 md:hidden">
              <Bars3Icon className='h-6 w-6 text-gray-700' />
            </button>

            <nav className='hidden md:flex gap-4 lg-gap-6 text-sm font-medium' >
              <Link href='#'>Home</Link>
              <Link href='#'>Shop</Link>
              <Link href='#'>New Arrivals</Link>
              <Link href='#'>Sale</Link>
            </nav>

          </div>

          <Link href='#' className='text-xl font-semibold'> DEAL</Link>

          <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
            <button className='text-gray-700 hover:text-gray-900 hidden sm:block'>
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            </button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                {user.email && <span className="text-sm text-gray-700">{user.email}</span>}
                <button
                  className="text-sm sm:text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={async () => {
                    await logOutUser();
                    router.refresh();
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <React.Fragment>
                <Link href='/auth/sign-in' className="text-sm sm:text-sm font-medium text-gray-700 hover:text-gray-900">Sign In</Link>
                <Link href='/auth/sign-up' className="text-sm sm:text-sm font-medium text-gray-700 hover:text-gray-900">Sign Up</Link>
              </React.Fragment>
            )}


            <button className='text-gray-700 hover:text-gray-900 relative'>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-blue-950 text-white text-{10px} sm:text=xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ">
                0
              </span>
            </button>


          </div>
        </div>
      </div>
    </header>
  )
}

export default Header