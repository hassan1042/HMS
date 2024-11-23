// src/pages/Parking.js

import React, { useEffect, useState } from 'react';
import ParkingCard from './ParkingCard';
import { fetchParkingSpots } from '../../services/parkingRegService';

const ParkingMain = () => {
  const [parkingOptions, setParkingOptions] = useState([]);

  useEffect(() => {
    const fetchParkingOptions = async () => {
      const options = await fetchParkingSpots();
      setParkingOptions(options);
    };
    fetchParkingOptions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Parking Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parkingOptions.map((vehicle) => (
          <ParkingCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default ParkingMain;
 





