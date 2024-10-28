import { useEffect, useState } from "react";
import useAddProductCategory from "./useAddProductCategory";
import useGetProductCategory from "./useGetProductCategory";
import useAuthUser from "../../../hook/useAuthUser";
import useDeleteCategory from "./useDeleteCategory";
import useEditCategory from "./useEditCategory";
import { Box } from "@mui/material";
import Empty from "../../../ui/Empty";
import InputFieldSave from "../../../ui/InputFieldSave";
import CategoryTable from "./CategoryTable";
import SearchBar from "./CategorySearch";
import Pagination from "../../../ui/Pagination";

const CategoryManagement = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	const { addCategory, isAddingCategory } = useAddProductCategory();
	const { getCategories, totalCategories, isGettingCategories } = useGetProductCategory(
		page + 1,
		rowsPerPage,
		searchTerm
	);
	const { isDeleteCategoty, isDeletingCategory } = useDeleteCategory();
	const { isEditCategory, isEditingCategory } = useEditCategory();
	const { authUser } = useAuthUser();
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);

	const userId = authUser?.id;
	const companyName = authUser?.user_metadata.company_name;

	useEffect(() => {
		if (getCategories) {
			setCategories(getCategories);
		}
	}, [getCategories]);

	function addProductCategory() {
		addCategory({
			categoryName,
			userId,
			companyName,
		});
		setCategoryName("");
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		addProductCategory();
	};

	function handleEdit(editId, categoryName) {
		isEditCategory({ editId, categoryName });
	}

	function handleDelete(categoryId) {
		isDeleteCategoty(categoryId);
	}

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSearch = () => {
		setPage(0);
	};

	return (
		<Box sx={{ maxWidth: "100%", margin: "auto", padding: 2 }}>
			<div>
				<h4 style={{ marginBottom: "1em" }}>Product Category</h4>
			</div>
			<InputFieldSave
				handleSubmit={handleSubmit}
				label="Category Name"
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				isAddingCategory={isAddingCategory}
				isGettingCategories={isGettingCategories}
			/>

			<SearchBar
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onSearch={handleSearch}
			/>

			<div style={{ marginTop: "40px" }}>
				{categories?.length === 0 ? (
					<Empty emptyText="No category" />
				) : (
					<CategoryTable
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						categories={categories}
						isDeletingCategory={isDeletingCategory}
						isEditingCategory={isEditingCategory}
					/>
				)}
			</div>
			<Pagination
				page={page}
				rowsPerPage={rowsPerPage}
				count={totalCategories}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
			/>
		</Box>
	);
};

export default CategoryManagement;