import { useEffect, useState } from "react";
import useSetNewPassword from "./useSetNewPassword";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert, Grid } from "@mui/material"; 

export default function ResetPasswordForm() {
	const { updatePassword, isUpdating } = useSetNewPassword();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const location = useLocation();

	const token = new URLSearchParams(location.search).get("token");

	useEffect(() => {
		if (!token) {
			setError("Token is missing or invalid");
			return;
		}
		try {
			const decodedToken = JSON.parse(atob(token.split(".")[1]));
			setEmail(decodedToken.email);
		} catch (err) {
			setError("Invalid token");
		}
	}, [token]);

	function handleSubmit(e) {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		updatePassword({ email, newPassword });
	}

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				{/* Image Column */}
				<Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
					<Box
						component="img"
						src="/public/images/background-image.jpg"
						alt="Login Illustration"
						sx={{
							width: "100%",
							height: "100vh",
							objectFit: "cover",
						}}
					/>
				</Grid>

				{/* Form Column */}
				<Grid
				item
				xs={12}
				md={6}
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<Box
					sx={{
						maxWidth: "400px",
						width: "100%",
						padding: "2em",
						backgroundColor: "#fff",
						borderRadius: "8px",
						boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
					}}>
					<Typography variant="h5" align="center" gutterBottom>
						Reset Password
					</Typography>
					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="New Password"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							sx={{ mb: 2 }}
							required
						/>
						<TextField
							fullWidth
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							sx={{ mb: 2 }}
							required
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							type="submit"
							disabled={isUpdating}
							sx={{
								"backgroundColor": "#1976d2",
								"&:hover": { backgroundColor: "#155a9b" },
							}}>
							{isUpdating ? "Updating..." : "Submit"}
						</Button>
					</form>
				</Box>
			</Grid>
			</Grid>
		</Box>
	);
}
