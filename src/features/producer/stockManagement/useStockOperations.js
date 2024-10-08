import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStock as addStockApi } from "../../../services/apiStockMovements";
import toast from "react-hot-toast";

export default function useStockOperations() {
	const queryClient = useQueryClient();
	const {
		mutate: isAddStock,
		isPending: isAddingStock,
		error,
	} = useMutation({
		mutationKey: ["add-stock"],
		mutationFn: addStockApi,
		onSuccess: () => {
			toast.success("Stock added sucessfully");
			queryClient.invalidateQueries({
				queryKey: ["stock"],
			});
		},
		onError: () => {
			toast.error("Failed, stock could not be added");
		},
	});
	if (error) throw new Error("Something went wrong");
	return { isAddStock, isAddingStock };
}
