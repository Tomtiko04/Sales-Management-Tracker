import { useEffect, useState } from "react";
import useAddProductCategory from "./useAddProductCategory";
import useGetProductCategory from "./useGetProductCategory";
import useAuthUser from "../../../hook/useAuthUser";
import useDeleteCategory from "./useDeleteCategory";
import useEditCategory from "./useEditCategory";

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
	function addProductCategory(e) {
		e.preventDefault();
		addCategory({
			categoryName,
			userId,
			companyName,
		});
		setCategoryName("");
	}

	//Edit category
	function handleEdit(editId, categoryName){
		isEditCategory({ editId, categoryName });
	}
	
	//Delete category
	function handleDelete(categoryId){
		isDeleteCategoty(categoryId)
	}

	return (
		<div>
			<form onSubmit={addProductCategory}>
				<input
					type="text"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
					placeholder="Category Name"
					required
				/>
				<button type="submit" disabled={isAddingCategory}>
					Add Category
				</button>
			</form>

			{isGettingCategories && <div>Loading</div>}

			{categories?.length == 0 ? (
				<div>
					<p>Empty Category</p>
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
								<button onClick={()=> handleEdit(category.id, category.category_name)} disabled={isEditingCategory}>Edit</button>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default CategoryManagement;
