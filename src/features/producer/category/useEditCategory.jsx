import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductCategory as editProductCategoryApi } from "../../../services/apiCategoryManagement";
import toast from "react-hot-toast";

export default function useEditCategory() {
	const queryClient = useQueryClient();
	const {
		mutate: isEditCategory,
		isPending: isEditingCategory,
		error,
	} = useMutation({
		mutationFn: editProductCategoryApi,
		onSuccess: () => {
			toast.success("Category Edited");
			queryClient.invalidateQueries({
				queryKey: ["product-category"],
			});
		},
		onError: () => {
			toast.error;
		},
	});

	if (error) throw new Error(error.message);

	return { isEditCategory, isEditingCategory };
}
