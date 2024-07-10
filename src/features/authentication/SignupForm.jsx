import {  useEffect, useState } from "react";
import { useSignup } from "./useSignup";
import useGoogle from "./useGoogle";
import useRoles from "../../context/useRoles";
import useSubDistributors from "../../context/useSubDistributors";

export default function SignupForm() {
	const { signup, isSignup } = useSignup();
	const { isLoginGoogle, isLogingGoogle } = useGoogle();
	const {roleData} = useRoles();
	const {subList} = useSubDistributors();


	const [name, setName] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [type, setTypes] = useState("");
	const [distributor, setDistributor] = useState("");
	const [avaliableRoles, setAvaliableRoles] = useState([]);
	const [avaliableSubDistributors, setAvaliableSubDistributors] = useState([]);
	const [distributorId, setDistributorId] = useState('KURU00');

	function handleSbmit(e) {
		e.preventDefault();
		signup({ name, contact, type, distributor, distributorId, userName, email, password });
	}

	function handleGoogle() {
		isLoginGoogle();
	}

	useEffect(function(){
		if(roleData){
			setAvaliableRoles(roleData)
		}
	}, [roleData])

	useEffect(
		function () {
			if (subList) {
				setAvaliableSubDistributors(subList);
			}
		},
		[subList]
	);

	return (
		<div>
			<form onSubmit={handleSbmit}>
				<label>Full Name:</label>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				<br />

				<label>User Name:</label>
				<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

				<br />
				<label>Email:</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

				<label>Phone Number:</label>
				<input type="number" value={contact} onChange={(e) => setContact(e.target.value)} />

				<br />
				<label>Password:</label>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

				<br />
				<label>Role:</label>
				<select value={type} onChange={(e) => setTypes(e.target.value)}>
					<option value="">Please choose an option</option>
					{avaliableRoles.map((roles) => (
						<option key={roles.id} value={roles.role}>
							{roles.name}
						</option>
					))}
				</select>

				<br />

				{type === "sub-distributor" && (
					<>
						<label>Associated Distributor ID:</label>
						<input
							type="text"
							value={distributorId}
							onChange={(e) => setDistributorId(e.target.value)}
						/>
					</>
				)}

				{type === "sales-rep" && (
					<>
						<label>Associated Sub-Distributor:</label>
						<select value={distributor} onChange={(e) => setDistributor(e.target.value)}>
							<option value="">Please choose an option</option>
							{avaliableSubDistributors.map((sublist)=> <option key={subList.id}>{sublist.name}</option>)}
						</select>
					</>
				)}

				<br />
				<button type="submit" disabled={isSignup}>
					Create
				</button>
			</form>
			<button onClick={handleGoogle} disabled={isLogingGoogle}>
				Google
			</button>
		</div>
	);
}
