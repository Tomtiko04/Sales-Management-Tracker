import supabase from "./supabase";

export async function addSales({
	user_id,
	product_type,
	quantity,
	customer_name,
	customer_address,
	phone_number,
	additional_info,
	date,
}) {
	const { data, error } = await supabase.from("Sales").insert([
		{
			user_id: user_id,
			product_type: product_type,
			quantity: quantity,
			customer_name: customer_name,
			customer_address: customer_address,
			phone_number: phone_number,
			additional_info: additional_info,
			date: date,
			status: false,
			review: "unconfirmed",
		},
	]);
	if (error) throw new Error(error.message);
	return data;
}

export async function getAllSales() {
	let { data: Sales, error } = await supabase.from("Sales").select("*");
	if (error) throw new Error(error.message);
	return Sales;
}

export async function deleteSale(productid) {
	const { error } = await supabase.from("Sales").delete().eq("id", productid);
	if (error) throw new Error(error.message);
}

export async function editSale({
	product_type,
	quantity,
	customer_name,
	customer_address,
	phone_number,
	date,
	editId,
}) {
	const { data, error } = await supabase
		.from("Sales")
		.update({
			product_type: product_type,
			quantity: quantity,
			customer_name: customer_name,
			customer_address: customer_address,
			phone_number: phone_number,
			date: date,
		})
		.eq("id", editId);
	if (error) throw new Error(error.message);
	return data;
}
