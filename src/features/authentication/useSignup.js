import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
	const { mutate: signup, isPending: isSignup } = useMutation({
		mutationFn: (formData) => {
			return signupApi(formData); 
		},
		onSuccess: () => {
			console.log("Account created");
		},
		onError: (err) => {
			console.log(err.message);
		},
		retry: false,
	});

	return { signup, isSignup };
}

