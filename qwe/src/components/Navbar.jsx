import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/logo.jpg";
import "../App.css";
import AnimatedButton from "./v1/AnimatedButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="h-[100px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 transition-all">
      {/* Logo */}
      <HashLink smooth to="/#">
        <img src={logo} className="h-20" alt="logo" />
      </HashLink>

      {/* Desktop Menu */}
      <ul className="text-black md:flex hidden items-center gap-7 text-2xl">
        <li>
          <HashLink
            smooth
            className="relative group bebas-neue-regular"
            to="/#"
          >
            HOME
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group bebas-neue-regular"
            to="/#about"
          >
            ABOUT
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group bebas-neue-regular"
            to="/#courses"
          >
            COURSES
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group bebas-neue-regular"
            to="/#work"
          >
            WORK
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-full"></span>
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            className="relative group bebas-neue-regular"
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
            className="relative group bebas-neue-regular text-sm bg-violet-100 px-3 py-1 rounded-full hover:bg-violet-200 transition"
          >
            Owner
          </Link>
        </li>
      </ul>

      {/* Desktop Button */}
      <button
        className="bg-black text-white text-lg md:inline hidden font-semibold relative overflow-hidden w-40 h-11 rounded-full group hover:-translate-y-0.5"
        onClick={() => window.open("https://docs.google.com/forms/u/0/d/e/1FAIpQLSekczarPQf-5IZ1Kf-6_eQhPtK34ShPaZfkURPQyjlcwtOIeQ/formResponse", "_blank")}
      >
        <AnimatedButton text="ENQUIRY" />
      </button>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        onClick={toggleMobileMenu}
        className="menu-btn inline-block md:hidden active:scale-90 transition text-2xl"
      >
        <i className="fa-solid fa-bars"></i>
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
            onClick={() => {
              toggleMobileMenu();
              window.open("https://docs.google.com/forms/u/0/d/e/1FAIpQLSekczarPQf-5IZ1Kf-6_eQhPtK34ShPaZfkURPQyjlcwtOIeQ/formResponse", "_blank");
            }}
          >
            ENQUIRY
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;