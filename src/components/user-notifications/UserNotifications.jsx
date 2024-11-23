// src/pages/UserNotifications.js

import React, { useEffect, useState } from 'react';
import { deleteNotification, getUserFoodNotifications } from '../../services/userFoodNotifications.js';
import { useAuth } from '../../contexts/authContext.js';
import UserFoodNotification from './UserFoodNotification.jsx';
import UserRentalNotifications from '../rental/UserRentalNotifications.jsx';
import { getRentalVehiclesNotification } from '../../services/vehicleRentalService.js';
import UserControlsRoom from '../room-booking/UserControlsRoom.jsx';
import { getRoomBookingsNotification } from '../../services/roomBookingService.js';
import UserControlsHall from '../wedding-hall/UserControlsHall.jsx';

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState('food-orders');
  const [foodNotifications, setFoodNotifications] = useState([]);
  const [rentalVehicles, setRentalVehicles] = useState([]);
  const [roomNotifications, setRoomNotifications] = useState([]);
  const tabs = [
    {
      order: 'food-orders',
    },
    {
      order: 'rental-orders',
    },
    {
      order: 'room-bookings',
    },
    {
      order: 'hall-bookings',
    },
  ]

  const { currentUser } = useAuth(); // Get the current user's ID

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const userNotifications = await getUserFoodNotifications(currentUser.uid);
        setFoodNotifications(userNotifications);
      }
    };
    const fetchRentalInfo = async () => {
      const appliedRental = await getRentalVehiclesNotification();
      const myVehicles = appliedRental.filter((vehicle) => {
          return vehicle.userId === currentUser.uid;
      });
      setRentalVehicles(myVehicles);


  }
  const getRoomNotifications = async () => {
    const roomBookingNotification = await getRoomBookingsNotification();
    const myNotifications = roomBookingNotification.filter((room) => {
      return room.userId === currentUser.uid ;
    });
    setRoomNotifications(myNotifications);
    
  }
  getRoomNotifications();
    fetchNotifications();
    fetchRentalInfo();
  }, [currentUser, activeTab]);

  const handleDelete = async (notificationId, collectionNotification) => {
    await deleteNotification(notificationId, collectionNotification);
    alert("Notification deleted successfully");
    setFoodNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
    setRentalVehicles((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
    setRoomNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="flex space-x-4 mb-6">

{
  tabs.map((but, i) => {
   return <button
   key={i}
    onClick={() => setActiveTab(but.order)}
    className={`px-4 py-2 rounded ${
      activeTab === but.order
        ? "bg-blue-500 text-white"
        : "bg-gray-200"
    }`}
  >
   {but.order}
  </button>
  })
}
</div>

      {activeTab === 'food-orders' && (
     <UserFoodNotification handleDelete={handleDelete} notifications={foodNotifications}/>
      )}

      {activeTab === 'rental-orders' && (
        <div>
          {/* <p className="text-gray-500">Rental orders functionality is under development.</p> */}
          <UserRentalNotifications rentalVehicles={rentalVehicles} handleDelete={handleDelete}/>
        </div>
        
      )}
      {activeTab === 'room-bookings' && (
        <div>
          <UserControlsRoom roomNotifications={roomNotifications}  handleDelete={handleDelete}/>
        </div>
        
      )}
      {activeTab === 'hall-bookings' && (
        <div>
          <UserControlsHall   handleDelete={handleDelete}/>
        </div>
        
      )}
    </div>
  );
};

export default UserNotifications;
