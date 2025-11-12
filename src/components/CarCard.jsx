import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "$";

  if (!car) return null;

  const isAvailable = car.isAvaliable;

  return (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 bg-white mt-12">
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability Badge */}
        {isAvailable ? (
          <p className="absolute top-4 left-4 bg-green-400/60 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        ) : (
          <p className="absolute top-4 left-4 bg-red-400/60 text-white text-xs px-2.5 py-1 rounded-full">
            Unavailable
          </p>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      {/* Car Info */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        {/* Car Specs */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm">
            <img src={assets.users_icon} alt="" className="h-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.fuel_icon} alt="" className="h-4 mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.car_icon} alt="" className="h-4 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.location_icon} alt="" className="h-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/car-details/${car._id}`)}
          className="mt-6 w-full py-2 bg-blue-500/90 text-white rounded-lg font-medium hover:bg-blue-700/90 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
