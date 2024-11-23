import React, { useEffect, useState } from "react";
import { fetchRooms } from "../../services/roomRegService";
import RoomBooking from "../room-booking/RoomBookingForm";
import { auth } from "../../firebase/Firebase";

const RoomsSection = () => {
  const [rooms, setRooms] = useState();
  const [selRoom, setSelRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getRooms = async () => {
      const allRooms = await fetchRooms();
      setRooms(allRooms);
    };
    getRooms();
  }, []);
  const handleBookNow = (room) => {
    if (auth.currentUser) {
      setShowForm(!showForm);
      setSelRoom(room);
      console.log(selRoom);
    } else {
      alert("Please log in to book a room");
    }
  };

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Rooms</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms &&
            rooms.map((room) => (
              <div
                key={room.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:scale-105"
              >
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-yellow-500">
                      ${room.price}/day
                    </span>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showForm && <RoomBooking room={selRoom} />}

        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
