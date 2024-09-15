import supabase from "./supabase";
import Cookies from "js-cookie";

export async function addProductCategory({ categoryName, userId, companyName }) {
	const { data, error } = await supabase
		.from("productCategory")
		.insert([{ category_name: categoryName, user_id: userId, company_name: companyName }]);

	if (error) throw new Error(error.message);

	return data;
}

export async function getProductCategory() {
	const id = Cookies.get("userId");
	let { data: productCategory, error } = await supabase.from("productCategory").select("*").eq("user_id", id);

	if (error) throw new Error(error.message);

	return productCategory;
}

export async function deleteProductCategory(categoryid) {
	const { error } = await supabase.from("productCategory").delete().eq("id", categoryid);

	if (error) throw new Error(error.message);
}

export async function editProductCategory({ editId, categoryName }) {
	const { data, error } = await supabase
		.from("productCategory")
		.update({ category_name: categoryName })
		.eq("id", editId);

	if (error) throw new Error("Something went wrong");
	return data;
}
