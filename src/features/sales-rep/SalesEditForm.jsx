import { useState } from "react";
import useAuthUser from "../../hook/useAuthUser";
import { PropTypes } from "prop-types";
import useEditSale from "./useEditSale";

export default function SalesEditForm({ data }) {
	const { authUser } = useAuthUser();
	const { isEdit, isEditing } = useEditSale();
	const [formData, setFormData] = useState({
		productType: data?.product_type,
		quantity: data?.quantity,
		customerName: data?.customer_name,
		customerAddress: data?.customer_address,
		phoneNumber: data?.phone_number,
		date: data?.date,
		editReason: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const editId = data?.id;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (authUser?.id) {
			isEdit(
				{
					product_type: formData.productType,
					quantity: formData.quantity,
					customer_name: formData.customerName,
					customer_address: formData.customerAddress,
					phone_number: formData.phoneNumber,
					date: formData.date,
					editId,
				},
				{
					onSettled: () => {
						setFormData({
							productType: "",
							quantity: "",
							customerName: "",
							customerAddress: "",
							phoneNumber: "",
							date: "",
						});
					},
				}
			);
		} else {
			alert("You must be logged in to submit edit sale");
		}
	};

	return (
		<div>
			<h1>SalesEditForm</h1>
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
				<label>Reason for Edit</label>
				<textarea
					name="editReason"
					placeholder="Add reason for making this edit"
					type="text"
					required
					value={formData.editReason}
					onChange={handleChange}
				/>
				<br />
				<hr />
				<label>Supply Date</label>
				<input name="date" type="date" required value={formData.date} onChange={handleChange} />
				<br />
				<hr />
				<button type="submit" disabled={isEditing}>
					Edit
				</button>
			</form>
		</div>
	);
}

SalesEditForm.propTypes = {
	data: PropTypes.any,
};
