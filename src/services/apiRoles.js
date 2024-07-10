import supabase from "./supabase";

export async function getRoles() {
	const { data: Roles, error } = await supabase.from("Roles").select("*");
    if(error) throw new Error(error.message);
    return Roles;
}
