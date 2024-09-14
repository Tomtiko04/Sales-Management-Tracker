import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isPending: isSignup } = useMutation({
		mutationFn: (formData) => {
			return signupApi(formData);
		},
		onSuccess: () => {
			toast.success(
				"Account successfully created! Please verify the new account from the user's email address."
			);
		},
		onError: (err) => {
			toast.error(err.message);
		},
		retry: false,
	});

	return { signup, isSignup };
}
