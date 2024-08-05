import { useEffect, useState } from "react";
import useSetNewPassword from "./useSetNewPassword";
import { useLocation } from "react-router-dom";

export default function ResetPasswordForm() {
	const { updatePassword, isUpdating } = useSetNewPassword();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [token, setToken] = useState("");
	const [email, setEmail] = useState("");
	const location = useLocation();

	const token = new URLSearchParams(location.search).get("token");

	// useEffect(() => {
	// 	const hash = window.location.hash.substring(1);
	// 	const params = new URLSearchParams(hash);
	// 	const token = params.get("access_token");
	// 	if (token) {
	// 		setToken(token);
	// 	} else {
	// 		alert("Token is missing or invalid");
	// 	}
	// }, []);

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	if (newPassword !== confirmPassword) {
	// 		alert("Passwords do not match");
	// 		return;
	// 	}
	// 	updatePassword({newPassword, token});
	// }

	useEffect(() => {
		if (!token) {
			alert("Token is missing or invalid");
			return;
		}
		// Decode token to extract email if necessary, or get it from the URL or state
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		console.log(decodedToken);
		setEmail(decodedToken.email);
	}, [token]);

	function handleSubmit(e) {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			console.log("Password does not match");
			return;
		}
		updatePassword({ email, newPassword });
	}


	return (
		<form onSubmit={handleSubmit}>
			<label>New Password</label>
			<input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
			<br />
			<br />
			<label>Confirm Password</label>
			<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<br />
			<button type="submit" disabled={isUpdating}>
				Submit
			</button>
		</form>
	);
}
