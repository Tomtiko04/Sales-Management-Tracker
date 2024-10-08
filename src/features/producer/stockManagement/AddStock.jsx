import { useEffect, useState } from "react";
import useGetProduct from "../productCatalog/useGetProduct";
import useAuthUser from "../../../hook/useAuthUser";
import useStockOperations from "./useStockOperations";
import useAddQuantity from "./useAddQuantity";

export default function AddStock() {
	const { authUser } = useAuthUser();
	const { isGetProduct } = useGetProduct();
	const { isAddStock, isAddingStock } = useStockOperations();
	const { isAddQuantity } = useAddQuantity();
	const [product, setProduct] = useState([]);
	const [formData, setFormData] = useState({
		selectedProductId: "",
		quantity: "",
		note: "",
		costPrice: "",
		manufacturingDate: "",
		expiryDate: "",
		movementType: "IN",
		movementDate: "",
		sellingPrice: "",
	});
	const [error, setError] = useState("");

	useEffect(() => {
		function getProduct() {
			setProduct(isGetProduct || []);
		}
		getProduct();
	}, [isGetProduct]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

    const handleSubmit = (e) => {
			e.preventDefault();

			if (!formData.selectedProductId) {
				setError("Please select a product.");
				return;
			}
			if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
				setError("Please enter a valid quantity.");
				return;
			}
			setError("");

			const stockData = {
				product_id: formData.selectedProductId,
				producer_id: authUser?.id,
				quantity: Number(formData.quantity),
				cost_price: Number(formData.costPrice),
				manufacturing_date: formData.manufacturingDate,
				expiry_date: formData.expiryDate,
				movement_type: formData.movementType || "IN",
				movement_date: formData.movementDate || new Date().toISOString(),
				note: formData.note,
				selling_price: formData.sellingPrice,
			};

			const editQuantity = {
				productId: formData.selectedProductId,
				additionalQuantity: Number(formData.quantity),
				movementType: formData.movementType,
			};

			isAddStock(stockData, {
				onSuccess: () => {
					isAddQuantity(editQuantity);
				},
				onSettled: () => {
					setFormData({
						selectedProductId: "",
						quantity: "",
						note: "",
						costPrice: "",
						manufacturingDate: "",
						expiryDate: "",
						movementType: "IN",
						movementDate: "",
						sellingPrice: "",
					});
				},
			});
		};

	
	return (
		<div>
			<h1>Add Stocks</h1>
			<form onSubmit={handleSubmit}>
				<label>Select Product:</label>
				<select
					name="selectedProductId"
					value={formData.selectedProductId}
					onChange={handleInputChange}>
					<option value="" disabled="true">
						-- Select a product --
					</option>
					{product.map((pro) => (
						<option key={pro.id} value={pro.id}>
							{pro.sku} - {pro.product_name}
						</option>
					))}
				</select>

				{/* Quantity Input */}
				<label>Quantity:</label>
				<input
					type="number"
					name="quantity"
					value={formData.quantity}
					onChange={handleInputChange}
					placeholder="Enter quantity"
				/>

				<label>Movement type: </label>
				<select name="movementType" value={formData.movementType}>
					<option value="" disabled="true">
						-- Select a movement type --
					</option>
					<option value="IN">IN</option>
				</select>

				<div>
					<label>Movement Date</label>
					<input
						type="date"
						name="movementDate"
						value={formData.movementDate}
						onChange={handleInputChange}
						required
					/>
					{/* {errors.expiryDate && <p style={{ color: "red" }}>{errors.expiryDate}</p>} */}
				</div>

				{/* note Input */}
				<label>note for adding stock (optional):</label>
				<input
					type="text"
					name="note"
					value={formData.note}
					onChange={handleInputChange}
					placeholder="e.g., New batch production"
				/>

				<div>
					<label>Cost Price</label>
					<input
						type="number"
						name="costPrice"
						value={formData.costPrice}
						onChange={handleInputChange}
						required
					/>
					{/* {errors.price && <p style={{ color: "red" }}>{errors.price}</p>} */}
				</div>

				<div>
					<label>Selling Price</label>
					<input
						type="number"
						name="sellingPrice"
						value={formData.sellingPrice}
						onChange={handleInputChange}
						required
					/>
					{/* {errors.price && <p style={{ color: "red" }}>{errors.price}</p>} */}
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
					{/* {errors.manufacturingDate && <p style={{ color: "red" }}>{errors.manufacturingDate}</p>} */}
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
					{/* {errors.expiryDate && <p style={{ color: "red" }}>{errors.expiryDate}</p>} */}
				</div>

				{/* Error Message */}
				{error && <p style={{ color: "red" }}>{error}</p>}

				{/* Submit Button */}
				<button type="submit" disabled={isAddingStock}>
					Save
				</button>
			</form>
		</div>
	);
}
