import { useState } from "react";
import useResetPassword from "./useResetPassword";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import toast from "react-hot-toast";

export default function RequestResetForm() {
	const { resetPassword, isReseting } = useResetPassword();
	const [email, setEmail] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!email) {
			toast.error("Email is required for reset")
			return;
		} else{
			resetPassword(email);
		}
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
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							height: "100vh",
							padding: "1em",
							backgroundColor: "#f7f7f7",
						}}>
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
								Request Password Reset
							</Typography>
							<form onSubmit={handleSubmit}>
								<TextField
									fullWidth
									label="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									sx={{ mb: 2 }}
									required
								/>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									type="submit"
									disabled={isReseting}
									sx={{
										"backgroundColor": "#1976d2",
										"&:hover": { backgroundColor: "#155a9b" },
									}}>
									{isReseting ? "Sending..." : "Send Reset Link"}
								</Button>
							</form>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
