import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductCategory as addProductCategoryApi } from "../../../services/apiCategoryManagement";
import toast from "react-hot-toast";

export default function useAddProductCategory() {
	const queryClient = useQueryClient();
	const { mutate: addCategory, isPending: isAddingCategory } = useMutation({
		mutationKey: ["add-product-category"],
		mutationFn: addProductCategoryApi,
		onSuccess: () => {
			toast.success("Category created successfully");
			queryClient.invalidateQueries({
				queryKey: ["product-category"],
			});
			console.log("Invalidating queries...");
			console.log(queryClient.getQueryCache());
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { addCategory, isAddingCategory };
}