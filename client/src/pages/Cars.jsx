import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import axios from "axios";
import Loader from "../components/Loader";

/**
 * Cars page - Displays all available vehicles with search input
 */
const Cars = () => {
  const [input, setInput] = useState(""); // Search input state
  const [cars, setCars] = useState([]); // List of all cars
  const [loading, setLoading] = useState(true); // Loader state

  /**
   * Fetch all cars from API on component mount
   */
  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/api/cars")
      .then((res) => {
        console.log(res.data);
        setCars(res.data); // Store cars in state
        setLoading(false);
      })
      .catch((err) => {
        console.error(err); 
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Top Section - Page Title and Search */}
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse Our Selection Of Premium Vehicles Available For Your Next Adventure"
        />

        {/* Search Bar */}
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img
            src={assets.search_icon}
            alt="Search Icon"
            className="w-4.5 h-4.5 mr-2"
          />

          <input
            type="text"
            placeholder="Search by Make, Model or Features"
            className="w-full h-full text-gray-500 outline-none"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          <img
            src={assets.filter_icon}
            alt="Filter Icon"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </div>

      {/* Car Listing Section */}
      {loading ? (
        <Loader />
      ) : (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
          {/* Total Cars Count */}
          <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
            Showing {cars.length} Cars
          </p>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {cars.map((car, idx) => (
              <div key={idx}>
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
