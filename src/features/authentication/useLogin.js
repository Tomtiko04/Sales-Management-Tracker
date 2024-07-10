import { useMutation } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/apiAuth";


export default function useLogin() {
  const { mutate: isLogin, isPending: isLogging } = useMutation({
		mutationFn: ({ email, password }) => signinApi({ email, password }),
		onSuccess: () => {
			console.log("User log in");
		},
		onError: (err) => {
			console.log(err.message);
		},
		retry: false,
	});

    return {isLogin, isLogging}
}
