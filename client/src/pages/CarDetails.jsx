import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import Loader from "../components/Loader";

/**
 * CarDetails page - shows detailed information for a selected car and booking form
 */
const CarDetails = () => {
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate();

  const [car, setCar] = useState(null); // Store car details
  const [pickupDate, setPickupDate] = useState(""); // User-selected pickup date
  const [returnDate, setReturnDate] = useState(""); // User-selected return date
  const userid = localStorage.getItem("userId"); // Logged-in user ID from localStorage

  const currency = import.meta.env.VITE_CURRENCY; // Currency symbol from .env

  /**
   * Handle Booking Form Submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBooking = {
        car: car._id,
        user: userid,
        owner: car.owner,
        pickupDate,
        returnDate,
        status: "pending",
        price: car.pricePerDay,
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        "http://localhost:8080/api/bookings",
        newBooking
      );
      console.log(res.data);
      alert("Booking Successful!");
      navigate("/my-bookings"); // Redirect to bookings page
    } catch (err) {
      console.error(err);
      alert("Booking Failed");
    }
  };

  /**
   * Fetch car details from API when page loads or when ID changes
   */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cars")
      .then((res) => {
        const cardata = res.data;
        setCar(cardata.find((c) => c._id === id)); // Find car matching the ID
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // Show loader while car details are not yet fetched
  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="Back Arrow"
          className="rotate-180 opacity-65"
        />
        Back To All Cars
      </button>

      {/* Car Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Car Image and Specifications */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-bordercolor my-6" />

            {/* Specifications Grid */}
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
                  <img src={icon} alt="Icon" className="h-5 mb-2" />
                  {text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Features List */}
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                  "Luxury Vibe",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img
                      src={assets.check_icon}
                      alt="Check Icon"
                      className="h-4 mr-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {car.pricePerDay}
            <span className="text-base text-gray-400 font-normal">Per Day</span>
          </p>

          <hr className="border-bordercolor my-6" />

          {/* Pickup Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              className="border border-bordercolor px-3 py-2 rounded-lg"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              className="border border-bordercolor px-3 py-2 rounded-lg"
              id="return-date"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Book Now Button */}
          <button className="w-full bg-primary hover:bg-primary-dull transition-all cursor-pointer py-3 font-medium text-white rounded-xl">
            Book Now
          </button>

          <p className="text-center text-sm">
            No Credit Card Required To Reserve
          </p>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
