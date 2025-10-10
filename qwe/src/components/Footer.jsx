import React from 'react'

function Footer() {
  return (
  <>
   <footer className="flex flex-col items-center justify-around w-full py-16 text-sm text-gray-800/70">
                <div className="flex items-center gap-4 lg:gap-8 ">
                    <a href="" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
                        Home
                    </a>
                    <a href="#about" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
                        About
                    </a>
                    <a href="#courses" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
                       Courses
                    </a>
                    <a href="#work" className=" bebas-neue-regular font-medium text-lg text-gray-500 hover:text-black transition-all">
                        Work
                    </a>
                    <a href="#achievement" className="bebas-neue-regular font-medium text-lg text-gray-500 hover:text-black transition-all">
                        Achievement
                    </a>
                </div>
                <div className="flex items-center gap-4 mt-8 text-indigo-500">
                    <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                   
                </div>
                <p className="mt-8 text-center w-[90vw] lg:w-full">Copyright © 2025 <a href="https://prebuiltui.com">Despa Classes</a>. All rights reservered.</p>
            </footer>
  
  </>
  )
}

export default Footer