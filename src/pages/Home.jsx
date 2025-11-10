import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Banner from "../components/Banner";
import CarCard from "../components/CarCard";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Home = () => {
  const cars = useLoaderData();
  const navigate = useNavigate();

  const featuredCars = cars ? cars.slice(0, 4) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />

      {/* Featured Cars */}
      <section className="p-6 ">
        <div className="mt-15">
          <Title
            title="Featured Vehicles"
            subTitle="Explore our section of premium vehicles available for your next adventure."
          ></Title>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {featuredCars.length > 0 ? (
            featuredCars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <p>No cars available</p>
          )}
        </div>

        <div className="flex items-center">
          <button
            onClick={() => navigate("/cars")}
            className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-100 rounded-md mt-18 cursor-pointer"
          >
            Explore All Cars <img src={assets.arrow_icon} alt="" />
          </button>
        </div>
      </section>
      <div className="mt-15 mb-22">
        <Banner />
      </div>

      <Testimonial />
      <Newsletter />
    </div>
  );
};

export default Home;
