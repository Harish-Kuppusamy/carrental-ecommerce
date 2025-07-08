import { useState } from "react";
import { assets, cityList } from "../assets/assets";
import Swal from "sweetalert2";
/**
 * Hero section with main heading and car search form
 */
const Hero = () => {
  // State to store selected pickup location
  const [pickupLocation, setPickupLocation] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Searching with", pickupLocation);
  Swal.fire({
    title: "Sorry!",
    text: `Currently, cars are not available for ${pickupLocation}.`,
    icon: "warning",
    confirmButtonText: "Okay",
  });
};


  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury Cars On Rent
      </h1>

      {/* Search Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          {/* Pickup Location Dropdown */}
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Display Selected Location Text */}
            <p className="text-sm text-gray-500 px-1">
              {pickupLocation ? pickupLocation : "Please Select Location"}
            </p>
          </div>

          {/* Pickup Date Input */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick-Up Date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>

          {/* Return Date Input */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              required
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
            <img
              src={assets.search_icon}
              alt="Search"
              className="brightness-300"
            />
            Search
          </button>
        </div>
      </form>

      {/* Hero Section Image */}
      <img src={assets.main_car} alt="Car" className="max-h-74" />
    </div>
  );
};

export default Hero;
