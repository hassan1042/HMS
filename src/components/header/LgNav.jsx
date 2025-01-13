import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { adminNavs, bookingNavs, userNavs } from "./navs";

function LgNav({ isOpen, currentUser, logo, handleLogout }) {
  return (
    <div
      className={`hidden lg:flex ${
        isOpen ? "block" : "hidden"
      } lg:space-x-6 flex-wrap justify-center`}
    >
      <NavLink to="/" className="block py-2 px-4 hover:bg-blue-700">
        <img className="w-10 h-8" src={logo} alt="" />
      </NavLink>
      {/** Navs for Booking */}
      {bookingNavs.map((nav, i) => {
        return (
          <NavLink
            key={i}
            to={`/${nav.nv}`}
            className={({isActive}) =>  `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}
          >
            {nav.cont}
          </NavLink>
        );
      })}
      {/** Navs for Admin */}
      {currentUser &&
        currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" &&
        adminNavs.map((nav, i) => {
          return (
            <NavLink
              key={i}
              to={`/${nav.nv}`}
              className={({isActive}) => `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}
            >
              {nav.cont}
            </NavLink>
          );
        })}
      {/** Navs for Users */}
      {currentUser &&
        currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" &&
        userNavs.map((nav, i) => {
          return (
            <NavLink
              key={i}
              to={`/${nav.nv}`}
              className={({isActive}) => `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}

            >
              {nav.cont}
            </NavLink>
          );
        })}

      {!currentUser && (
        <NavLink
          to="/login"
          className="block py-2 px-4 hover:bg-blue-700  cursor-pointer text-xl"
        >
          <CiLogin />
        </NavLink>
      )}
      {currentUser && (
        <button
          onClick={handleLogout}
          className="block py-2 px-4 hover:bg-blue-700 cursor-pointer text-xl"
        >
          <IoIosLogOut />
        </button>
      )}
    </div>
  );
}

export default LgNav;