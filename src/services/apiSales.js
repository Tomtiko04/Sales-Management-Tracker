import Cookies from "js-cookie";
import supabase from "./supabase";

export async function addSales({ ...salesToAdd }) {
	const { data, error } = await supabase.from("Sales").insert([salesToAdd]);
	if (error) throw new Error(error.message);
	return data;
}

export async function getAllSales() {
	const id = Cookies.get("userId");
	let { data: Sales, error } = await supabase.from("Sales").select("*").eq("user_id", id);
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

export async function getSalesBySub() {
	const sub_distributor_id = Cookies.get("distributorId");
	console.log(sub_distributor_id);
	let { data: Sales, error } = await supabase
		.from("Sales")
		.select("*")
		.eq("sub_distributor_id", sub_distributor_id);
	if (error) throw new Error(error.message);
	return Sales;
}

export async function editSalesStatus(status, saleId) {
	const { data, error } = await supabase.from("Sales").update({ status: status }).eq("id", saleId);
	if (error) {
		console.error("Error updating status:", error.message);
		throw new Error(error.message);
	}
	console.log("Update response:", data);
	return data;
}
