import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputFieldSave from "./InputFieldSave";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ModalPanel({ open, setIsOpen }) {
	const handleClose = () => setIsOpen(false);
	const [editValue, setEditValue] = useState("oyin")
	function handleSubmit(e){
		e.preventDefault();
		console.log("Category deleted");
	}
	return (
		<Modal
			keepMounted
			open={open}
			onClose={handleClose}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description">
			<Box sx={style}>
				<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
					Edit Category
				</Typography>
				<Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
					<InputFieldSave  handleSubmit={handleSubmit} categoryName={editValue} setCategoryName={setEditValue}/>
				</Typography>
			</Box>
		</Modal>
	);
}

ModalPanel.propTypes = {
	open: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};
