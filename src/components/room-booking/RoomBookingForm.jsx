// src/components/RoomBooking.js
import React, { useState } from 'react';
import { auth } from '../../firebase/Firebase';
import { addRoomBooking } from '../../services/roomBookingService';
import {inputStyles} from '../registrations/FoodRegistration'

const RoomBooking = ({ room }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: auth.currentUser.uid,
      roomId: room.id,
      room: room.name,
      name,
      contact,
      status: 'vacant',
      startDate,
      endDate
    };
    await addRoomBooking(bookingData);
    alert('Room booked successfully');
  };

  return (
    <form onSubmit={handleBooking} className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
      />
      <input
        type="number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact Number"
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}

      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}

      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}

      />
      <button type="submit" className="bg-green-600 hover:bg-green-800 transition-all duration-200 text-white p-2 rounded w-full">
        Confirm Booking
      </button>
    </form>
  );
};

export default RoomBooking;
