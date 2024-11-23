import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('hero-image.jpg')` }}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center text-white px-6">
      <h1 className="text-5xl font-bold animate-fadeInDown mb-6">Experience Luxury & Comfort</h1>
      <p className="text-lg mb-8 animate-fadeInUp">Welcome to [Hotel Name] - Your dream stay awaits!</p>
      <Link to='/room-booking' className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 animate-fadeIn">
        Book Now
      </Link>
    </div>
  </section>
);

export default HeroSection;
