import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function useRestPassword() {
	// const navigate = useNavigate();
	const { mutate: resetPassword, isLoading: isReseting } = useMutation({
		mutationFn: resetPasswordApi,
		onSuccess: () => {
			toast.success("Password reset: Check your email for reset link");
			// navigate("/auth.login")
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { resetPassword, isReseting };
}
