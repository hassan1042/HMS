// src/components/ParkingCard.js

import React, { useState, useEffect } from 'react';
import { toggleParkingAvailability } from '../../services/parkingService';

const ParkingCard = ({ vehicle,  }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalRate, setTotalRate] = useState(0);
  const [isAvailable, setIsAvailable] = useState(vehicle.isAvailable);

  // Calculate the rate based on selected dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      const rate = days * vehicle.rate;
      setTotalRate(rate);
    }
  }, [startDate, endDate, vehicle.rate]);

  // Toggle Availability
  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    await toggleParkingAvailability(vehicle.id, newAvailability);
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow-lg bg-white transform transition duration-300 hover:shadow-xl hover:scale-105">
    <div className="overflow-hidden rounded-lg">
      <img 
        src={vehicle.imageUrl} 
        alt={vehicle.name} 
        className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110" 
      />
    </div>
    <div className="text-center mt-4 space-y-2">
      <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
      <p className="text-gray-600">Description: <span className="font-semibold">{vehicle.category}</span></p>
      <p className="text-gray-600">Rate per day: <span className="text-green-600 font-semibold">${vehicle.rate}</span></p>
    </div>
    <div className="space-y-3 mt-4">
      <div className="flex justify-between items-center">
        <label className="text-gray-600 font-medium">Start Date:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="border rounded p-1 transition duration-200 focus:ring-2 focus:ring-blue-300" 
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="text-gray-600 font-medium">End Date:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="border rounded p-1 transition duration-200 focus:ring-2 focus:ring-blue-300" 
        />
      </div>
    </div>
    <p className="text-gray-800 font-semibold text-lg mt-4">Total Rate: <span className="text-green-600">${totalRate}</span></p>
    <button
      className={`mt-4 w-full py-2 rounded-lg transition-all duration-300 ${isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white font-semibold`}
      onClick={handleToggleAvailability}
    >
      {isAvailable ? 'Available' : 'Unavailable'}
    </button>
  </div>
  );
};

export default ParkingCard;
