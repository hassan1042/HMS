import React from 'react'
import { CiLogin } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

function LgNav({isOpen, currentUser, logo, handleLogout, }) {
  return (
    <div
          className={`hidden lg:flex ${
            isOpen ? "block" : "hidden"
          } lg:space-x-6 flex-wrap justify-center`}
        >
          <NavLink to="/" className="block py-2 px-4 hover:bg-blue-700">
            <img className="w-10 h-8" src={logo} alt="" />
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
            Halls
          </NavLink>
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/admin-notifications"
            className="py-2 px-4 hover:bg-blue-700 rounded"
          >
             Notifications
          </NavLink>
        )}
        {currentUser && currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/user-notifications"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Notifications
          </NavLink>
        )}
        {currentUser && currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/user-chat"
            className="block py-2 px-4 hover:bg-blue-700"
          >
             Chat
          </NavLink>
        )}
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/admin-chat"
            className="block py-2 px-4 hover:bg-blue-700"
          >
             Chat
          </NavLink>
        )}
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/registrations"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Registrations
          </NavLink>
        )}
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/reports"
            className="block py-2 px-4 hover:bg-blue-700"
          >
            Reports
          </NavLink>
        )}
        {currentUser && currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/user-records"
            className="block py-2 px-4 hover:bg-blue-700"
          >
             Records
          </NavLink>
        )}
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <NavLink
            to="/admin-records"
            className="block py-2 px-4 hover:bg-blue-700"
          >
             Records
          </NavLink>
        )}  
          {!currentUser && (
            <NavLink to="/login" className="block py-2 px-4 hover:bg-blue-700  cursor-pointer text-xl">
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
  )
}

export default LgNav
