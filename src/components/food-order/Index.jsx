// src/pages/FoodOrder.js

import React, { useEffect, useState } from 'react';
import { saveFoodOrder } from '../../services/foodService';
import FoodCard from './FoodCard';
import { auth } from '../../firebase/Firebase';
import { fetchFoodItems } from '../../services/foodRegService';
import { inputStyles } from '../registrations/FoodRegistration';



const categories = ['All', 'Full Course', 'Lunch', 'Breakfast', 'Beverages'];

const FoodOrderMain = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({ name: '', contact: '', address: '' });
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    const fetchAllFoodOrders = async () =>{
      const foodOreders = await fetchFoodItems();
      setFoodItems(foodOreders);
    }
    fetchAllFoodOrders();
}, []);

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleQuantityChange = (foodItem, quantity) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [foodItem.id]: { ...foodItem, quantity },
    }));
  };

  const handleSubmitOrder = async () => {
   

    const items = Object.values(order).filter(item => item.quantity > 0);
    if (items.length === 0) {
      alert('Please add items to your order.');
      return;
    }

    const orderData = {
      userId: auth.currentUser.uid,
      userName: formData.name,
      contact: formData.contact,
      address: formData.address,
      items,
      status:"pending",
    };

    await saveFoodOrder(orderData);
    alert('Order placed successfully!');
  };

  const filteredItems = selectedCategory === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Food Order</h1>
      <div className="mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 mr-2 rounded-xl shadow-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(foodItem => (
          <FoodCard key={foodItem.id} foodItem={foodItem} onQuantityChange={handleQuantityChange} />
        ))}
      </div>
    <div className='flex flex-col justify-start  items-start'>
    {Object.values(order).some(item => item.quantity > 0) && (
        <div className="mt-6 p-4 border rounded-lg shadow-md w-fit ">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <div className="mb-2">
            <label>Name:</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`border p-1 w-full ${inputStyles}`} />
          </div>
          <div className="mb-2">
            <label>Contact:</label>
            <input type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className={`border p-1 w-full ${inputStyles}`} />
          </div>
          <div className="mb-2">
            <label>Address:</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={`border p-1 w-full ${inputStyles}`} />
          </div>
          <button onClick={handleSubmitOrder} className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-800 transition-all duration-200 text-white rounded">Place Order</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default FoodOrderMain;






