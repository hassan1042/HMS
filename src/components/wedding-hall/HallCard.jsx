import React from 'react'


function HallCard({image, name , desc, ppp, }) {
  
  return (
/* From Uiverse.io by ElSombrero2 */ 
<div  className="relative max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-50 cursor-pointer">
<div className="content">
  <img
    className="w-full h-40 object-cover mb-4 transition-transform duration-300 hover:scale-110"
    src={image}
    alt={name}
  />
  <div className="p-4 flex flex-col justify-between h-full">
    <p className="text-center text-2xl font-semibold mb-2 text-gray-800">{name}</p>
    <p className="italic text-justify px-1 text-gray-600">{desc}</p>
    <p className="text-start text-xl px-2 font-bold mt-4 text-indigo-600">${ppp} <span className="font-medium text-gray-500">PP</span></p>
  </div>
</div>
{/* Optional Glow Animation */}
<div className="absolute inset-0 bg-indigo-200 opacity-0 hover:opacity-25 rounded-lg transition duration-300"></div>
</div>
// </div>
  )
}

export default HallCard
