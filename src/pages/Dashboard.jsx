import AdminDashboard from "../features/dashboard/AdminDashboard";
import SalesRepDashboard from "../features/dashboard/SalesRepDashboard";
import SubDistributorDashboard from "../features/dashboard/SubDistributorDashboard";
import Cookies from "js-cookie";
import Login from "./Login";

export default function Dashboard() {
	const isAuthenticated = Cookies.get("authentication") === "authenticated";
	const role = Cookies.get("role");

	return (
		<>
			{isAuthenticated ? (
				<div>
					{role === "admin" && <AdminDashboard />}
					{role === "sub-distributor" && <SubDistributorDashboard />}
					{role === "sales-rep" && <SalesRepDashboard />}
				</div>
			) : (
				<Login />
			)}
		</>
	);
}
