import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import ImgLoader from '../common/loader/ImgLoader';

const AboutUsSection = () => {
    const [bg, setBg] = useState(null);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchAboutImage = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'custom-pics'));
          const heroBg = snapshot.docs.map(doc => doc.data()); // Assuming `url` field contains the image link
          // if (heroBg.length > 0) {
            setBg(heroBg[0].about); // Set the first URL if it exists
            setLoading(false);
          // }
        } catch (error) {
          console.error('Error fetching about image:', error);
        }
      };
  
      fetchAboutImage();
    }, []);
    
 return ( 
  loading ? <ImgLoader/> :
 <section className="py-4 lg:py-16 bg-gray-50 text-gray-800 max-lg:mt-5">
    <div className="container mx-auto px-8 lg:flex lg:items-center lg:justify-between">
      <div className="lg:w-1/2">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">About <span> Magnum Hotel</span></h2>
        <p className="max-md:text-md max-md:text-balance text-lg mb-6">
          Experience unmatched luxury and comfort at The Magnum. From the moment you step through our doors, you'll be immersed in elegance and refinement.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition duration-300">
          Learn More
        </button>
      </div>
      <div className="lg:w-1/2 h-[40vh] lg:flex lg:justify-center mt-10 lg:mt-0">
        <img src={bg} alt="About Hotel" className="rounded-lg shadow-lg transform hover:scale-105 transition duration-500 w-full h-full object-cover object-center" />
      </div>
    </div>
  </section>
 );
};

export default AboutUsSection;
