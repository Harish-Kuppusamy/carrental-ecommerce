import { Navigate } from "react-router-dom";

/**
 * Protects routes that require user to be logged in.
 * Redirects to login page if user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage to check login status

  // If no token exists, user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow user to access the protected route
  return children;
};

export default ProtectedRoute;
