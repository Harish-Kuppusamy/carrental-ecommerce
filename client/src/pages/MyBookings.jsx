import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import axios from "axios";
import Loader from "../components/Loader";

/**
 * MyBookings - Displays and manages user's car bookings with Razorpay Payment Integration
 */
const MyBookings = () => {
  const [bookings, setBookings] = useState([]); // Stores user's bookings
  const [loading, setLoading] = useState(true); // Loading state

  const currency = import.meta.env.VITE_CURRENCY;
  const userId = localStorage.getItem("userId");
  const BASE_URL = import.meta.env.VITE_API_URL;

  /**
   * Fetch all bookings and filter for current user
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/bookings`)
      .then((res) => {
        const allBookings = res.data;
        const myBookings = allBookings.filter(
          (booking) => booking.user === userId
        );
        setBookings(myBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  /**
   * Load Razorpay script for payment gateway
   */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  /**
   * Handle Buy Now payment for a booking
   */
  const handleBuyNow = async (booking) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/payment/create-order`,
        { amount: booking.price }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "Car Rental",
        description: "Booking Payment",
        order_id: res.data.id,
        handler: function (response) {
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          

          axios.put(`${BASE_URL}/api/bookings/${booking._id}/update-status`, {
            status: "paid",
          });

          // Update booking status locally
          setBookings((prev) =>
            prev.map((b) =>
              b._id === booking._id ? { ...b, status: "paid" } : b
            )
          );
console.log(bookings)

        },
        prefill: {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  /**
   * Handle Booking Cancellation
   */
  const handleCancel = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmDelete) return;

      await axios.delete(`${BASE_URL}/api/bookings/${id}`);
      alert("Booking Cancelled");

      // Remove cancelled booking from UI
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title="My Bookings"
        subTitle="View And Manage Your Car Bookings"
        align="left"
      />

      {loading ? (
        <Loader />
      ) : (
        <div>
          {bookings.map((booking, idx) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 border border-bordercolor rounded-lg mt-5 first:mt-12 shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
            >
              {/* Car Image and Info */}
              <div className="md:col-span-2">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <p className="text-lg font-medium mt-2">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-gray-500">
                  {booking.car.year} • {booking.car.category} •{" "}
                  {booking.car.location}
                </p>
              </div>

              {/* Booking Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-light rounded">
                    Booking #{idx + 1}
                  </p>
                  <p
                    className={`px-3 py-1 text-xs rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-400/15 text-green-600"
                        : "bg-red-400/15 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>

                {/* Rental Period */}
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p>Rental period</p>
                    <p>
                      {booking.pickupDate.split("T")[0]} To{" "}
                      {booking.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="flex items-start gap-2 mt-3">
                  <img
                    src={assets.location_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p>Pickup Location</p>
                    <p>{booking.car.location}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-start gap-2 mt-2">
                  {booking.status === "confirmed" && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2 cursor-pointer"
                        onClick={() => handleBuyNow(booking)}
                      >
                        Buy Now
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded mt-2 cursor-pointer"
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel Order
                      </button>
                    </>
                  )}

                  {booking.status === "paid" && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mt-2 cursor-default opacity-50"
                      disabled
                    >
                      Booked
                    </button>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6 text-right">
                <div className="text-sm text-gray-500">
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {currency}
                    {booking.price}
                  </h1>
                  <p>Booked on {booking.createdAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
