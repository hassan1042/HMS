import jsPDF from "jspdf";
import logo from "../../assets/common/magnum.png";

export const downloadReport = (activeTab, bookings) => {
  const doc = new jsPDF();

  // Add logo and contact details at the top
  const phoneNumber = "123-456-7890";
  const email = "info@example.com";

  doc.addImage(logo, "PNG", 10, 10, 30, 30);
  doc.setFontSize(12);
  doc.text("Phone: " + phoneNumber, 50, 20);
  doc.text("Email: " + email, 50, 30);

  // Add a separator line
  doc.setLineWidth(0.5);
  doc.line(10, 40, 200, 40);

  // Title of the report
  doc.setFontSize(16);
  doc.text(`Report for ${activeTab} of Magnum Hotel`, 10, 50);

  // Add table with booking details
  doc.autoTable({
    startY: 60,
    head: [["Name", "Date", "Status", "Contact"]],
    body: bookings.map((booking) => [
      booking.name,
      new Date(booking.applyDate.seconds * 1000).toLocaleDateString(),
      booking.status,
      booking.contact,
    ]),
  });

  // Add footer details
  const pageHeight = doc.internal.pageSize.height;
  doc.setLineWidth(0.5);
  doc.line(10, pageHeight - 20, 200, pageHeight - 20);
  doc.setFontSize(10);
  doc.text(
    "Generated by MHMS - Magnum Hostel Management System © 2024",
    10,
    pageHeight - 10
  );

  // Save the PDF
  doc.save(`${activeTab}-report.pdf`);
};