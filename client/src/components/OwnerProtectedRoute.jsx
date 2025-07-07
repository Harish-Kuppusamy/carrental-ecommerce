import { Navigate } from "react-router-dom";

/**
 * Protects routes that only 'owner' role users can access.
 * Redirects to login if not authenticated or wrong role.
 */
const OwnerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  const role = localStorage.getItem("role"); // Check the user role

  // If no token or role is not 'owner', block access and send to login
  if (!token || role !== "owner") {
    return <Navigate to="/login" />;
  }

  // Allow access to child components if authenticated as owner
  return children;
};

export default OwnerProtectedRoute;
