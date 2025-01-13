import React, { useState } from 'react';

const FoodCard = ({ foodItem, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(foodItem, newQuantity);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(foodItem, newQuantity);
    }
  };

  return (
    <div className="w-full mx-auto p-5 bg-white border rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <div className='flex justify-between items-center'>
    <img className='rounded-full h-20 w-20' src={foodItem.imageUrl} alt="" />
    <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{foodItem.name}</h3>
    </div>
    <p className="text-gray-600 italic mb-4 py-2" >{foodItem.desc}</p>


    <div className="flex items-center justify-center mt-4">
      <button 
        onClick={handleRemove} 
        className="px-3 py-1 text-lg bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 transform hover:scale-110"
      >
        -
      </button>
      <span className="mx-4 text-xl font-semibold">{quantity}</span>
      <button 
        onClick={handleAdd} 
        className="px-3 py-1 text-lg bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 transform hover:scale-110"
      >
        +
      </button>
    </div>

  <div className="flex justify-between items-center">
  <p title='Per Itme' className="text-green-600 text-lg font-semibold"> ${foodItem.price}</p>
    
    <p className="text-xl font-bold text-gray-800 ">Total: <span className="text-green-600">${quantity * foodItem.price}</span></p>
  </div>
  </div> 
  );
};

export default FoodCard;
