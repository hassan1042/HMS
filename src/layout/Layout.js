import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/header/Navbar';
import Footer from '../components/footer/Footer';


const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow container mx-auto p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
