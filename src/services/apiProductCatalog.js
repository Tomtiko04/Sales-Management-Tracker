import supabase from "./supabase";
import Cookies from "js-cookie";

export async function addProduct({ ...productData }) {
	if (!productData.producer_id) {
		throw new Error("User id not set");
	}
	const { data, error } = await supabase.from("producerProductsCatalog").insert([productData]);
	if (error) throw new Error(error.message);
	return data;
}

export async function getProduct() {
	const id = Cookies.get("userId");
	let { data, error } = await supabase
		.from("producerProductsCatalog")
		.select("*")
		.eq("producer_id", id)
		.range(0, 9);
	//TODO Add pagination

	if (error) throw new Error("Something went wrong");
	return data;
}

export async function deleteProduct(productId) {
	const { error } = await supabase.from("producerProductsCatalog").delete().eq("id", productId);
	if (error) throw new Error(error.message);
}

// import supabase from "./supabase";
// import { supabaseUrl } from "./supabase";

// export async function addProduct(productData) {
// 	try {
// 		// 1. Generate a unique image name using the original file name
// 		const imageName = `${Math.random()}-${productData.product_image.name}`.replaceAll("/", "");
// 		const imagePath = `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;

// 		// 2. Insert product data, using the image path
// 		const { data, error } = await supabase
// 			.from("producerProductsCatalog")
// 			.insert([{ ...productData, product_image: imagePath }]);

// 		if (error) throw new Error(error.message);

// 		// 3. Upload the image to Supabase storage
// 		const { error: storageError } = await supabase.storage
// 			.from("product-images")
// 			.upload(imageName, productData.product_image);

// 		// 4. If there's an error uploading the image, delete the product
// 		if (storageError) {
// 			await supabase.from("producerProductsCatalog").delete().eq("id", data.id); // Ensure you use `data[0].id` to target the correct row

// 			console.error(storageError);
// 			throw new Error("Product image could not be uploaded, and the product was deleted.");
// 		}

// 		return data;
// 	} catch (err) {
// 		throw new Error(err.message);
// 	}
// }

// import supabase from "./supabase";

// export async function addProduct(productData) {
// 	try {
// 		// Check if product image is valid
// 		if (!productData.product_image) throw new Error("Product image is required");

// 		// 1. Generate a unique image name using the original file name
// 		const imageName = `${Math.random()}-${productData.product_image.name}`.replaceAll("/", "");

// 		// 2. Upload the image to Supabase storage
// 		const {  error: storageError } = await supabase.storage
// 			.from("product-images") // Specify the correct bucket
// 			.upload(imageName, productData.product_image); // Upload image file

// 		// 3. If there's an error during image upload, throw error
// 		if (storageError) {
// 			console.error(storageError);
// 			throw new Error("Failed to upload product image.");
// 		}

// 		// 4. Create image path from Supabase storage public URL
// 		const imagePath = supabase.storage.from("product-images").getPublicUrl(imageName).publicUrl;

// 		// 5. Insert product data into the 'producerProductsCatalog' table
// 		const { data, error } = await supabase
// 			.from("producerProductsCatalog")
// 			.insert([{ ...productData, product_image: imagePath }]);

// 		if (error) throw new Error(error.message);

// 		// 6. Return the inserted data
// 		return data;
// 	} catch (err) {
// 		console.error(err.message);
// 		throw new Error(err.message);
// 	}
// }

// import supabase from "./supabase";
// import { supabaseUrl } from "./supabase";

// export async function addProduct(productData) {
// 	// 1. Generate a unique image name based on the uploaded file name
// 	const imageName = `${Math.random()}-${productData.product_image.name}`.replaceAll("/", "");
// 	const imagePath = `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;

// 	// 2. Insert product data into the database (except for the image file itself)
// 	const { data, error } = await supabase
// 		.from("producerProductsCatalog")
// 		.insert([{ ...productData, product_image: imagePath }])
// 		.select()
// 		.single();

// 	if (error) {
// 		console.error(error);
// 		throw new Error("Product could not be created");
// 	}

// 	// 3. Upload the image to the storage bucket
// 	const { error: storageError } = await supabase.storage
// 		.from("product-images")
// 		.upload(imageName, productData.product_image);

// 	// 4. If image upload fails, delete the product record
// 	if (storageError) {
// 		await supabase.from("producerProductsCatalog").delete().eq("id", data.id);
// 		console.error(storageError);
// 		throw new Error("Product image could not be uploaded, and the product was not created");
// 	}

// 	// 5. Return the product data if everything succeeds
// 	return data;
// }
