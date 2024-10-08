import { useEffect, useState } from "react";
import useGetProduct from "../productCatalog/useGetProduct";
import useAuthUser from "../../../hook/useAuthUser";
import useStockOperations from "./useStockOperations";
import useAddQuantity from "./useAddQuantity";

export default function RemoveStock() {
	const { authUser } = useAuthUser();
	const { isGetProduct } = useGetProduct();
	const { isAddStock, isAddingStock } = useStockOperations();
	const { isAddQuantity } = useAddQuantity();
	const [product, setProduct] = useState([]);
	const [formData, setFormData] = useState({
		selectedProductId: "",
		quantity: "",
		note: "",
		movementType: "OUT",
		movementDate: "",
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
				movement_type: formData.movementType || "OUT",
				movement_date: formData.movementDate || new Date().toISOString(),
				note: formData.note,
			};

			const editQuantity = {
				productId: formData.selectedProductId,
				additionalQuantity: Number(formData.quantity),
                movementType: formData.movementType
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
						movementType: "IN",
						movementDate: "",
					});
				},
			});
		};

	
	return (
		<div>
			<h1>Remove Stocks</h1>
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
					<option value="IN">OUT</option>
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
