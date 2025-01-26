
const Inventory = () => {
    return (
        <div className="h-full min-w-full bg-lightgreen flex items-center justify-center gap-7">
       
     {/* Card 1 */}
     <div className="w-1/2 h-4/5 bg-white rounded-3xl ml-8 p-8">
        <div className="w-full h-4/5 bg-green rounded-[15px] p-4 text-white">
        <h1 className="text-3xl font-Poppins p-3">Pebbles</h1>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-1/2 h-4/5 bg-white rounded-3xl mr-8 p-8 items-center justify-center ">
        <div className="grid grid-rows-4 grid-cols-2 h-full w-full gap-4">
        {/* Box 1 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 2 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 3 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 4 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 5 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 6 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 7 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 8 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
      </div>
        
        </div></div>
       
    
      );
  };
  
export default Inventory;
  