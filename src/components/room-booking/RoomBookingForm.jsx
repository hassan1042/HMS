// src/components/RoomBooking.js
import React, { useState } from 'react';
import { auth } from '../../firebase/Firebase';
import { addRoomBooking } from '../../services/roomBookingService';
import {inputStyles} from '../registrations/FoodRegistration'

const RoomBooking = ({ room }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [cnic, setCnic] = useState('');
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
      cnic,
      startDate,
      endDate
    };
    await addRoomBooking(bookingData);
    alert('Booking request sent successfully');
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
        type="number"
        value={cnic}
              onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 13) {
                    setCnic(e.target.value);
                  }
                }}
        placeholder="Your CNIC no hyphens"
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}

      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
        max={endDate}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
        min={startDate}
      />
      <button type="submit" className="bg-green-600 hover:bg-green-800 transition-all duration-200 text-white p-2 rounded w-full">
        Apply Booking
      </button>
    </form>
  );
};

export default RoomBooking;
