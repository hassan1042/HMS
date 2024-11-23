import React from 'react'


function UserRentalNotifications({rentalVehicles, handleDelete}) {
 
  return (
    <div className="container mx-auto p-4 flex justify-between items-center flex-wrap">
    {rentalVehicles.length === 0 ? (
      <p className="text-gray-500 italic">No notifications yet (Rental)</p>
    ) : (
      rentalVehicles.map((vehicleNotification, i) => (
        <div
          key={i}
          className="p-4 mb-4 bg-white border shadow-sm rounded-lg transform transition duration-500 hover:shadow-lg hover:scale-105"
        >
          <p className="font-semibold text-gray-800">{vehicleNotification.userName}</p>
          <p className="text-gray-600">{vehicleNotification.message}</p>
          <p className='font-semibold text-gray-700'> Ordered vehicle: {vehicleNotification.orderedVehicle}</p>
          <button
            onClick={() => handleDelete(vehicleNotification.id, 'vehicle-rental-notifications')}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-600 hover:scale-105"
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
  
  )
}

export default UserRentalNotifications
