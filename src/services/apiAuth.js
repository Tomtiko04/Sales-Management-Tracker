import supabase from "./supabase";

// export async function signup({ name, contact, type, distributor, distributorId, userName, email, password }) {
// 	const { data, error } = await supabase.auth.signUp({
// 		email,
// 		password,
// 		options: {
// 			data: {
// 				fullName: name,
// 				phone: contact,
// 				role: type,
// 				distributor,
// 				distributorId,
// 				userName: userName,
// 			},
// 		},
// 	});

// 	if (error) throw new Error(error.message);

// 	// If type is 'sub-distributor', insert into sub_distributors table
// 	if (type === "sub-distributor") {
// 		const { data: subDistData, error: subDistError } = await supabase
// 			.from("sub_distributors")
// 			.insert([{ name: name, distributor_user_id: distributorId }]);
// 		if (subDistError) throw new Error(subDistError.message);
// 		console.log("sub_distributors", subDistData);
// 	}

// 	// Insert new user into `users` table
// 	const { data: userData, error: userError } = await supabase.from("users").insert([
// 		{
// 			// id: data.user.id,
// 			email: email,
// 			full_name: name,
// 			phone: contact,
// 			role: type,
// 			user_name: userName,
// 			associated_distributor: distributor
// 		},
// 	]);
// 	console.log("user data", userData);
// 	if (userError) throw new Error(userError.message);

// 	return data;
// }

// export async function signup({ superiorId, email, password, ...formData }) {
// 	if (!superiorId) return null;

// 	const { data: authData, error: authError } = await supabase.auth.signUp({
// 		email,
// 		password,
// 		options: {
// 			data: {
// 				...formData,
// 				superiorId,
// 			},
// 		},
// 	});

// 	if (authError) throw new Error(authError.message);

// 	if (authData) {
// 		const {error: dbError } = await supabase
// 			.from("users")
// 			.insert([{ superiorId, email, ...formData }]);

// 		if (dbError) throw new Error(dbError.message);
// 	}
// 	return authData;
// }

// export async function signup({ superior_id, email, password, ...formData }) {
// 	console.log("Attempting to sign up with:", { email, password, superior_id, ...formData });
// 	if (!superior_id) {
// 		throw new Error("Login to your account first before creating a user.");
// 	}
// 	const { data: authData, error: authError } = await supabase.auth.signUp({
// 		email,
// 		password,
// 		options: {
// 			data: {
// 				...formData,
// 				superior_id,
// 			},
// 		},
// 	});

// 	if (authError) {
// 		console.error("Auth Error:", authError.message);
// 		throw new Error(authError.message);
// 	}

// 	if (!authData.user) {
// 		console.error("No user created in authData");
// 		throw new Error("Create a user");
// 	}

// 	if (authData.user) {
// 		const { data: userData, error: userError } = await supabase.from("users").insert([
// 			{
// 				superior_id: superior_id,
// 				email: authData.user.email,
// 				company_name: authData.user.raw_user_meta_data.company_name,
// 				contact_person: authData.user.raw_user_meta_data.contact_person,
// 				phone: authData.user.raw_user_meta_data.phone,
// 				address: authData.user.raw_user_meta_data.address,
// 				website: authData.user.raw_user_meta_data.website,
// 				business_category: authData.user.raw_user_meta_data.business_category,
// 				role: authData.user.raw_user_meta_data.role,
// 				full_name: authData.user.raw_user_meta_data.full_name || "",
// 				status: authData.user.raw_user_meta_data.status || "active",
// 				distributor_id: authData.user.raw_user_meta_data.distributor_id || "",
// 				subdistributor_id: authData.user.raw_user_meta_data.subdistributor_id || "",
// 			},
// 		]);

// 		if (userError) {
// 			console.error("User Table Insert Error:", userError.message);
// 			throw new Error(userError.message);
// 		}
// 		console.log("User data inserted:", userData);
// 		return userData;
// 	}

// 	return authData;
// }

export async function signup({ superior_id, email, password, ...formData }) {
	console.log("Attempting to sign up with:", { email, password, superior_id, ...formData });
	if (!superior_id) {
		throw new Error("Superior ID is required to create an account.");
	}

	const { data: authData, error: authError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				...formData,
				superior_id,
			},
		},
	});

	if (authError) {
		console.error("Auth Error:", authError.message);
		throw new Error(authError.message);
	}

	if (!authData.user) {
		console.error("No user created in authData");
		throw new Error("Create a user");
	}

	if (authData.user) {
		console.log("Auth data user:", authData.user);
		// console.log("Form data to be inserted:", {
		// 	superior_id: superior_id,
		// 	email: authData.user.email,
		// 	company_name: formData.companyName,
		// 	contact_person: formData.contactPerson,
		// 	business_category: formData.businessCategory,
		// 	phone: formData.phone,
		// 	address: formData.address,
		// 	website: formData.website,
		// 	role: formData.role,
		// 	full_name: formData.fullName,
		// 	status: formData.status,
		// 	distributor_id: formData.distributorId,
		// 	subdistributor_id: formData.subdistributorId,
		// });
		const { data: userData, error: userError } = await supabase.from("users").insert([
			{
				superior_id: superior_id,
				email: authData.user.email,
				company_name: authData.user.user_metadata.company_name || "",
				contact_person: authData.user.user_metadata.contact_person || "",
				business_category: authData.user.user_metadata.business_category || "",
				phone: authData.user.user_metadata.phone || "",
				address: authData.user.user_metadata.address || "",
				website: authData.user.user_metadata.website || "",
				role: authData.user.user_metadata.role || "",
				full_name: authData.user.user_metadata.full_name || "",
				name: authData.user.user_metadata.company_name || "",
				status: authData.user.user_metadata.status || "active",
				distributor_code: authData.user.user_metadata.distributor_code || "",
				subdistributor_code: authData.user.user_metadata.subdistributor_code || "",
				salesrepresentative_code: authData.user.user_metadata.salesrepresentative_code || "",
				region: authData.user.user_metadata.region || "",
				guarantor_name: authData.user.user_metadata.guarantor_name || "",
				guarantor_number: authData.user.user_metadata.guarantor_number || "",
				guarantor_address: authData.user.user_metadata.guarantor_address || "",
			},
		]);

		if (userError) {
			console.error("User Table Insert Error:", userError.message);
			throw new Error(userError.message);
		}
		console.log("User data inserted:", userData);
		return userData;
	}

	return authData;
}

export async function signin({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	console.log("sigin-data", data);
	return data;
}

export async function signInWithGoogle() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "https://twuylquryexsgasuhofc.supabase.co/auth/v1/callback",
		},
	});

	if (error) throw new Error(error.message);
	return data;
}

export async function resetPassword(email) {
	const hostname = window.location.origin;
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${hostname}/auth/reset-password`,
	});
	if (error) throw new Error(error.message);

	return data;
}

// export async function updateUserPassword({newPassword, token}) {
// 	const { data, error } = await supabase.auth.updateUser(token, {
// 		password: newPassword,
// 	});

// 	if (error) throw new Error(error.message);
// console.log(data);
// 	return data
// }

export async function updateUserPassword({ email, newPassword }) {
	const { data, error } = await supabase.auth.updateUser({
		email,
		password: newPassword,
	});

	if (error) {
		console.error("Update Password Error:", error);
		throw new Error(error.message);
	}

	console.log("Password update data:", data);
	return data;
}

export async function logout() {
	const { data, error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);

	return data;
}
