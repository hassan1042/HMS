import React from 'react'
import { inputStyles } from '../../registrations/FoodRegistration';

function BookingForm({handleBooking, name, setName, contact, setContact, cnic, setCnic, startDate, setStartDate, endDate, setEndDate, totalRate,}) {
  return (
    <form onSubmit={handleBooking} className="mt-4  flex flex-col justify-center items-center w-full">
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
      type="number"
      value={cnic}
      onChange={(e) => setCnic(e.target.value)}
      placeholder="Your Cnic no hyphens(-)"
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
      max={endDate}
    />
    <input
      type="date"
      value={endDate}
      onChange={(e) => {
        setEndDate(e.target.value);
      }}
      className={`w-full p-2 mb-2 border rounded ${inputStyles} `}
     min={startDate}
    />
    <div>
      <p className='font-bold'>Total: ${totalRate}</p>
    </div>
    <button type="submit" className="bg-green-600 hover:bg-green-800 transition-all duration-200 text-white p-2 rounded w-full">
      Apply Booking
    </button>
  </form>
  )
}

export default BookingForm
