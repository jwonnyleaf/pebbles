import React from 'react';
import spinnerGif from '@/assets/spinner.gif';

const Spinner = () => {
  return (
    <div className="w-full h-full fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
      <img
        src={spinnerGif}
        alt="Loading..."
        style={{ width: '400px', height: '400x' }}
      />
    </div>
  );
};

export default Spinner;
