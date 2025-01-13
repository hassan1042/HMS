import { useEffect, useState } from "react";
import { getFoodOrders } from "../../services/orderService";
import { getRentalVehicles } from "../../services/vehicleRentalService";
import { fetchHallsBookings } from "../../services/hallRegService";
import { getRoomBookings } from "../../services/roomBookingService";
import Loader from "../common/loader/Loader";
import VehicleOrder from "../user-records/vehicle/VehicleOrder";
import Halls from "../user-records/hall/Halls";
import Rooms from "../user-records/rooms/Rooms";
import FoodOrder from "../user-records/food/FoodOrder";


const AdminRecords = () => {
  const [activeTab, setActiveTab] = useState("Food Order");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


   // Mock: Selected fields for each booking type
   const bookingFields = {
    "Food Order": ["userName", "status", ],
    "Rental Bookings": ["name", "vehicleName", "startDate", "endDate", ],
    "Hall Bookings": ["name", "hallName", "startDate", "endDate", "status"],
    "Room Bookings": ["name", "room", "startDate", "endDate", "status"],
  };



  // Fetch data based on active tab
  const fetchBookings = async () => {
    let data = [];
    if (activeTab === "Food Order") data = await getFoodOrders();
    if (activeTab === "Rental Bookings") data = await getRentalVehicles();
    if (activeTab === "Hall Bookings") data = await fetchHallsBookings();
    if (activeTab === "Room Bookings") data = await getRoomBookings();

    // Filter bookings for the current user
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

const records = [
    {
        name: "Food Order",
        comp : FoodOrder,
    },
    {
        name: "Rental Bookings",
        comp : VehicleOrder,
    },
    {
        name: "Hall Bookings",
        comp : Halls,
    },
    {
        name: "Room Bookings",
        comp : Rooms,
    },
]

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b-2 mb-4 overflow-x-auto">
        {["Food Order", "Rental Bookings", "Hall Bookings", "Room Bookings"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Records */}
    {
      loading ? <Loader msg={"Fetching Records"} /> :
      <div>
        {bookings.length ? (        
        <>
        {
        records.map((record) => (
            activeTab === record.name &&  <record.comp
          activeTab={activeTab}
          bookingFields={bookingFields}
          bookings={bookings}
         /> 
        ))

        }
    
        </>        
        ) : (
          <p>No records found for {activeTab}.
          </p>
        )}
      </div>
    }
    </div>
  );
};

export default AdminRecords