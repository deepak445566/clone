import React from 'react'

function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-around w-full py-16 text-sm text-gray-800/70">
        {/* Contact Details Section */}
        <div className="w-full max-w-5xl mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center big">Get In Touch</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Location */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Our Location</h4>
                <p className="text-gray-600 text-sm">
                  Nandgram<br />
                Ghaziabad, U.P 201001
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Contact Info</h4>
                <p className="text-gray-600 text-sm">
                  Phone: +91 7011652592<br />
                  Email: despacomputerclasses@gmail.com
                </p>
              </div>

              {/* Operating Hours */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Operating Hours</h4>
                <p className="text-gray-600 text-sm">
                  Mon-Sat: 8:00 AM - 9:00 PM<br />
                  Sunday: Off
                </p>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="text-center mt-8">
              <a
                href="tel:+917011652592"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us Now
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 lg:gap-8 flex-wrap justify-center mb-8">
          <a href="" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
            Home
          </a>
          <a href="#about" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
            About
          </a>
          <a href="#courses" className="font-medium text-lg text-gray-500 hover:text-black transition-all bebas-neue-regular">
            Courses
          </a>
          <a href="#work" className="bebas-neue-regular font-medium text-lg text-gray-500 hover:text-black transition-all">
            Work
          </a>
          <a href="#achievement" className="bebas-neue-regular font-medium text-lg text-gray-500 hover:text-black transition-all">
            Achievement
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-4 mb-8 text-indigo-500">
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

        {/* Copyright */}
        <p className="text-center w-[90vw] lg:w-full">
          Copyright © 2025 <a href="https://despaclasses.com" className="hover:text-indigo-600 transition-colors">Despa Classes</a>. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer