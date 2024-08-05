import { useMutation } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";

export default function useSetNewPassword() {
	const { mutate: updatePassword, isPending: isUpdating } = useMutation({
		mutationFn: ({ email, newPassword }) => updateUserPasswordApi({ email, newPassword }),
		onSuccess: () => {
			console.log("Password changed");
		},
		onError: (err) => {
			console.error("Error changing password:", err.message);
		},
	});

	return { updatePassword, isUpdating };
	// const navigate = useNavigate()
	// const {
	// 	mutate: updatePassword,
	// 	isPending: isUpdating,
	// 	error,
	// } = useMutation({
	// 	mutationFn: ({ newPassword, token }) => updateUserPasswordApi({ newPassword, token }),
	// 	onSuccess: (data) => {
	// 		console.log("Password reset successful");
    //         console.log(data);
	// 		// navigate("/auth/login")
	// 	},
	// 	onError: () => {
	// 		if (error) throw new Error(error.message);
	// 		console.log("password reset failed");
	// 	},
	// });
	// return { updatePassword, isUpdating };
}
