import { useMutation } from "@tanstack/react-query";
import { signin as signinApi } from "../../services/apiAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
	const navigate = useNavigate();
	const { mutate: isLogin, isPending: isLogging } = useMutation({
		mutationFn: ({ email, password }) => signinApi({ email, password }),
		onSuccess: (data) => {
			toast.success("User login");
			//Use role status
			Cookies.set("role", data.user.user_metadata.role);
			// Authetication status
			Cookies.set("authentication", data.user.role);
			// User ID
			Cookies.set("userId", data.user.id);
			// Sub ID
			Cookies.set("distributorId", data.user.user_metadata.distributorId);
			navigate("/dashboard");
		},
		onError: (err) => {
			toast.error(err.message);
		},
		retry: false,
	});

	return { isLogin, isLogging };
}
