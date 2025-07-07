import { useNavigate } from "react-router-dom";

/**
 * OwnerDashboard page - Displays quick access buttons for Owners to manage cars and bookings
 */
const OwnerDashboard = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Owner Dashboard
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {/* Add Car Button - Navigate to Add Car Page */}
          <button
            onClick={() => navigate("/owner/add-car")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            🚗 Add Car
          </button>

          {/* Manage Bookings Button - Navigate to Bookings Page */}
          <button
            onClick={() => navigate("/owner/bookings")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            📋 Manage Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
