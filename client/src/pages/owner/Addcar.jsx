import { useState } from "react";
import axios from "axios";

/**
 * Owner's AddCar page to add new cars to the platform
 */
const AddCar = () => {
  // Form state to hold car details
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    image: "",
    year: "",
    category: "",
    seating_capacity: "",
    fuel_type: "",
    transmission: "",
    pricePerDay: "",
    location: "",
    description: "",
  });

  const ownerId = localStorage.getItem("userId"); // Owner's ID fetched from localStorage

  // Update form state as user types
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Send POST request to backend with car details + owner ID
      await axios.post("http://localhost:8080/api/cars", {
        ...carData,
        owner: ownerId,
      });
      alert("Car Added Successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding car");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Add New Car</h1>

      {/* Render input fields dynamically based on keys in carData */}
      {Object.keys(carData).map((key) => (
        <input
          key={key}
          type="text"
          placeholder={key}
          name={key}
          value={carData[key]}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      ))}

      {/* Submit Button */}
      <button className="bg-primary text-white px-4 py-2 rounded">
        Add Car
      </button>
    </form>
  );
};

export default AddCar;
