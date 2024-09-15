import useAuthUser from "../hook/useAuthUser";
import ProducerSignupForm from "../features/producer/ProducerSignupForm";
import DistributorSignupForm from "../features/distributor/DistributorSignupForm";
import SubDistributorSignupForm from "../features/sub-distributor/SubDistributorSignupForm";
import SalesRepSignupForm from "../features/sales-rep/SalesRepSignupForm";
import Login from "../pages/Login"

export default function Signup() {
	const { authUser } = useAuthUser();
	const isAuthenticated = authUser?.aud;
	const role = authUser?.user_metadata?.role;
	return (
		<>
			{isAuthenticated ? (
				<div>
					{role === "admin" && <ProducerSignupForm />}
					{role === "producer" && <DistributorSignupForm />}
					{role === "distributor" && <SubDistributorSignupForm />}
					{role === "sub-distributor" && <SalesRepSignupForm />}
				</div>
			) : (
				<Login />
			)}
		</>
	);
}
