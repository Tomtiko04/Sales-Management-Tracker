import { useQuery } from "@tanstack/react-query";
import { getAllSales as getAllSalesApi } from "../../services/apiSales";
export default function useGetAllSales() {
	const {
		isPending,
		error,
		data: salesData,
	} = useQuery({
		queryKey: ["get-sales"],
		queryFn: getAllSalesApi,
	});

	if (error) throw new Error(error.message);
	return { salesData, isPending };
}
