import { useQuery } from "@tanstack/react-query";
import { getProductCategory as getProductCategoryApi } from "../../../services/apiCategoryManagement";

export default function useGetProductCategory(page = 1, pageSize = 10, searchTerm = "") {
	const startRange = (page - 1) * pageSize;
	const endRange = startRange + pageSize - 1;

	const {
		data,
		isLoading: isGettingCategories,
		error,
	} = useQuery({
		queryKey: ["product-category", page, pageSize, searchTerm],
		queryFn: () => getProductCategoryApi(startRange, endRange, searchTerm),
		keepPreviousData: true,
	});

	const getCategories = data?.categories || [];
	const totalCategories = data?.totalCount || 0;

	if (error) throw new Error(error.message);
	return { getCategories, totalCategories, isGettingCategories };
}
