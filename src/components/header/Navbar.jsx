import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useAuth } from "../../contexts/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("logout successful");
    } catch (error) {
      alert(`logout failed error: ${error}`);
      throw error;
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex flex-wrap  justify-between items-center py-4 px-6">
        <div className="text-lg font-bold mx-auto">Hotel Logo</div>

        {/* Hamburger Icon */}
        <button className="lg:hidden" onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>

        {/* Links for larger screens */}
        <div
          className={`hidden lg:flex ${
            isOpen ? "block" : "hidden"
          } lg:space-x-6 flex-wrap justify-center`}
        >
          <NavLink to="/" className="block py-2 px-4 hover:bg-blue-700">
            Home
          </NavLink>
          <NavLink
            to="/room-booking"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Room Booking
          </NavLink>
          <NavLink to="/rental" className="block py-2 px-4 hover:bg-blue-700">
            Rental{" "}
          </NavLink>
          <NavLink to="/parking" className="block py-2 px-4 hover:bg-blue-700">
            {" "}
            Parking
          </NavLink>
          <NavLink
            to="/food-order"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Food Order
          </NavLink>
          <NavLink
            to="/wedding-halls"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Wedding Halls
          </NavLink>
          <NavLink
            to="/admin-notifications"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Admin-Notifications
          </NavLink>
          <NavLink
            to="/user-notifications"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            user-notifications
          </NavLink>
          <NavLink
            to="/user-chat"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            User Chat
          </NavLink>
          <NavLink
            to="/admin-chat"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Admin Chat
          </NavLink>
          <NavLink
            to="/registrations"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Registrations
          </NavLink>
          <NavLink
            to="/reports"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Reports
          </NavLink>
          <NavLink
            to="/user-records"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            User Records
          </NavLink>
       
          {!currentUser && (
            <NavLink to="/login" className="block py-2 px-4 hover:bg-blue-700">
              Login
            </NavLink>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 hover:bg-blue-700"
            >
              logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-600 text-center pb-4">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Home
          </NavLink>
          <NavLink
            to="/room-booking"
            onClick={toggleMenu}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Room Booking
          </NavLink>
          <NavLink
            to="/rental"
            onClick={toggleMenu}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Rental{" "}
          </NavLink>
          <NavLink
            to="/parking"
            onClick={toggleMenu}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            {" "}
            Parking
          </NavLink>
          <NavLink
            to="/food-order"
            onClick={toggleMenu}
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Food Order
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
