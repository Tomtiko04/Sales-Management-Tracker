import { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box, Container, Grid } from "@mui/material";
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useSignup } from "../authentication/useSignup";
import useAuthUser from "../../hook/useAuthUser";
const steps = [
	"Basic Information",
	"Business Information",
	"Product Information",
	"Legal and Compliance",
];

export default function ProducerSignupForm() {
	const { signup, isSignup } = useSignup();
	const { authUser } = useAuthUser();
	const authUserId = authUser?.id;
	const [errors, setErrors] = useState({});
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		companyName: "",
		contactPerson: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		address: "",
		website: "",
		businessCategory: "",
		terms: false,
		policy: false,
		role: "producer",
		fullName: "",
		distributorId: "", 
		subdistributorId: "",
	});

	const dataToSubmit = {
		company_name: formData.companyName,
		contact_person: formData.contactPerson,
		email: formData.email,
		phone: formData.phone,
		password: formData.password,
		address: formData.address,
		website: formData.website,
		business_category: formData.businessCategory,
		terms: formData.terms,
		policy: formData.policy,
		role: formData.role,
		superior_id: authUserId,
		full_name: formData.fullName || "",
		name: formData.company_name || "",
		status: formData.status || "active",
		distributor_id: formData.distributorId || "",
		subdistributor_id: formData.subdistributorId || "",
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
					contactPerson: "",
					email: "",
					phone: "",
					password: "",
					confirmPassword: "",
					address: "",
					website: "",
					businessCategory: "",
					terms: false,
					policy: false,
					role: "",
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
			if (!formData.companyName) newErrors.companyName = "Company name is required.";
			if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required.";
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
			if (!formData.website) newErrors.website = "Website URL is required.";
			if (!formData.businessCategory) newErrors.businessCategory = "Business category is required.";
		}

		// Legal and Compliance
		if (activeStep === 2) {
			if (!formData.terms) newErrors.terms = "You must agree to the Terms & Conditions.";
			if (!formData.policy) newErrors.policy = "You must agree to the Privacy Policy.";
		}

		return newErrors
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
							<Label for="contactPerson">Contact Person</Label>
							<Input
								type="text"
								name="contactPerson"
								id="contactPerson"
								placeholder="Enter contact person"
								value={formData.contactPerson}
								onChange={handleChange}
								invalid={!!errors.contactPerson}
							/>
							{errors.contactPerson && <FormFeedback>{errors.contactPerson}</FormFeedback>}
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
							<Label for="website">Website URL</Label>
							<Input
								type="url"
								name="website"
								id="website"
								placeholder="Enter website URL"
								value={formData.website}
								onChange={handleChange}
								invalid={!!errors.website}
							/>
							{errors.website && <FormFeedback>{errors.website}</FormFeedback>}
						</FormGroup>
						<FormGroup>
							<Label for="businessCategory">Business Category</Label>
							<Input
								type="text"
								name="businessCategory"
								id="businessCategory"
								placeholder="Enter business category"
								value={formData.businessCategory}
								onChange={handleChange}
								invalid={!!errors.businessCategory}
							/>
							{errors.businessCategory && <FormFeedback>{errors.businessCategory}</FormFeedback>}
						</FormGroup>
					</Form>
				);
			case 2:
				return (
					<Form>
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
							src="../../../public/images/background-image.jpg" // Replace with your image path
							alt="Description"
							style={{ width: "100%", height: "auto", objectFit: "cover" }}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box sx={{ width: "100%", marginBlock: "4em" }}>
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
