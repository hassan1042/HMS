import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { useAuth } from '../../contexts/authContext';
import HallCard from './HallCard';
import BookButton from '../common/button/BookButton';
import {inputStyles} from '../registrations/FoodRegistration'

const WeddingHallCard = ({ hall }) => {
  const { currentUser } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [totalRate, setTotalRate] = useState(0);
  const [bookingData, setBookingData] = useState({
    name: '',
    contact: '',
    startDate: '',
    endDate: '',
    people: '',
    cnic: '',
  });
  const handleTotalRate = () => {
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const rate = days * hall.pp;
    console.log(hall.pp)
    setTotalRate(rate);
    console.log(rate)
}

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please log in to book");
    handleTotalRate();
    const bookingInfo = {
      ...bookingData,
      userId: currentUser.uid,
      hallName: hall.name,
      hallId: hall.id,
      status: "Pending",
      totalRate,
      createdAt: serverTimestamp(),
      applyDate: Timestamp.fromDate(new Date()),
    };

    try {
      await addDoc(collection(db, 'wedding-hall-bookings'), bookingInfo);
      setIsBooking(false);
      alert("Booking request sent!");
    } catch (error) {
      console.error("Error booking hall:", error);
    }
  };


  return (
    <div className="p-4 bg-white mx-auto  flex justify-center items-center flex-col w-full">
    
      <HallCard hall={hall}/>
    <BookButton text={"Book Now"} setIsBooking={setIsBooking} isBooking={isBooking}/>     
      {isBooking && (
        <form onSubmit={handleBookingSubmit} className="mt-4 flex flex-col justify-center items-center space-y-3 w-full">
          <input
          className={inputStyles}
            type="text"
            placeholder="Name..."
            required
            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
          />
           <input
          className={inputStyles}
            type="number"
            placeholder="Number of People"
            required
            onChange={(e) => setBookingData({...bookingData, people: e.target.value})}
          />
          <input
          className={`${inputStyles}  `}
            type="tel"
            placeholder="Contact Number"
            required
            onChange={(e) => setBookingData({...bookingData, contact: e.target.value})}
          />
            <input
          className={`${inputStyles}  `}
            type="number"
            placeholder="Your CNIC no hyphens"
            required
            onChange={(e) => setBookingData({...bookingData, cnic: e.target.value})}
          />
          <input
            type="date"
            className={`${inputStyles} w-full `}
            placeholder="Start Date"
            required
            onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
          />
          <input
            type="date"
            className={`${inputStyles} w-full `}
            placeholder="End Date"
            required
            onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
          />
        <p onClick={handleTotalRate} className='font-bold cursor-pointer'>Total: ${totalRate}</p>
          <button type="submit" className="mt-4 bg-green-500 hover:bg-green-800 transition-all duration-200 text-white px-6 py-2 rounded-xl">Submit</button>
        </form>
      )}
    </div>
  );
};

export default WeddingHallCard;
