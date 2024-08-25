import { useEffect, useState } from "react";
import useAuthUser from "../../hook/useAuthUser";
import useSalesBySub from "./useSalesBySub";
import SubTabel from "../../ui/SubTabel";

export default function SalesMade() {
	const { authUser } = useAuthUser();
	const { isSales } = useSalesBySub();
	const [salesData, setSalesData] = useState([]);
	const sub_distributorId = authUser?.user_metadata?.distributorId;

	useEffect(
		function () {
			setSalesData(isSales);
		},
		[isSales]
	);

	return (
		<div>
			<p>{sub_distributorId}</p>
			<h1>Sub Table</h1>
			{salesData?.length > 0 && salesData?.map((sale, index) => <SubTabel sale={sale} key={sale.id} index={index + 1}/>)}
			{salesData?.length == 0 && <div>Record Empty</div>}
		</div>
	);
}
