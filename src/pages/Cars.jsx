import React from "react";
import CarCard from "../components/CarCard";
import { useLoaderData } from "react-router-dom";
import Footer from "../components/Footer";

const Cars = () => {
  const data = useLoaderData(); // get data from loader
  console.log(data); // should show an array of car objects

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {data && data.length > 0 ? (
          data.map((car) => <CarCard key={car._id} car={car} />)
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
