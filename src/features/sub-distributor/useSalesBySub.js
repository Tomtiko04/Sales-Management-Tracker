import { useQuery } from "@tanstack/react-query"
import { getSalesBySub as getSalesBySubApi } from "../../services/apiSales"

export default function useSalesBySub() {
    const {
			isPending,
			error,
			data: isSales
		} = useQuery({
			queryKey: ["get-distributor-sales"],
			queryFn: getSalesBySubApi,
		});
    if(error) throw new Error(error.message);
    console.log(isSales);
    return{isSales, isPending}
}
