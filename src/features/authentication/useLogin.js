import { useMutation } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/apiAuth";
import Cookies from "js-cookie";


export default function useLogin() {
  const { mutate: isLogin, isPending: isLogging } = useMutation({
		mutationFn: ({ email, password }) => signinApi({ email, password }),
		onSuccess: (data) => {
			console.log("User log in");
			console.log("User logged in:", data);
			//Use role status
			Cookies.set("role", data.user.user_metadata.role);
			// Authetication status
			Cookies.set("authentication", data.user.role);
		},
		onError: (err) => {
			console.log(err.message);
		},
		retry: false,
	});

    return {isLogin, isLogging}
}
