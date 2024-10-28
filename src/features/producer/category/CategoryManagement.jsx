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

const CategoryManagement = () => {
	const { addCategory, isAddingCategory } = useAddProductCategory();
	const { getCategories, isGettingCategories } = useGetProductCategory();
	const { isDeleteCategoty, isDeletingCategory } = useDeleteCategory();
	const { isEditCategory, isEditingCategory } = useEditCategory();
	const { authUser } = useAuthUser();
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);

	const userId = authUser?.id;
	const companyName = authUser?.user_metadata.company_name;

	//TODO Use context for these functions
	
	//Storing fetched categories
	useEffect(() => {
		setCategories(getCategories);
	}, [getCategories]);

	//Creating new Category
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

	//Edit category
	function handleEdit(editId, categoryName) {
		isEditCategory({ editId, categoryName });
	}

	//Delete category
	function handleDelete(categoryId) {
		isDeleteCategoty(categoryId);
	}

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

			{/* TODO search bar */}
			<SearchBar />
			{/* Connect the search */}

			{/* TODO Pagination */}

			<div style={{ marginTop: "40px" }}>
				{categories?.length == 0 ? (
					<div>
						<Empty emptyText="No category" />
					</div>
				) : (
					<>
						<CategoryTable
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							categories={categories}
							isDeletingCategory={isDeletingCategory}
							isEditingCategory={isEditingCategory}
						/>
					</>
				)}
			</div>
		</Box>
	);
};

export default CategoryManagement;
