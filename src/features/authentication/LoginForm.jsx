import { useState } from "react";
import useLogin from "./useLogin";
import useRestPassword from "./useResetPassword";

export default function LoginForm() {
	const { isLogin, isLogging } = useLogin();
	const {resetPassword, isReseting} = useRestPassword();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log("Attempting to login with:", { email, password });
		isLogin({ email, password }, {
			onSettled: () => {
				setEmail("");
				setPassword("");
			}
		});
	}

	function handleResetPassword(e) {
		e.preventDefault();
		const emailValue = window.prompt("Enter your email:");
		if (emailValue) {
			console.log("Sending reset password email to:", emailValue);
			resetPassword(emailValue);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<br />
				<label>Password:</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<br />
				<div>
					<p>Forgotten password:</p>
					<button onClick={handleResetPassword} disabled={isReseting}>
						Reset
					</button>
				</div>
				<button type="submit" disabled={isLogging}>
					Login
				</button>
			</form>
		</div>
	);
}