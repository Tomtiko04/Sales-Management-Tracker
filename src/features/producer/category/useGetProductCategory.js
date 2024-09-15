import { useQuery } from "@tanstack/react-query";
import { getProductCategory as getProductCategoryApi } from "../../../services/apiCategoryManagement";

export default function useGetProductCategory() {
	const {
		data: getCategories,
		isPending: isGettingCategories,
		error,
	} = useQuery({
		queryKey: ["product-category"],
		queryFn: getProductCategoryApi,
	});

	if (error) throw new Error(error.message);
	return { getCategories, isGettingCategories };
}
