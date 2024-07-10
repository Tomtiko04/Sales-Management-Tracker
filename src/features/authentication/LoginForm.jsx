import { useState } from "react";
import useLogin from "./useLogin";
import useResetPassword from "./useResetPassword";

export default function LoginForm() {
	const { isLogin, isLogging } = useLogin();
	const { resetPassword, isReseting } = useResetPassword();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	function handleSbmit(e) {
		e.preventDefault();
		alert("submit");
		isLogin({ email, password });
	}

	function handleResetPassword(e) {
		e.preventDefault();
		const emailvalue = window.prompt("Enter your email:");
		if (emailvalue) {
			resetPassword(emailvalue);
		}
	}

	return (
		<div>
			<form onSubmit={handleSbmit}>
				<label>Email:</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<br />
				<label>Password:</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<br />
				{/* //TODO add a modal pop-up */}
				<div>
					<p>Forgotten password:</p>
					<button onClick={handleResetPassword} disabled={isReseting}>
						reset
					</button>
				</div>
				<button type="submit" disabled={isLogging}>
					login
				</button>
			</form>
			{/* <button onClick={handleGoogle}>Google</button> */}
		</div>
	);
}