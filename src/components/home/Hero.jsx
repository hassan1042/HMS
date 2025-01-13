import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import ImgLoader from "../common/loader/ImgLoader";

const HeroSection = () => {
  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const snapshot = await getDocs(collection(db, "custom-pics"));
        const heroBg = snapshot.docs.map((doc) => doc.data()); // Assuming `url` field contains the image link
        if (heroBg.length > 0) {
          setBg(heroBg[0]); // Set the first URL if it exists
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);
  return loading ? (
    <div className="h-screen w-full relative">
      <ImgLoader />
    </div>
  ) : (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: bg ? `url(${bg.heroBg})` : "none", // Set the background image if `bg` exists
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-6">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeInDown mb-6">
          Experience Luxury & Comfort
        </h1>
        <p className="text-lg mb-8 animate-fadeInUp">
          Welcome to Magnum - Your dream stay awaits!
        </p>
        <Link
          to="/room-booking"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 animate-fadeIn"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;