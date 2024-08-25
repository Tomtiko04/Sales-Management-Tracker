import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useRestPassword() {
	const navigate = useNavigate();
	const { mutate: resetPassword, isLoading: isReseting } = useMutation({
		mutationFn: resetPasswordApi,
		onSuccess: () => {
			console.log("Password reset email sent");
			navigate("/auth.login")
		},
		onError: (error) => {
			console.error("Error in sending password reset email", error);
		},
	});

	return { resetPassword, isReseting };
}
