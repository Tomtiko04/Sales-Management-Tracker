import {  useState } from "react";
import { useSignup } from "./useSignup";

export default function SignupForm() {
	const { signup, isSignup } = useSignup();
	const [name, setName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [type, setTypes] = useState("");
	const [distributor, setDistributor] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [distributorId, setDistributorId] = useState('KURU00');

	function handleSbmit(e) {
		e.preventDefault();
		signup({ name, contact, type, distributor, distributorId, userName, isAdmin, email, password }, {
			onSettled: () => {
				setName("");
				setUserName("");
				setPassword("");
				setEmail("");
				setContact("");
				setTypes("");
				setDistributor("");
				setIsAdmin(false);

			}
		});
	}

	return (
		<div>
			<form onSubmit={handleSbmit}>
				<label>Full Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					disabled={isSignup}
				/>
				<br />

				<label>User Name:</label>
				<input
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					disabled={isSignup}
				/>

				<br />
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isSignup}
				/>

				<label>Phone Number:</label>
				<input
					type="number"
					value={contact}
					onChange={(e) => setContact(e.target.value)}
					disabled={isSignup}
				/>

				<br />
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isSignup}
				/>

				<br />
				<label>Role:</label>
				<select value={type} onChange={(e) => setTypes(e.target.value)} disabled={isSignup}>
					<option value="">Please choose an option</option>
					<option value="sales-rep">Sales Representative</option>
					<option value="sub-distributor">Sub Distributor</option>
					<option value="admin">Admin</option>
				</select>

				<br />

				{type === "sub-distributor" && (
					<>
						<label>Associated Distributor ID:</label>
						<input
							type="text"
							value={distributorId}
							onChange={(e) => setDistributorId(e.target.value)}
							disabled={isSignup}
						/>
					</>
				)}

				{type === "sales-rep" && (
					<>
						<label>Associated Sub-Distributor:</label>
						<select
							value={distributor}
							onChange={(e) => setDistributor(e.target.value)}
							disabled={isSignup}>
							<option value="">Please choose an option</option>
							<option value="shade">Shade</option>
						</select>
					</>
				)}

				{type === "admin" && (
					<>
						<label>
							<input
								type="checkbox"
								value={isAdmin}
								onChange={() => setIsAdmin(!isAdmin)}
								disabled={isSignup}
							/>
							Admin
						</label>
					</>
				)}

				<br />

				<button type="submit" disabled={isSignup}>
					Create new User
				</button>
			</form>
		</div>
	);
}
