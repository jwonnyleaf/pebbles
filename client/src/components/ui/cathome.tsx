import React from "react";
// import { CarSvg } from "@/components/ui/carSvg";
import { CarSvg } from "@/components/ui/carSvg";



const CatHome = () => {
  return (
    <div className="flex h-screen w-screen bg-[#b7c6bc] p-2">
      {/* Main container with border */}
      <div className="w-4/5 max-w-[1150px] mx-auto flex-1 bg-[#f8d7da] flex flex-col items-center p-5 rounded-3xl border-4 border-[#375245] relative ml-10">
        
        {/* Top Section - Window */}
        <div className="w-4/5 h-[300px] bg-[#f8d7da] flex justify-center items-center relative">
          <div className="w-80 h-80 bg-[#79b1e9] border-4 border-[#375245] mt-10"></div>
        </div>

        {/* Cat SVG - Placed on top */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <CarSvg />
        </div>

        {/* Bottom Section - Floor */}
        <div className="w-full h-full bg-[#f4a9a3] rounded-b-3xl flex justify-center items-center mt-40"></div>
      </div>
    </div>
  );
};

export { CatHome };
