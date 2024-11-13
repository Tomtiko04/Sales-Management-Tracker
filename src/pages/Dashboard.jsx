import Login from "./Login";
import useAuthUser from "../hook/useAuthUser";
import AdminDashboard from "../features/dashboard/AdminDashboard";
import ProducerDashboard from "../features/dashboard/ProducerDashboard";
import DistributorDashboard from "../features/dashboard/DistributorDashboard";
import SubDistributorDashboard from "../features/dashboard/SubDistributorDashboard";
import SalesRepDashboard from "../features/dashboard/SalesRepDashboard";

export default function Dashboard() {
	const { authUser } = useAuthUser();
	const isAuthenticated = authUser?.aud === "authenticated" ? true : false;
	const role = authUser?.user_metadata?.role;

	console.log("isAuthenticated:", isAuthenticated)
	console.log("dashboard:", role);

	return (
		<>
			{isAuthenticated ? (
				<div>
					{role === "admin" && <AdminDashboard />}
					{role === "producer" && <ProducerDashboard />}
					{role === "distributor" && <DistributorDashboard />}
					{role === "sub-distributor" && <SubDistributorDashboard />}
					{role === "sales-rep" && <SalesRepDashboard />}
				</div>
			) : (
				<Login />
			)}
		</>
	);
}
