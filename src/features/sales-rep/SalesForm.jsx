// // import "react-date-range/dist/styles.css"; // main style file
// // import "react-date-range/dist/theme/default.css"; // theme css file
// // import { Calendar } from "react-date-range";
import { useState } from "react";
import useAddSales from "./useAddSales";
import useAuthUser from "../../hook/useAuthUser";

export default function SalesForm() {
	const { addSales, isAdding } = useAddSales();
	const {authUser} = useAuthUser();
	const [formData, setFormData] = useState({
		productType: "",
		quantity: "",
		customerName: "",
		customerAddress: "",
		phoneNumber: "",
		additionalInfo: "",
		date: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (authUser?.id) {
			addSales(
				{
					user_id: authUser.id,
					product_type: formData.productType,
					quantity: formData.quantity,
					customer_name: formData.customerName,
					customer_address: formData.customerAddress,
					phone_number: formData.phoneNumber,
					additional_info: formData.additionalInfo,
					date: formData.date,
				},
				{
					onSettled: () => {
						setFormData({
							productType: "",
							quantity: "",
							customerName: "",
							customerAddress: "",
							phoneNumber: "",
							additionalInfo: "",
							date: "",
						});
					},
				}
			);
		} else {
			alert("You must be logged in to submit a sale.");
		}
	};

	return (
		<div>
			<h2>Sales Form</h2>
			<form onSubmit={handleSubmit}>
				<label>Product type</label>
				<select name="productType" value={formData.productType} onChange={handleChange} required>
					<option value="" disabled>
						Product Type
					</option>
					<option>3 X 3 Diva Satchet</option>
					<option>2 X 2 Diva Satchet</option>
					<option>3 X 3 Diva Purse</option>
					<option>Diva Satchet</option>
				</select>
				<br />
				<hr />
				<label>Quantity</label>
				<input
					name="quantity"
					placeholder="Enter the quantity supplied"
					type="number"
					required
					value={formData.quantity}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Customer Name</label>
				<input
					name="customerName"
					placeholder="Enter customer's name"
					type="text"
					required
					value={formData.customerName}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Customer Address</label>
				<input
					name="customerAddress"
					placeholder="Enter customer's address"
					type="text"
					required
					value={formData.customerAddress}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Customer Phone number</label>
				<input
					name="phoneNumber"
					placeholder="Enter customer's phone number"
					type="text"
					required
					value={formData.phoneNumber}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Additional Info</label>
				<input
					name="additionalInfo"
					placeholder="Add additional comment e.g., has the customer paid yet?"
					type="text"
					required
					value={formData.additionalInfo}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Supply Date</label>
				<input name="date" type="date" required value={formData.date} onChange={handleChange} />
				<br />
				<hr />
				<button type="submit" disabled={isAdding}>
					Submit
				</button>
			</form>
		</div>
	);
}
