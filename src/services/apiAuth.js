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

export async function signup({
	name,
	contact,
	type,
	distributor,
	distributorId,
	userName,
	email,
	password,
	isAdmin,
}) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName: name,
				phone: contact,
				role: type,
				distributor,
				distributorId,
				userName: userName,
				isAdmin: isAdmin
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
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
