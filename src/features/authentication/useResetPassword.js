import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export default function useRestPassword() {
	const { mutate: resetPassword, isLoading: isReseting } = useMutation({
		mutationFn: resetPasswordApi,
		onSuccess: () => {
			console.log("Password reset email sent");
		},
		onError: (error) => {
			console.error("Error in sending password reset email", error);
		},
	});

	return { resetPassword, isReseting };
}
