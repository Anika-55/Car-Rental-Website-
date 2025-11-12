// Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </div>
  );
};

export default Loader;
