import React, { useState } from "react";
import { auth } from "../../firebase/Firebase";
import RoomBooking from "./RoomBookingForm";
import Auth from "../common/auth/Index";
import SubmitButton from "../common/button/SubmitButton";
import { FaBed } from "react-icons/fa";
import { updateRoomAvailability } from "../../services/roomBookingService";

const ADMIN_UID = "6HVNgEkgDfXnco34ujwrVfpmwbx2"; // 🔁 Replace with actual UID


const RoomCard = ({ room }) => {
  const [showForm, setShowForm] = useState(false);
  const [available, setAvailable] = useState(room.available);

  const handleBookNow = () => {
    if (!available) return;

    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      alert("Please log in to book a room");
    }
  };

  const toggleAvailability = async () => {
    const newAvailability = !available;
    await updateRoomAvailability(room.id, newAvailability);
    setAvailable(newAvailability);
  };

  const isAdmin = auth.currentUser?.uid === ADMIN_UID;

  return (
    <div className="border rounded-lg shadow-lg bg-white p-4 max-w-sm mx-auto">
      {/* Room Image, Info */}
      <img className="w-full h-40 object-cover rounded" src={room.imageUrl} alt="room" />
      <h3 className="text-xl font-bold">{room.name}</h3>
      <p>{room.description}</p>
      <p className="text-gray-500">{room.price}$ per day</p>

      {/* Admin Only Toggle */}
      {isAdmin && (
        <button onClick={toggleAvailability} 
        className={`px-4 py-1 mb-3 rounded font-semibold ${available ? 'bg-green-400' : 'bg-red-400'} text-white`}
        >
          {available ? "Mark as Unavailable" : "Mark as Available"}
        </button>
      )}

      {/* Book Button */}
      <div className="bg-blue-200 flex w-fit mx-auto">
        <button
          onClick={handleBookNow}
          disabled={!available}
          className={`w-full ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <SubmitButton callToAction={"Book Now"} />
        </button>
      </div>

      {showForm && <RoomBooking room={room} />}
    </div>
  );
};


export default RoomCard;
