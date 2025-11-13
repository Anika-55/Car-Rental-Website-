import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`https://car-r-server.vercel.app/cars/${id}`);
        const data = await res.json();
        if (data.success) setCar(data.result);
        else setError("Car not found");
      } catch (err) {
        setError("Failed to fetch car details");
      }
    };
    fetchCar();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) return alert("Select dates");

    const bookingData = {
      carId: car._id,
      carBrand: car.brand,
      carModel: car.model,
      carImage: car.image,
      carYear: car.year,
      carCategory: car.category,
      carLocation: car.location,
      pricePerDay: car.pricePerDay,
      userName: user.name,
      userEmail: user.email,
      pickupDate,
      returnDate,
      status: "confirmed", // default status
      createdAt: new Date().toISOString(), // store booking date
    };

    try {
      const res = await fetch("https://car-r-server.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking successful!");
        navigate("/my-bookings");
      } else {
        toast.error("Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.warning("Something went wrong");
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleBooking}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">Per Day</span>
          </p>
          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              min={new Date().toISOString().split("T")[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
