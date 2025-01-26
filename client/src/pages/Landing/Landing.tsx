import { CarSvg } from '@/components/ui';
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen bg-[#4a6856] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
        
        {/* Left Side - Placeholder for Cat */}
        <div className="relative">
          <div className="w-[300px] h-20 absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-[#d5d5d5] rounded-full opacity-50"></div>
          <CarSvg/>
        </div>

        {/* Right Side - Text & Button */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-right">PEBBLES</h1>
          <p className="mt-3 text-lg md:text-xl font-medium max-w-md text-right">
            The financial tracker that helps you build your savings, 
            <span className="font-bold"> pebble by pebble.</span>
          </p>

          {/* Sign-In Button */}
          <div className="flex justify-end">
            <button className="w-[200px] bg-gray-700 text-white px-4 py-2 rounded-xl mt-5">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;