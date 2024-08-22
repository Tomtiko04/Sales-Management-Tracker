import { addSales as addSalesApi } from "../../services/apiSales";
import { useMutation } from "@tanstack/react-query";

export default function useAddSales() {
	const { mutate: addSales, isPending: isAdding } = useMutation({
		mutationFn: ({
			user_id,
			product_type,
			quantity,
			customer_name,
			customer_address,
			phone_number,
			additional_info,
			date,
		}) =>
			addSalesApi({
				user_id,
				product_type,
				quantity,
				customer_name,
				customer_address,
				phone_number,
				additional_info,
				date,
			}),
		onSuccess: (data) => {
			console.log(data);
			//TODO a toast effect
		},
		onError: (err) => {
			console.log(err.message);
		},
		retry: false,
	});

	return { addSales, isAdding };
}
