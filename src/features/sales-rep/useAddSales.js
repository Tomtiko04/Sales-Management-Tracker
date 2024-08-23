import { addSales as addSalesApi } from "../../services/apiSales";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddSales() {
	const queryClient = useQueryClient();
	const { mutate: addSales, isPending: isAdding } = useMutation({
		mutationFn: ({ ...salesToAdd }) => addSalesApi({...salesToAdd}),
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["get-sales"],
			});
			//TODO a toast effect
		},
		onError: (err) => {
			console.log(err.message);
		},
		retry: false,
	});

	return { addSales, isAdding };
}
