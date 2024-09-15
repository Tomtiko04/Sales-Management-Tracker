import supabase from "./supabase";

export async function addProduct({...productData}) {
	const { data, error } = await supabase
		.from("producerProductsCatalog")
		.insert([productData]);

	if (error) throw new Error(error.message);

	return data;
}
