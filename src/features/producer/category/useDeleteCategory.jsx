import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductCategory as deleteProductCategoryApi } from "../../../services/apiCategoryManagement";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
	const queryClient = useQueryClient();
	const {
		mutate: isDeleteCategoty,
		isPending: isDeletingCategory,
		error,
	} = useMutation({
		mutationFn: deleteProductCategoryApi,
		onSuccess: () => {
			toast.success("Category deleted");
			queryClient.invalidateQueries({
				queryKey: ["product-category"],
			});
		},
		onError: () => {
			toast.error("Error deleting category");
		},
	});
	if (error) throw new Error(error.message);

	return { isDeleteCategoty, isDeletingCategory };
}
