import supabase from "./supabase";

export async function listSubDistributors() {
	const { data: sub_distributors, error } = await supabase.from("sub_distributors").select("*");

	if (error) throw new Error(error.message);

	return sub_distributors;
}
