import React, { useState } from "react";
import CarCard from "../components/CarCard";
import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import Title from "../components/Title"; // assuming you have a Title component

const Cars = () => {
  const data = useLoaderData(); // get data from loader
  console.log(data); // should show an array of car objects

  const [input, setInput] = useState(""); // move useState to top level

  // filter cars based on search input
  const filteredCars = data.filter(
    (car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />

          <input
            onChange={(e) => setInput(e.target.value)} // changed from onClick to onChange
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />

          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredCars && filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No cars found.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
