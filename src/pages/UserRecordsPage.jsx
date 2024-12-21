import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For better table styling
import { getFoodOrders } from "../services/orderService";
import { getRentalVehicles } from "../services/vehicleRentalService";
import { fetchHalls } from "../services/hallRegService";
import { getRoomBookings } from "../services/roomBookingService";
import { useAuth } from "../contexts/authContext";

const UserRecordsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Order");
  const [bookings, setBookings] = useState([]);
  const {currentUser} = useAuth();

   // Mock: Selected fields for each booking type
   const bookingFields = {
    "Food Order": ["orderId", "items", "userName", "status", "timestamp"],
    "Rental Bookings": ["bookingId", "carModel", "pickupLocation", "price", "timestamp"],
    "Wedding Hall Bookings": ["bookingId", "hallName", "eventDate", "guests", "price"],
    "Room Bookings": ["bookingId", "roomType", "checkIn", "checkOut", "price"],
  };

  // Format Firestore timestamps
  const formatTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return "N/A";
  };

  // Fetch data based on active tab
  const fetchBookings = async () => {
    let data = [];
    if (activeTab === "Food Order") data = await getFoodOrders();
    if (activeTab === "Rental Bookings") data = await getRentalVehicles();
    if (activeTab === "Wedding Hall Bookings") data = await fetchHalls();
    if (activeTab === "Room Bookings") data = await getRoomBookings();

    // Filter bookings for the current user
    setBookings(data.filter((booking) => booking.userId === currentUser.uid));
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  // Download individual booking record as PDF
  const downloadRecordPDF = (booking) => {
    const doc = new jsPDF();
    doc.text(`${activeTab} Booking Details`, 14, 10);

    // Add booking details to PDF
    const details = bookingFields[activeTab];
    let y = 20;
    details.forEach((field) => {
      const value = booking[field]?.seconds
        ? formatTimestamp(booking[field]) // Format timestamps
        : booking[field]?.toString();
      doc.text(`${field}: ${value || "N/A"}`, 14, y);
      y += 10;
    });

    // Save PDF
    doc.save(`${activeTab}_Booking_${booking.bookingId || booking.orderId}.pdf`);
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b-2 mb-4">
        {["Food Order", "Rental Bookings", "Wedding Hall Bookings", "Room Bookings"].map((tab) => (
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
      <div>
        {bookings.length ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {bookingFields[activeTab].map((field) => (
                  <th key={field} className="border border-gray-300 px-4 py-2 text-left">
                    {field}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  {bookingFields[activeTab].map((field) => (
                    <td key={field} className="border border-gray-300 px-4 py-2">
                      {booking[field]?.seconds
                        ? formatTimestamp(booking[field])
                        : booking[field]?.toString() || "N/A"}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => downloadRecordPDF(booking)}
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found for {activeTab}.</p>
        )}
      </div>
    </div>
  );
};

export default UserRecordsPage;