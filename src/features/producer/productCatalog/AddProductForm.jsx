import { useState, useEffect } from "react";
import useGetProductCategory from "../category/useGetProductCategory";

const AddProductForm = () => {
	const [formData, setFormData] = useState({
		productName: "",
		sku: "",
		price: "",
		costPrice: "",
		category: "",
		description: "",
		stockQuantity: "",
		productImage: null,
		manufacturingDate: "",
		expiryDate: "",
	});
	const { getCategories, isGettingCategories } = useGetProductCategory();
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
		if (!formData.sku) newErrors.sku = "SKU is required";
		if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required";
		if (!formData.costPrice || isNaN(formData.costPrice))
			newErrors.costPrice = "Valid cost price is required";
		if (!formData.category) newErrors.category = "Category is required";
		if (!formData.stockQuantity || isNaN(formData.stockQuantity))
			newErrors.stockQuantity = "Valid stock quantity is required";
		if (!formData.manufacturingDate) newErrors.manufacturingDate = "Manufacturing date is required";
		if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) return;
		const productData = {
			productName: formData.productName,
			sku: formData.sku,
			price: parseFloat(formData.price),
			costPrice: parseFloat(formData.costPrice),
			category: formData.category,
			description: formData.description,
			stockQuantity: parseInt(formData.stockQuantity),
			manufacturingDate: formData.manufacturingDate,
			expiryDate: formData.expiryDate,
			productImage: formData.productImage,
		};
		console.log("Product Submitted:", productData);
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
				<label>SKU</label>
				<input type="text" name="sku" value={formData.sku} onChange={handleInputChange} required />
				{errors.sku && <p style={{ color: "red" }}>{errors.sku}</p>}
			</div>

			<div>
				<label>Price</label>
				<input
					type="number"
					name="price"
					value={formData.price}
					onChange={handleInputChange}
					required
				/>
				{errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
			</div>

			<div>
				<label>Cost Price</label>
				<input
					type="number"
					name="costPrice"
					value={formData.costPrice}
					onChange={handleInputChange}
					required
				/>
				{errors.costPrice && <p style={{ color: "red" }}>{errors.costPrice}</p>}
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
						<option key={cat.id} value={cat.category_name}>
							{cat.category_name}
						</option>
					))}
				</select>
				{errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
			</div>

			<div>
				<label>Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleInputChange}></textarea>
			</div>

			<div>
				<label>Stock Quantity</label>
				<input
					type="number"
					name="stockQuantity"
					value={formData.stockQuantity}
					onChange={handleInputChange}
					required
				/>
				{errors.stockQuantity && <p style={{ color: "red" }}>{errors.stockQuantity}</p>}
			</div>

			<div>
				<label>Manufacturing Date</label>
				<input
					type="date"
					name="manufacturingDate"
					value={formData.manufacturingDate}
					onChange={handleInputChange}
					required
				/>
				{errors.manufacturingDate && <p style={{ color: "red" }}>{errors.manufacturingDate}</p>}
			</div>

			<div>
				<label>Expiry Date</label>
				<input
					type="date"
					name="expiryDate"
					value={formData.expiryDate}
					onChange={handleInputChange}
					required
				/>
				{errors.expiryDate && <p style={{ color: "red" }}>{errors.expiryDate}</p>}
			</div>

			<div>
				<label>Product Image</label>
				<input type="file" onChange={handleImageUpload} />
			</div>

			<button type="submit">Add Product</button>
		</form>
	);
};

export default AddProductForm;