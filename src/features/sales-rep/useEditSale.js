import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSale as editSaleApi } from "../../services/apiSales";

export default function useEditSale() {
	const queryClient = useQueryClient();
	const { mutate: isEdit, isPending: isEditing } = useMutation({
		mutationKey: ["sale-edit"],
		mutationFn: ({
			product_type,
			quantity,
			customer_name,
			customer_address,
			phone_number,
			date,
			editId,
		}) => {
			editSaleApi({
				product_type,
				quantity,
				customer_name,
				customer_address,
				phone_number,
				date,
				editId,
			});
		},
		onSuccess: () => {
			console.log("Sale edited sucess");
			queryClient.invalidateQueries({
				queryKey: ["get-sales"],
			});
		},
		onError: (error) => {
			console.log(error);
			console.log(`Something went wrong ${error.message}`);
		},
	});
	return { isEdit, isEditing };
}
