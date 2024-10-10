import { useEffect, useState } from "react";
import useAddProductCategory from "./useAddProductCategory";
import useGetProductCategory from "./useGetProductCategory";
import useAuthUser from "../../../hook/useAuthUser";
import useDeleteCategory from "./useDeleteCategory";
import useEditCategory from "./useEditCategory";
import { Box } from "@mui/material";
import Empty from "../../../ui/Empty";
import InputFieldSave from "../../../ui/InputFieldSave";
// import FormControlLabel from "@mui/material/FormControlLabel";

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
			<InputFieldSave
				handleSubmit={handleSubmit}
				label="Category Name"
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				isAddingCategory={isAddingCategory}
			/>
			{isGettingCategories && <div>Loading</div>}

			{categories?.length == 0 ? (
				<div>
					<Empty emptyText="No category" />
				</div>
			) : (
				<>
					<ul>
						{categories?.map((category) => (
							<li key={category.id}>
								{category.category_name}
								<button onClick={() => handleDelete(category.id)} disabled={isDeletingCategory}>
									Delete
								</button>
								<button
									onClick={() => handleEdit(category.id, category.category_name)}
									disabled={isEditingCategory}>
									Edit
								</button>
							</li>
						))}
					</ul>
				</>
			)}
		</Box>
	);
};

export default CategoryManagement;
