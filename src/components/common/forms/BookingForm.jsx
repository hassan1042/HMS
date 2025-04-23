import React, { useEffect, useState } from 'react'
import { inputStyles } from '../../registrations/FoodRegistration';
// import { newDate } from 'react-datepicker/dist/date_utils';

function BookingForm({handleBooking, name, setName, contact, setContact, cnic, setCnic, startDate, setStartDate, endDate, setEndDate, totalRate,}) {
  const [today, setToday] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; 
    setToday(formattedDate);
  }, []);
  return (
    <form onSubmit={handleBooking} className="mt-4  flex flex-col justify-center items-center w-full">
   <input
  type="text"
  value={name}
  onChange={(e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Allow letters and spaces only
    if (lettersOnly.length <= 15) {
      setName(lettersOnly);
    }
  }}
  placeholder="Name"
  className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
/>

    {/* <input
      type="number"
      value={contact}
      onChange={(e) => {
        const value = e.target.value;
        if(value.length <= 11){
       setContact(e.target.value);
        }
      }     
       }
      placeholder="Contact Number"
      className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
    /> */}
     <input
     required
  type="text"
  value={contact}
  onChange={(e) => {
    const onlyDigits = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (onlyDigits.length <= 11) {
      setContact(onlyDigits);
    }
  }}
  placeholder="Contact Number"
  className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
/>
    <input
     required
  type="text"
  value={cnic}
  onChange={(e) => {
    const onlyDigits = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (onlyDigits.length <= 13) {
      setCnic(onlyDigits);
    }
  }}
  placeholder="Your CNIC (no hyphens)"
  className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
/>

    <input
     required
      type="date"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
      //   calculateTotalRate();
      }}
      className={`w-full p-2 mb-2 border rounded ${inputStyles} `}
      max={endDate}
      min={today}
    />
    <input
     required
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
