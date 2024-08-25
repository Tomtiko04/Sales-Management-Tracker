import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSalesStatus as editSalesStatusApi } from "../../services/apiSales";

export default function useEditSaleStatus() {
	const queryClient = useQueryClient();
	const { mutate: editStatus, isLoading: isEditingStatus } = useMutation({
		mutationFn: ({ status, saleId }) => editSalesStatusApi(status, saleId),
		onSuccess: () => {
			console.log("Status edited successfully");
			queryClient.invalidateQueries({
				queryKey: ["get-distributor-sales"],
			});
		},
		onError: () => {
			console.log("Error editing status");
		},
	});
	return { editStatus, isEditingStatus };
}
