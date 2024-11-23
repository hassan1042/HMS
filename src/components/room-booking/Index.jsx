// src/pages/RoomBookingPage.js
import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { fetchRooms } from "../../services/roomRegService";

const RoomBookingMain = () => {
  const [rooms, setRooms] = useState([]);
  // const rooms = [
  //   { id: 1, name: 'Deluxe Room', description: 'A cozy room with all amenities.' },
  //   { id: 2, name: 'Suite', description: 'A luxurious suite with a king-size bed.' }
  // ];
  useEffect(() => {
    const fetchAllRooms = async () => {
      const allRooms = await fetchRooms();
      setRooms(allRooms);
    };
    fetchAllRooms();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomBookingMain;
