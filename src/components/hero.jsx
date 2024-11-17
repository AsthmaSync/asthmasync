import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../assets/images/pexels-cottonbro-6202735.jpg';
import Image2 from '../assets/images/pexels-luci-23254259-6816451.jpg';
import Image3 from '../assets/images/pexels-gustavo-fring-6285303.jpg';

const images = [Image1, Image2, Image3]; 

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center relative transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      
      <div className="relative text-center text-white px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AsthmaSync</h1>
        <p className="text-lg md:text-2xl mb-8">
          Track, manage, and control your asthma symptoms with ease.
        </p>
        <Link to="/privacySettings">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
