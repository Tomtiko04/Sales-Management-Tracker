import { useState, useEffect } from "react";
import useGetProductCategory from "../category/useGetProductCategory";
import useAddProduct from "./useAddProduct";
import useAuthUser from "../../../hook/useAuthUser";

const CreateProductForm = () => {
	const [formData, setFormData] = useState({
		productName: "",
		category: "",
		description: "",
		productImage: null,
	});
	const { getCategories, isGettingCategories } = useGetProductCategory();
	const { isAddProduct, isAddingProduct } = useAddProduct();
	const { authUser } = useAuthUser();
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		setCategories(getCategories);
	}, [getCategories]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImageUpload = (e) => {
		setFormData({
			...formData,
			productImage: e.target.files[0],
		});
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.productName) newErrors.productName = "Product Name is required";
		if (!formData.category) newErrors.category = "Category is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) return;
		const productData = {
			product_name: formData.productName,
			producer_id: authUser?.id,
			category: formData.category,
			description: formData.description,
			product_image: formData.productImage,
		};

		isAddProduct(productData, {
			onSettled: () => {
				setFormData({
					productName: "",
					category: "",
					description: "",
					productImage: null,
				});
			},
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Product Name</label>
				<input
					type="text"
					name="productName"
					value={formData.productName}
					onChange={handleInputChange}
					required
				/>
				{errors.productName && <p style={{ color: "red" }}>{errors.productName}</p>}
			</div>

			<div>
				<label>Category</label>
				<select
					name="category"
					value={formData.category}
					onChange={handleInputChange}
					required
					disabled={isGettingCategories}>
					<option value="">Select Category</option>
					{categories?.map((cat) => (
						<>
							<option key={cat.id} value={cat.category_name}>
								{cat.category_name}
							</option>
						</>
					))}
				</select>
				{errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
			</div>

			<div>
				<label>Note</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleInputChange}></textarea>
			</div>

			<div>
				<label>Product Image</label>
				<input type="file" onChange={handleImageUpload} />
			</div>

			<button type="submit" disabled={isAddingProduct}>
				Add Product
			</button>
		</form>
	);
};

export default CreateProductForm;
