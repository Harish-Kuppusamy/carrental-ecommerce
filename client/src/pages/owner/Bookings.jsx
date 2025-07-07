import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Owner-side Booking management page
 * Displays all bookings and allows owner to confirm them
 */
const Bookings = () => {
  const [bookings, setBookings] = useState([]); // Store all bookings fetched from backend

  // Function to fetch all bookings from server
  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:8080/api/bookings");
    console.log(res.data); // Debug: Check API response
    setBookings(res.data); // Save bookings to state
  };

  // Fetch bookings only on first page load
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to update booking status
  const handleStatusUpdate = async (id, status) => {
    try {
      // Send PUT request to update status in backend
      await axios.put(`http://localhost:8080/api/bookings/${id}`, { status });
      fetchBookings(); // Refresh bookings after status change
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Bookings</h1>

      {/* Loop through all bookings */}
      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded mb-4">
          {/* Car Details */}
          <p>
            <b>Car:</b> {b.car.brand} {b.car.model}
          </p>

          {/* Booking ID */}
          <p>
            <b>Booking ID:</b> {b._id}
          </p>

          {/* User who booked */}
          <p>
            <b>User:</b> {b.user}
          </p>

          {/* Booking Status */}
          <p>
            <b>Status:</b> {b.status}
          </p>

          {/* Confirm Button only visible for pending bookings */}
          {b.status === "pending" && (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              onClick={() => handleStatusUpdate(b._id, "confirmed")}
            >
              Confirm Booking
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bookings;
