import React from 'react';

const AboutUsSection = () => (
  <section className="py-16 bg-gray-50 text-gray-800">
    <div className="container mx-auto px-8 lg:flex lg:items-center lg:justify-between">
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold mb-4">About [Hotel Name]</h2>
        <p className="text-lg mb-6">
          Experience unmatched luxury and comfort at [Hotel Name]. From the moment you step through our doors, you'll be immersed in elegance and refinement.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition duration-300">
          Learn More
        </button>
      </div>
      <div className="lg:w-1/2 lg:flex lg:justify-center mt-10 lg:mt-0">
        <img src="about-image.jpg" alt="About Hotel" className="rounded-lg shadow-lg transform hover:scale-105 transition duration-500" />
      </div>
    </div>
  </section>
);

export default AboutUsSection;
