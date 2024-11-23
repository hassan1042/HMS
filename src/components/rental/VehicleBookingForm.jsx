// src/components/VehicleBooking.js
import React, { useState } from 'react';
import { auth } from '../../firebase/Firebase';
import { addVehicleBooking } from '../../services/vehicleRentalService';
import { inputStyles } from '../registrations/FoodRegistration';

const VehicleBooking = ({ vehicle }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');
  const [totalRate, setTotalRate] = useState(0);

const handleTotalRate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const rate = days * vehicle.price;
    setTotalRate(rate);
}
  const handleBooking = async (e) => {
    e.preventDefault();
      handleTotalRate();

    const bookingData = {
      userId: auth.currentUser.uid,
      vehicleId: vehicle.id,
      name,
      contact,
      vehicleName: vehicle.name,
      startDate,
      endDate,
      totalRate,
      status : 'pending',
      available: true,
    };
    await addVehicleBooking(bookingData);
    alert('Vehicle booked successfully');
  };

  return (
    <form onSubmit={handleBooking} className="mt-4  flex flex-col justify-center items-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
      />
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact Number"
        className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        //   calculateTotalRate();
        }}
        className={`w-full p-2 mb-2 border rounded ${inputStyles} `}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
        className={`w-full p-2 mb-2 border rounded ${inputStyles} `}

      />
      <div>
        <p className='font-bold'>Total: ${totalRate}</p>
      </div>
      <button type="submit" className="bg-green-600 hover:bg-green-800 transition-all duration-200 text-white p-2 rounded w-full">
        Confirm Booking
      </button>
    </form>
  );
};

export default VehicleBooking;
