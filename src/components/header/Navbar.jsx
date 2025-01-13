import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useAuth } from "../../contexts/authContext";
import logo from "../../assets/common/magnum.png";
import useSticky from "../../hooks/use-sticky";
import MobileNav from "./MobileNav";
import LgNav from "./LgNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { headerSticky } = useSticky();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setIsOpen(false)
    } catch (error) {
      alert(`logout failed error: ${error}`);
      throw error;
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`bg-blue-600 text-white shadow-md w-full z-50 ${
        headerSticky ? "sticky  top-0" : ""
      }`}
    >
      <nav
        className={`container mx-auto flex flex-wrap  justify-center items-center p-4  `}
      >
        {/* Hamburger Icon */}
        <button className="lg:hidden ms-auto" onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>

        {/*Big screen nav */}
        <LgNav
          isOpen={isOpen}
          currentUser={currentUser}
          logo={logo}
          handleLogout={handleLogout}
        />
      </nav>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isOpen}
        currentUser={currentUser}
        logo={logo}
        handleLogout={handleLogout}
        setIsOpen={setIsOpen}
      />
    </header>
  );
};

export default Navbar;