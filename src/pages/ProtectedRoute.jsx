import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const isAuthenticated = Cookies.get("authentication") === "authenticated";
	useEffect(
		function () {
			if(!isAuthenticated) {
				navigate("/auth/login");
                alert("Can't access this page")
			}
		},
		[isAuthenticated, navigate, children]
	);
	return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
	children: PropTypes.any,
};
