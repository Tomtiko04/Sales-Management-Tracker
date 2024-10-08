import supabase from "./supabase";
import Cookies from "js-cookie";
export async function addStock({ ...stockData }) {
	if (!stockData.producer_id) {
		throw new Error("User needs to be login");
	}
	const { data, error } = await supabase.from("stock_movements").insert([stockData]);

	if (error) throw new Error("Something went wrong");

	return data;
}

export async function getStocks() {
	const id = Cookies.get("userId");
	let { data: stock_movements, error } = await supabase
		.from("stock_movements")
		.select("*")
		.eq("producer_id", id);

	if (error) throw new Error("Unable to fetch stocks movement");

	return stock_movements;
}
