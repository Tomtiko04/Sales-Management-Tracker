import useAuthUser from "../../hook/useAuthUser";
import SalesForm from "../sales-rep/SalesForm";
import SalesHistory from "../sales-rep/SalesHistory";

export default function SalesRepDashboard() {
	const { authUser } = useAuthUser();
	const userName = authUser?.user_metadata?.userName;
	return (
		<>
			<div>SalesRep Dashboard</div>
			<p>User Name: {userName}</p>
			<SalesForm />
			<hr />
			<SalesHistory />
		</>
	);
}
