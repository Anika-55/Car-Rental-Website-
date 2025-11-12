import React from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://i.ibb.co.com/fdW8nrqm/justus-menke-K7-Sr4-YDt-L2-U-unsplash.jpg')",
              }}
            >
              <div className="h-full w-full bg-black/50 flex flex-col justify-center items-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Drive Your <span className="text-primary">Dream Car</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl opacity-90">
                  Choose from luxury sedans, SUVs, and sports cars at affordable
                  prices.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://i.ibb.co.com/TBzGd88X/kahl-orr-Zd-LFPE0-AZBU-unsplash.jpg')",
              }}
            >
              <div className="h-full w-full bg-black/50 flex flex-col justify-center items-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Reliable & Fast <span className="text-primary">Booking</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl opacity-90">
                  Experience secure online booking with instant confirmation.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 with Typewriter Effect */}
          <SwiperSlide>
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://i.ibb.co.com/jkM63J9d/reinhart-julian-Vs-XHz-Sdwuik-unsplash.jpg')",
              }}
            >
              <div className="h-full w-full bg-black/50 flex flex-col justify-center items-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <span className="text-primary">We Help You</span>{" "}
                  <Typewriter
                    words={[
                      "Rent Cars Easily",
                      "Drive in Style",
                      "Explore Without Limits",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </h1>
                <p className="max-w-2xl text-lg md:text-xl opacity-90">
                  Your journey begins here — comfort, safety, and style in one
                  ride.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Hero;
