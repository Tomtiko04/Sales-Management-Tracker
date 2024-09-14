import { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box, Container, Grid } from "@mui/material";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useSignup } from "../authentication/useSignup";
import useAuthUser from "../../hook/useAuthUser";

const steps = ["Basic Information", "Address Information"];
export default function SubDistributorSignupForm() {
	const { signup, isSignup } = useSignup();
	const { authUser } = useAuthUser();
	const authUserId = authUser?.id;
	const [errors, setErrors] = useState({});
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		companyName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		address: "",
		terms: false,
		policy: false,
		role: "sub-distributor",
		fullName: "",
		subdistributorCode: "",
		region: "",
	});

	const dataToSubmit = {
		company_name: formData.companyName,
		email: formData.email,
		phone: formData.phone,
		password: formData.password,
		address: formData.address,
		terms: formData.terms,
		policy: formData.policy,
		role: formData.role,
		superior_id: authUserId,
		full_name: formData.fullName,
		name: formData.companyName,
		status: "active",
		region: formData.region,
		subdistributor_code: formData.subdistributorCode || "",
	};

	const handleNext = () => {
		const newErrors = validateForm();
		if (Object.keys(newErrors).length === 0) {
			if (activeStep === steps.length - 1) {
				handleSubmit();
			} else {
				setActiveStep((prevStep) => prevStep + 1);
			}
		} else {
			setErrors(newErrors);
		}
	};

	const handleSubmit = () => {
		signup(dataToSubmit, {
			onSettled: () => {
				setFormData({
					companyName: "",
					email: "",
					phone: "",
					password: "",
					confirmPassword: "",
					address: "",
					terms: false,
					policy: false,
					role: "",
					fullName: "",
					subdistributorCode: "",
					region: "",
				});
			},
		});
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const validateForm = () => {
		const newErrors = {};

		// Basic Information
		if (activeStep === 0) {
			// if (!formData.companyName) newErrors.companyName = "Company name is required.";
			if (!formData.fullName) newErrors.fullName = "Full name is required.";
			if (!formData.email) newErrors.email = "Email address is required.";
			else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";
			if (!formData.phone) newErrors.phone = "Phone number is required.";
			if (!formData.password) newErrors.password = "Password is required.";
			if (formData.password !== formData.confirmPassword)
				newErrors.confirmPassword = "Passwords must match.";
		}

		// Business Information
		if (activeStep === 1) {
			if (!formData.address) newErrors.address = "Business address is required.";
			if (!formData.region) newErrors.region = "Region area is required.";
			// if (!formData.contractStartDate)
			// 	newErrors.contractStartDate = "Contract start date is required.";
			if (!formData.subdistributorCode) newErrors.subdistributorCode = "Distributor code is required.";
			if (!formData.terms) newErrors.terms = "You must agree to the Terms & Conditions.";
			if (!formData.policy) newErrors.policy = "You must agree to the Privacy Policy.";
		}
		return newErrors;
	};

	const renderStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<Form>
						<FormGroup>
							<Label for="companyName">Company Name</Label>
							<Input
								type="text"
								name="companyName"
								id="companyName"
								placeholder="Enter company name"
								value={formData.companyName}
								onChange={handleChange}
								invalid={!!errors.companyName}
							/>
							{errors.companyName && <FormFeedback>{errors.companyName}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="fullName">Full Name</Label>
							<Input
								type="text"
								name="fullName"
								id="fullName"
								placeholder="Enter contact person"
								value={formData.fullName}
								onChange={handleChange}
								invalid={!!errors.fullName}
							/>
							{errors.fullName && <FormFeedback>{errors.fullName}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="email">Email Address</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="Enter email address"
								value={formData.email}
								onChange={handleChange}
								invalid={!!errors.email}
							/>
							{errors.email && <FormFeedback>{errors.email}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="phone">Phone Number</Label>
							<Input
								type="text"
								name="phone"
								id="phone"
								placeholder="Enter phone number"
								value={formData.phone}
								onChange={handleChange}
								invalid={!!errors.phone}
							/>
							{errors.phone && <FormFeedback>{errors.phone}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="Enter password"
								value={formData.password}
								onChange={handleChange}
								invalid={!!errors.password}
							/>
							{errors.password && <FormFeedback>{errors.password}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="confirmPassword">Confirm Password</Label>
							<Input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="Confirm password"
								value={formData.confirmPassword}
								onChange={handleChange}
								invalid={!!errors.confirmPassword}
							/>
							{errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
						</FormGroup>
					</Form>
				);
			case 1:
				return (
					<Form>
						<FormGroup>
							<Label for="address">Business Address</Label>
							<Input
								type="text"
								name="address"
								id="address"
								placeholder="Enter business address"
								value={formData.address}
								onChange={handleChange}
								invalid={!!errors.address}
							/>
							{errors.address && <FormFeedback>{errors.address}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="region">Region</Label>
							<Input
								type="text"
								id="region"
								name="region"
								value={formData.region}
								onChange={handleChange}
								placeholder="Enter the region covered"
							/>
							{errors.region && <FormFeedback>{errors.region}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="subdistributorCode">Sub-Distributor Code</Label>
							<Input
								type="text"
								id="subdistributorCode"
								name="subdistributorCode"
								value={formData.subdistributorCode}
								onChange={handleChange}
								placeholder="Enter distributor code"
							/>
							{errors.subdistributorCode && <FormFeedback>{errors.subdistributorCode}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label check>
								<Input
									type="checkbox"
									name="terms"
									checked={formData.terms}
									onChange={handleChange}
									invalid={!!errors.terms}
								/>{" "}
								I agree to the Terms & Conditions
							</Label>
							{errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label check>
								<Input
									type="checkbox"
									name="policy"
									checked={formData.policy}
									onChange={handleChange}
									invalid={!!errors.policy}
								/>{" "}
								I agree to the Privacy Policy
							</Label>
							{errors.policy && <FormFeedback>{errors.policy}</FormFeedback>}
						</FormGroup>
					</Form>
				);
			default:
				return <Typography>Unknown step</Typography>;
		}
	};

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
						}}>
						<img
							src="/public/images/background-image.jpg"
							alt="Description"
							style={{ width: "100%", height: "auto", objectFit: "cover" }}
						/>
					</Box>
				</Grid>

				<Grid item xs={12} md={6}>
					<Box sx={{ width: "100%", marginBlock: "4em" }}>
						<h1>Sub Distributor</h1>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Box sx={{ p: 3 }}>
							{renderStepContent(activeStep)}
							<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}>
									Back
								</Button>
								<Button variant="contained" onClick={handleNext} disabled={isSignup}>
									{activeStep === steps.length - 1 ? "Finish" : "Next"}
								</Button>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}
