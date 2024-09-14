import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hook/useAuthUser";

export default function AdminProtectedRoute({ children, allowedRoles }) {
	const navigate = useNavigate();
	const { authUser } = useAuthUser();
	const isAuthenticated = !!authUser?.aud;
	const role = authUser?.user_metadata?.role;

	useEffect(() => {
		if (!isAuthenticated || !allowedRoles.includes(role)) {
			navigate("/auth/login", { replace: true });
			// alert("You don't have permission to access this page");
		}
	}, [isAuthenticated, role, allowedRoles, navigate]);

	return isAuthenticated && allowedRoles.includes(role) ? children : null;
}

AdminProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
