import React from "react";
import { FaDownload } from "react-icons/fa";
import { downloadRecordPDF, formatTimestamp } from "../RecordPDF";

function FoodOrder({ bookingFields, bookings, activeTab }) {
  const handleDownload = (booking) => {
    downloadRecordPDF(booking, activeTab, bookingFields);
  };

  return (
    <table className="w-full border-collapse border border-gray-200 text-center">
      <thead>
        <tr>
          {bookingFields[activeTab].map((field) => (
            <th
              key={field}
              className="border border-gray-300 px-4 py-2 text-center"
            >
              {field}
            </th>
          ))}
          <th className="border border-gray-300  py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2 w-1/2 ">Items</th>
          <th className="border border-gray-300 px-4 py-2">Download</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {bookings.map((booking, index) => (
          <tr className="w-full" key={index}>
            {bookingFields[activeTab].map((field) => (
              <td key={field} className="border border-gray-300 capitalize">
                {booking[field]}
              </td>
            ))}
            <td className="border border-gray-300 py-2 text-center">
              {booking.applyDate?.seconds
                ? formatTimestamp(booking.applyDate)
                : booking.applyDate?.toString() || "N/A"}
            </td>
            <td className="w-[50%] border border-gray-300  space-x-4 text-start overflow-x-scroll element">
              {booking.items &&
                booking.items.map((item, i) => (
                  <ul
                    key={i}
                    className="flex justify-evenly items-center px-1 capitalize"
                  >
                    <li>{item.name}</li>
                    <li>Category:{item.category}</li>
                    <li>Quantiity:{item.quantity}</li>
                    <li>Price/{item.price}$</li>
                  </ul>
                ))}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleDownload(booking)}
              >
                <FaDownload />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FoodOrder;