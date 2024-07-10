import { useMutation } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../../services/apiAuth";

export default function useSetNewPassword() {
	const { mutate: updatePassword, isPending: isUpdating } = useMutation({
		mutationFn: updateUserPasswordApi,
		onSuccess: () => {
			console.log("Password changed");
			setTimeout(() => {
				history.push("auth/login"); // Redirect to login page after success
			}, 3000);
		},
		onError: () => {
			console.log("error in changing password");
		},
	});

	return { updatePassword, isUpdating };
}
