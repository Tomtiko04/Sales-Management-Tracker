import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSale as deleteSaleApi } from "../../services/apiSales";

export default function useDeleteSale() {
	const queryClient = useQueryClient();
	const { mutate: deleteSale, isPending: isDeleting } = useMutation({
		mutationFn: deleteSaleApi,
		onSuccess: () => {
			console.log("sale deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["get-sales"],
			});
		},
		onError: () => {
			console.log("Something went wrong..., could not delete sale");
		},
	});

	return { deleteSale, isDeleting };
}
