import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsCollection = collection(db, "testimonials");
      const testimonialsSnapshot = await getDocs(testimonialsCollection);
      const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsList);
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Guests Say</h2>
        {testimonials.length > 0 ? (
          <Slider {...settings}
          className="overflow-hidden"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-8 bg-white rounded-lg shadow-lg ">
                {/* <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                /> */}
                <p className="text-lg italic mb-4">"{testimonial.review}"</p>
                <p className="font-semibold text-yellow-600">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.time.toDate().toLocaleDateString()}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No testimonials available yet.</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
