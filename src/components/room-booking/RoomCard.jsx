// src/components/RoomCard.js
import React, { useState } from "react";
import { auth } from "../../firebase/Firebase";
import RoomBooking from "./RoomBookingForm";
import Auth from "../common/auth/Index";
import SubmitButton from "../common/button/SubmitButton";
import { FaBed } from "react-icons/fa";

const RoomCard = ({ room }) => {
  const [showForm, setShowForm] = useState(false);

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      alert("Please log in to book a room");
      return <Auth />;
    }
  };

  return (
    <div className="border rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 bg-white max-w-sm mx-auto p-4 space-y-3">
      <div className="overflow-hidden rounded-t-lg">
        <img
          className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
          src={room.imageUrl}
          alt="room"
        />
      </div>
      <div className="text-center">
        <div className="flex justify-between items-center">
          <h3 className="text-lg lg:text-2xl font-semibold text-gray-800 mb-2">
            {room.name}
          </h3>
          <h3
            title="Per day"
            className="text-lg lg:text-2xl font-semibold text-gray-800 mb-2"
          >
            {room.price}$
          </h3>
          <p
          title="No. of Beds"
          className="text-lg lg:text-2xl font-semibold text-gray-800 mb-2 flex justify-center items-center "
        >
          {room.beds}{" "}
          <span className="ms-2">
            <FaBed />
          </span>
        </p>
        </div>
        <p className="text-gray-600 italic mb-4">{room.description}</p>
      </div>
      

        <div className="bg-blue-200 flex w-fit mx-auto" onClick={handleBookNow}>
          <SubmitButton callToAction={"Book Now"} />
        </div>
      {showForm && <RoomBooking room={room} />}
    </div>
  );
};

export default RoomCard;
