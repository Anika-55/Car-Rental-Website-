import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Banner from "../components/Banner";
import CarCard from "../components/CarCard";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  const cars = useLoaderData(); // loader fetches all cars
  const navigate = useNavigate();

  // Show only 4 cars on home page
  const featuredCars = cars ? cars.slice(0, 4) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Banner />

      {/* Featured Cars */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Featured Cars</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {featuredCars.length > 0 ? (
            featuredCars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <p>No cars available</p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/cars")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore More
          </button>
        </div>
      </section>

      <Testimonial />
      <Newsletter />

      <main className="flex-grow">
        <Footer />
      </main>
    </div>
  );
};

export default Home;
