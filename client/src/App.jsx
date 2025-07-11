import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProductedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/owner/OwnerDashBoard";
import AddCar from "./pages/owner/Addcar";
import Bookings from "./pages/owner/Bookings";
import OwnerProtectedRoute from "./components/OwnerProtectedRoute";

function App() {
  const location = useLocation(); // Gives access to current URL path
  const token = localStorage.getItem("token"); // Check if user is logged in
  const role = localStorage.getItem("role"); // Get user role (e.g., owner or user)

  // Check if current page is login or signup
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  // Check if current path starts with /owner (for Owner Dashboard)
  const isOwnerPath = location.pathname.startsWith("/owner");

  console.log(role);

  // If user is logged in and tries to access login/signup, redirect to home
  if (token && isAuthPage) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      {/* Hide Navbar/Footer on Owner Pages or Auth Pages */}

      {!isOwnerPath && !isAuthPage && <Navbar />}

      <Routes>
        {/* Redirect base URL to signup */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* User Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car-details/:id"
          element={
            <ProtectedRoute>
              <CarDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <Cars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Owner Protected Routes */}
        <Route
          path="/owner"
          element={
            <OwnerProtectedRoute>
              <OwnerDashboard />
            </OwnerProtectedRoute>
          }
        />

        <Route
          path="/owner/add-car"
          element={
            <OwnerProtectedRoute>
              <AddCar />
            </OwnerProtectedRoute>
          }
        />

        <Route
          path="/owner/bookings"
          element={
            <OwnerProtectedRoute>
              <Bookings />
            </OwnerProtectedRoute>
          }
        />
      </Routes>

      {/* Hide Footer on Owner or Auth Pages */}
      {!isOwnerPath && !isAuthPage && <Footer />}
    </>
  );
}

export default App;
