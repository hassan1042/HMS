import React, { useState } from "react";
import AdminOrders from "../food-order/AdminOrder";
import AdminControls from "../rental/AdminControls";
import AdminControlsRoom from "../room-booking/AdminControlsRoom";
import AdminControlsHall from "../wedding-hall/AdminControlsHall";

function AdminNotifications() {
  const [activeTab, setActiveTab] = useState("food-orders");
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

  return (
    <div>
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
   

      {activeTab === "food-orders" && <AdminOrders />}
      {activeTab === "rental-orders" && <AdminControls />}
      {activeTab === "room-bookings" && <AdminControlsRoom />}
      {activeTab === "hall-bookings" && <AdminControlsHall />}
    </div>
  );
}

export default AdminNotifications;
