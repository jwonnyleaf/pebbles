
const Inventory = () => {
    return (
        <div className="h-full min-w-full bg-lightgreen flex items-center justify-center gap-7">
       
     {/* Card 1 */}
     <div className="w-1/2 h-4/5 bg-white rounded-3xl ml-8 p-8">
        <div className="w-full h-4/5 bg-green rounded-[15px] p-4 text-white">
        <h1 className="text-3xl font-bubbly p-3">Pebbles</h1>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-1/2 h-4/5 bg-white rounded-3xl mr-8 p-8">
        <h1 className="text-2xl font-bubbly mb-4">Card 2</h1>
      </div>
    </div>
      );
  };
  
export default Inventory;
  