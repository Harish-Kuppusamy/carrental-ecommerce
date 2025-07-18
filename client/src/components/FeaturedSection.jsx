import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../context/SearchContext";

/**
 * FeaturedSection displays highlighted premium vehicles with navigation to full list
 */
const FeaturedSection = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { search, setSearch } = useSearch();

  useEffect(() => {
    // Fetch cars from backend when component mounts
    axios
      .get(`${BASE_URL}/api/cars`)
      .then((res) => {
        console.log(res.data); 
        setCars(res.data); 
      })
      .catch((err) => {
        console.log(err.message); 
      });
  }, []);

  const searchTerm = search.toLowerCase();
  const filteredItems = cars.filter((car) => (
    car.brand.toLowerCase().includes(searchTerm)
  ));

  const limitedItems = filteredItems.slice(0, 6);



  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32" id="featured">
      {/* Section Title */}
      <div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore Our Selection Of Premium Vehicles Available For Your Next Adventure."
        />
      </div>

      {/* Grid displaying max 9 featured cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {filteredItems.length === 0 ? <p>No Items Matched Your Search</p> :
       
       (limitedItems.map((car) => (
        <div key={car._id}>
          <CarCard car={car} />
        </div>
      )))
          
       
       }
      </div>

      {/* Explore All Cars Button */}
      <button
        className="flex items-center justify-center gap-2 px-6 py-2 border border-bordercolor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
        onClick={() => {
          navigate("/cars"); // Go to full car listing
          scrollTo(0, 0); // Scroll to top after navigation
        }}
      >
        Explore All Cars
        <img src={assets.arrow_icon} alt="Arrow Icon" />
      </button>
    </div>
  );
};

export default FeaturedSection;
