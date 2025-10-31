import { useState } from "react";
import { HashLink } from "react-router-hash-link";

import "../App.css";
import AnimatedButton from "./v1/AnimatedButton";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
    const handleEnquiryClick = () => {
   navigate("/contact")
  };

  return (
    <nav className="h-[90px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 transition-all">
      {/* Logo */}
      <div className="flex items-center gap-2">
      <HashLink smooth to="/#">
        <img src="./images/logo.jpg" className=" h-17 lg:h-20" alt="logo" />
      </HashLink>
<h1 className="big text-2xl block lg:hidden">Despa Classes</h1>
</div>
      {/* Desktop Menu */}
      <ul className="text-black md:flex hidden items-center gap-7 text-xl font-semibold ">
        <li>
          <HashLink
            smooth
            className="relative group big"
            to="/#"
          >
            HOME
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group big"
            to="/#about"
          >
            ABOUT
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group big"
            to="/#courses"
          >
            COURSES
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group big"
            to="/#work"
          >
            WORK
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group big"
            to="/#achievement"
          >
            ACHIEVEMENT
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        
        {/* Certificate Verification Link */}
        <li>
          <Link
            to="/certificate/search"
            className="relative group bebas-neue-regular"
          >
            VERIFY CERTIFICATE
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-500 transition-all group-hover:w-full"></span>
          </Link>
        </li>

        {/* Owner Login Link (Optional) */}
        <li>
          <Link
            to="/owner/login"
            className="relative group bebas-neue-regular text-sm bg-violet-100 px-3 py-2 rounded-full hover:bg-violet-200 transition"
          >
            Owner
          </Link>
        </li>
      </ul>

      {/* Desktop Button */}
      <button 
        className="bg-black text-white text-lg md:inline hidden font-semibold relative overflow-hidden w-40 h-11 rounded-full group hover:-translate-y-0.5"
        onClick={handleEnquiryClick}
      >
        <AnimatedButton text="ENQUIRY" />
      </button>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        onClick={toggleMobileMenu}
        className="menu-btn inline-block md:hidden active:scale-90 transition "
      >
        <i className="fa-solid fa-bars text-3xl"></i>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu absolute top-[100px] left-0 w-full bg-black/80 p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li>
              <HashLink smooth to="/#" className="text-sm" onClick={toggleMobileMenu}>
                HOME
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#about" className="text-sm" onClick={toggleMobileMenu}>
                ABOUT
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#courses" className="text-sm" onClick={toggleMobileMenu}>
                COURSES
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#work" className="text-sm" onClick={toggleMobileMenu}>
                WORK
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#achievement" className="text-sm" onClick={toggleMobileMenu}>
                ACHIEVEMENT
              </HashLink>
            </li>
            
            {/* Certificate Verification Link - Mobile */}
            <li>
              <Link
                to="/certificate/search"
                className="text-sm text-green-300 font-medium"
                onClick={toggleMobileMenu}
              >
                VERIFY CERTIFICATE
              </Link>
            </li>

            {/* Owner Login Link - Mobile */}
            <li>
              <Link
                to="/owner/login"
                className="text-sm bg-violet-600 px-3 py-1 rounded-full inline-block mt-2"
                onClick={toggleMobileMenu}
              >
                Owner Login
              </Link>
            </li>
          </ul>
          
          <button 
            className="bg-white hover:-translate-y-0.5 transition text-gray-700 mt-6 inline md:hidden text-sm hover:opacity-90 active:scale-95 w-40 h-11 rounded-full"
             onClick={handleEnquiryClick}
          >
            ENQUIRY
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;