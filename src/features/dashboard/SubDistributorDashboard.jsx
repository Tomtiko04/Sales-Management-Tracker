import useAuthUser from "../../hook/useAuthUser";
import SalesMade from "../sub-distributor/SalesMade";

export default function SubDistributorDashboard() {
	const { authUser } = useAuthUser();
	const userName = authUser?.user_metadata?.userName;
	const subId = authUser?.user_metadata?.distributorId;
	console.log(userName);
  return (
		<div>
			<h1>Sub-Distributor Dashboard</h1>
            <p>User Name: {userName}</p>
			<p>Sub Id: {subId}</p>
			<hr />
			<SalesMade />
		</div>
	);
}
