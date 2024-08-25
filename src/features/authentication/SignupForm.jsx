import { useState } from "react";
import { useSignup } from "./useSignup";

export default function SignupForm() {
	const { signup, isSignup } = useSignup();
	const [formData, setFormData] = useState({
		name: "",
		userName: "",
		password: "",
		email: "",
		contact: "",
		type: "",
		distributor: "",
		isAdmin: false,
		distributorId: "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData, {
			onSettled: () => {
				setFormData({
					name: "",
					userName: "",
					password: "",
					email: "",
					contact: "",
					type: "",
					distributor: "",
					isAdmin: false,
					distributorId: "",
				});
			},
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Full Name:</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					disabled={isSignup}
				/>
				<br />

				<label>User Name:</label>
				<input
					type="text"
					name="userName"
					value={formData.userName}
					onChange={handleChange}
					disabled={isSignup}
				/>
				<br />

				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					disabled={isSignup}
				/>
				<br />

				<label>Phone Number:</label>
				<input
					type="number"
					name="contact"
					value={formData.contact}
					onChange={handleChange}
					disabled={isSignup}
				/>
				<br />

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					disabled={isSignup}
				/>
				<br />

				<label>Role:</label>
				<select name="type" value={formData.type} onChange={handleChange} disabled={isSignup}>
					<option value="">Please choose an option</option>
					<option value="sales-rep">Sales Representative</option>
					<option value="sub-distributor">Sub Distributor</option>
					<option value="admin">Admin</option>
				</select>
				<br />

				{formData.type === "sub-distributor" && (
					<>
						<label>Associated Distributor ID:</label>
						<input
							type="text"
							name="distributorId"
							value={formData.distributorId}
							onChange={handleChange}
							disabled={isSignup}
						/>
					</>
				)}

				{formData.type === "sales-rep" && (
					<>
						<label>Associated Sub-Distributor:</label>
						<select
							name="distributor"
							value={formData.distributor}
							onChange={handleChange}
							disabled={isSignup}>
							<option value="" disabled>Please choose an option</option>
							<option value="Ogunneye Rasheedat">Ogunneye Rasheedat</option>
							<option value="Ogunneye Fatimah">Ogunneye Fatimah</option>
							<option value="Bada Modupe">Bada Modupe</option>
						</select>
						<br />
						<label>Distributor ID:</label>
						<select
							name="distributorId"
							value={formData.distributorId}
							onChange={handleChange}
							disabled={isSignup}>
							<option value="" disabled>Please choose an option</option>
							<option value="KUKU001">KUKU001</option>
							<option value="KUKU002">KUKU002</option>
							<option value="KUKU003">KUKU003</option>
						</select>
					</>
				)}

				{formData.type === "admin" && (
					<>
						<label>
							<input
								type="checkbox"
								name="isAdmin"
								checked={formData.isAdmin}
								onChange={handleChange}
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
