import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("authentication") === "authenticated";
  const isAdmin = Cookies.get("role") === "admin";

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/auth/login");
      alert("Can't access this page");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return isAuthenticated && isAdmin ? children : null;
}

AdminProtectedRoute.propTypes = {
  children: PropTypes.any,
};