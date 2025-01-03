import React from "react";
import "./home.css";
import HeroSection from "./Hero";
import AboutUsSection from "./About";
import RoomsSection from "./Rooms";
import AmenitiesSection from "./Amenities";
import GallerySection from "./Gellery";
import TestimonialsSection from "./Testimonials";
import SubmitTestimonialForm from "./SubmitTesimonial";

const HomeMain = () => {
  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <RoomsSection />
      <AmenitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <SubmitTestimonialForm />
    </div>
  );
};

export default HomeMain;
