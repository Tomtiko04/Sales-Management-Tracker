import supabase from "./supabase";

export async function addSales({ ...salesToAdd }) {
	const { data, error } = await supabase.from("Sales").insert([salesToAdd]);
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

export async function editSale({ editId, ...fieldsToUpdate }) {
	const { data, error } = await supabase.from("Sales").update(fieldsToUpdate).eq("id", editId);
	if (error) throw new Error(error.message);
	return data;
}
