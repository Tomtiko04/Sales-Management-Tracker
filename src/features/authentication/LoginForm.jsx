import { useState } from "react";
import useLogin from "./useLogin";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const navigate = useNavigate();
	const { isLogin, isLogging } = useLogin();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});

	// Validation logic
	const validate = () => {
		const newErrors = {};
		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email address is invalid";
		}
		if (!password) {
			newErrors.password = "Password is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	function handleSubmit(e) {
		e.preventDefault();
		if (!validate()) return;
		isLogin(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	}

	function handleResetPassword(e) {
		e.preventDefault();
		navigate("/auth/reset-password-request");
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
							maxWidth: "400px",
							margin: "auto",
							padding: "2em",
							borderRadius: "8px",
							boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
							backgroundColor: "#fff",
						}}>
						<Typography variant="h4" align="center" gutterBottom>
							Login
						</Typography>
						<form onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLogging}
								error={!!errors.email}
								helperText={errors.email}
								sx={{ mb: 2 }}
							/>
							<TextField
								fullWidth
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLogging}
								error={!!errors.password}
								helperText={errors.password}
								sx={{ mb: 2 }}
							/>
							<Box sx={{ textAlign: "right", mb: 2 }}>
								<Button
									onClick={handleResetPassword}
									sx={{ textTransform: "none" }}>
									Forgotten password?
								</Button>
							</Box>
							<Button
								fullWidth
								variant="contained"
								type="submit"
								disabled={isLogging}
								sx={{
									"backgroundColor": "#1976d2",
									"color": "#fff",
									"&:hover": { backgroundColor: "#155a9b" },
								}}>
								{isLogging ? "Logging in..." : "Login"}
							</Button>
						</form>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
