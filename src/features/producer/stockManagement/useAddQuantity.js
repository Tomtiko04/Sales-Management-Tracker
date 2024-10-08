import { useMutation } from "@tanstack/react-query";
import { editProductQuantity as editProductQuantityApi } from "../../../services/apiProductCatalog";
import toast from "react-hot-toast";

export default function useAddQuantity() {
	const {
		mutate: isAddQuantity,
		isPending: isAddingQuantity,
		error,
	} = useMutation({
		mutationFn: (editData) => editProductQuantityApi(editData),
		onSuccess: (data) => {
			console.log("Quantity updated successfully:", data);
		},
		onError: () => {
			toast.error("Could not update the product quantity.");
		},
	});

	if (error) throw new Error(error.message);

	return { isAddQuantity, isAddingQuantity };
}
