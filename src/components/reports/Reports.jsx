import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getBookingsByDateRange } from '../../services/reportsService';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('Food Orders');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    const filteredBookings = await getBookingsByDateRange(activeTab, startDate, endDate);
    setBookings(filteredBookings);
    console.log(bookings)
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text(`Report for ${activeTab}`, 10, 10);
    doc.autoTable({
      startY: 20,
      head: [['Name', 'Date', 'Status']],
      body: bookings.map((booking) => [booking.name, booking.date.toDate().toDateString(), booking.status]),
    });
    doc.save(`${activeTab}-report.pdf`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4">
        {['Food Orders', 'Rental Orders', 'Room Orders', 'Hall Orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-white rounded-[50px] ${
              tab === activeTab ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center mb-6">
        <div>
          <label className="block font-semibold mb-1">Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="border p-2 rounded" />
        </div>
        <button onClick={fetchBookings} className="bg-green-500 text-white px-4 py-2 rounded">
          Generate Report
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={handleDownloadReport} className="bg-blue-500 text-white px-4 py-2 rounded">
          Download Report
        </button>
        <button onClick={handlePrintReport} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Print Report
        </button>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border p-4 rounded shadow-lg">
            <h4 className="font-semibold">{booking.name}</h4>
            {/* <p>Date: {booking.date.toDate().toDateString()}</p> */}
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
