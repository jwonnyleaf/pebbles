import { CarSvg } from '@/components/ui/carSvg';

const CatHome = () => {
  return (
    <div className="flex h-full w-full bg-[#b7c6bc]">
      {/* Main container with border */}
      <div className="w-full h-full mx-auto flex-1 bg-[#f8d7da] flex flex-col items-center justify-between">
        {/* Top Section - Window */}
        <div className="w-4/5 h-[300px] bg-[#f8d7da] flex justify-center items-center relative">
          <div className="w-80 h-80 bg-[#79b1e9] border-4 border-[#375245] mt-[20%]"></div>
        </div>

        <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-10">
          <CarSvg />
        </div>

        <div className="w-full h-[35%] bg-[#f4a9a3] flex bottom-0 items-end"></div>
      </div>
    </div>
  );
};

export { CatHome };
