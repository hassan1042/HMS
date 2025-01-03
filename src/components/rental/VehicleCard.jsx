// src/components/VehicleCard.js
import React, { useState } from 'react';
import VehicleBooking from './VehicleBookingForm';
import { auth } from '../../firebase/Firebase';
import CardRate from '../common/cards/CardRate';

const VehicleCard = ({ vehicle }) => {
  const [showForm, setShowForm] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleBookNow = () => {
    if (auth.currentUser) {
      setShowForm(!showForm);
    } else {
      alert('Please log in to apply for vehicle rental');
    }
  };

  const toggleAvailability = () => setIsAvailable(prev => !prev);

  return (
    <div className="p-2 md:p-4 w-full  flex relative flex-wrap">
    <CardRate vehicle={vehicle} handleSubmit={handleBookNow}/>
          {showForm && <VehicleBooking vehicle={vehicle} />}
      
      {/* Admin-only availability toggle (Apply restrictions later) */}
      <button onClick={toggleAvailability} className="bg-gray-600 text-white p-2 mt-2 rounded absolute -bottom-5 right-[35%] ">
        {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
      </button>
    </div>
  );
};

export default VehicleCard;
