import { useQuery } from "@tanstack/react-query";
import { getStocks as getStocksApi } from "../../../services/apiStockMovements";

export default function useGetStocks() {
	const { data:isStocks, isPending:isGetStocks, error } = useQuery({
		queryKey: ["get-stocks"],
		queryFn: getStocksApi,
	});

    if(error) throw new Error("Something went wrong")

    return {isStocks, isGetStocks}
}