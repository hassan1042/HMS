// src/pages/VehicleRentalPage.js
import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';
import { fetchVehicles } from '../../services/rentalRegService';

const VehicleRentalPage = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const fetchAllVehicles = async () => {
      const allVehicles = await fetchVehicles();
      setVehicles(allVehicles);
    }
    fetchAllVehicles();
  }, []);
 

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Available Vehicles</h1>
      <div className="flex w-full ">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleRentalPage;
