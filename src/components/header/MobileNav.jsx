import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { bookingNavs, adminNavs, userNavs } from "./navs";

function MobileNav({ isOpen, currentUser, logo, handleLogout, setIsOpen }) {
  return (
    <div>
      {isOpen && (
        <div className="lg:hidden bg-blue-600 pb-4 text-center">
          <NavLink to="/" className="block py-2 px-4 hover:bg-blue-700">
            <img className="w-10 h-8  mx-auto" src={logo} alt="" />
          </NavLink>
          {/** Navs for Booking */}
          {bookingNavs.map((nav, i) => {
            return (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({isActive}) =>  `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}
                onClick={() => setIsOpen(false)}
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
                  className={({isActive}) =>  `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}
                  onClick={() => setIsOpen(false)}
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
                  className={({isActive}) =>  `${isActive ? 'text-teal-300' : 'text-white'} block py-2 px-4 hover:bg-blue-700 rounded`}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.cont}
                </NavLink>
              );
            })}
          {!currentUser && (
            <NavLink
              to="/login"
              className="block py-2 px-4 hover:bg-blue-700  cursor-pointer text-xl mx-auto"
              onClick={() => setIsOpen(false)}
            >
              <CiLogin />
            </NavLink>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 hover:bg-blue-700 cursor-pointer text-xl mx-auto "
            >
              <IoIosLogOut />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileNav;