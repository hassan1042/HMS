import React, { useEffect, useState } from "react";
import { saveFoodOrder } from "../../services/foodService";
import FoodCard from "./FoodCard";
import { auth } from "../../firebase/Firebase";
import { fetchFoodItems } from "../../services/foodRegService";
import { Timestamp } from "firebase/firestore";
import Loader from "../common/loader/Loader";
import Tabs from "./Tabs";
import BookingForm from "./BookingForm";

const categories = ["All", "Full Course", "Lunch", "Breakfast"];

const FoodOrderMain = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFoodOrders = async () => {
      const foodOreders = await fetchFoodItems();
      setFoodItems(foodOreders);
      setLoading(false);
    };
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
    const items = Object.values(order).filter((item) => item.quantity > 0);
    if (items.length === 0) {
      alert("Please add items to your order.");
      return;
    }

    const orderData = {
      userId: auth.currentUser.uid,
      name: formData.name,
      contact: formData.contact,
      address: formData.address,
      items,
      status: "pending",
      applyDate: Timestamp.fromDate(new Date()),
    };
    if (
      formData.name.trim() &&
      formData.address.trim() &&
      formData.contact.trim()
    ) {
      try {
        await saveFoodOrder(orderData);
        alert("Order placed successfully!");
        setFormData({
          name: "",
          contact: "",
          address: "",
        });
      } catch (error) {
        console.error("Error placing the order:", error);
        alert("Something went wrong. Please try again!");
      }
    } else {
      alert("Fill all the details, please!");
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return loading ? (
    <Loader msg={"Fetching Food Items"} />
  ) : (
    <div className="p-6">
      <h1 className="text-2xl lg:text-3xl text-center font-bold mb-4">
        Food Order
      </h1>
      <Tabs
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      {foodItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((foodItem) => (
              <FoodCard
                key={foodItem.id}
                foodItem={foodItem}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg lg:text-xl">
              No Items Found in this Category try Choosing Something else please
            </p>
          )}
        </div>
      ) : (
        <div>No items Found</div>
      )}
      <BookingForm
        order={order}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export default FoodOrderMain;