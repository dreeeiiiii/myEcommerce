"use client"; // This file is client-side only
import Link from "next/link";
import React, { useEffect, useState } from "react";


const AnnouncementBar = () => {
  return (
    <div className = 'w-full bg-black py-2'>
       <div className = 'container mx-auto flex items-center justify-center px-8'>
         <span className = 'text-center text-sm font-medium tracking-wide text-white'>
          FREE SHIPPING ON ORDERS OVER $15.00 X FREE RETURNS
         </span>
       </div>
    </div>
  )
}
const NavBar = () => {
  return(
    
    <div className = 'w-full flex justify-between items-center py-3 sm:py4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
    <div className="flex justify-between items-center container mx-auto px-8 text-black gap-4" >
      <div className = 'flex flex-1 justify-start items-center gap-4 sm:gap-6'> 
        <button className ="text-gray-700 hover:text-gray-900 md:hidden">
          <svg xmlns ="https://www.w3.org/2000/svg"  className="h-5 w-5 sm:w-6 sm:h-6 " fill="none" viewBox="0 0 24 " stroke="black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 18h16" />
          </svg>
        </button>

        <nav className = 'hidden md:flex gap-4 lg-gap-6 text-sm font-medium' >
          <Link href = '/'>Home</Link>
          <Link href = '/'>Shop</Link>
          <Link href = '/'>About</Link>
          <Link href = '/'>Contact</Link>
        </nav>

        <Link href = '/'>link</Link>

        <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
         
          <button className = 'text-gray-700 hover:text-gray-900 hidden sm:block'>
            <svg xmlns="http://www.w3.org/2000/svg"className="h-5 w-5 sm:h-6 sm:w-6"fill="none"viewBox="0 0 24 24"stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin ="round" strokeWidth={2}d = "M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l7 7"/>
            </svg>
          </button>

          <Link href='#'>Sign In</Link>
          <Link href='/auth/sign-up'>Sign Up</Link>     

        </div>
    </div>
 </div>
</div>
  )
}


const Header = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [previousY, setPreviousY] = useState<number>(0)


  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollUp = currentY < previousY;

      if(scrollUp){
        setIsOpen(true)
      }else if (currentY > 100){
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
    <header className = 'w-full sticky top-0 z-50'>
        <div className = {`w-full flex transfrom transition-transfrom duration-300 ease-in-out ${isOpen ? 'translate-y-0': '-translate-y-full'}`}>
          <AnnouncementBar />
        </div>
        <div className = {`w-full flex transfrom transition-transfrom duration-300 ease-in-out ${isOpen ? 'translate-y-0': '-translate-y-full'}`}>
          <NavBar />
        </div>
    </header> 
  )
}

export default Header