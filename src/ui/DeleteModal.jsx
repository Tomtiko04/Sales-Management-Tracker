import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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

export default function DeleteModal({ open, setIsOpen, category_id, handleDelete }) {
	const handleClose = () => setIsOpen(false);
	
	return (
		<Modal
			keepMounted
			open={open}
			onClose={handleClose}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description">
			<Box sx={style}>
				<Typography id="keep-mounted-modal-title" variant="h6" component="h2">
					Delete Category
				</Typography>
				<Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
					<p>Are you sure you want to be to delete this.</p>
					<button onClick={() => handleClose()}>Close</button>
					<button onClick={() => {handleDelete(category_id), handleClose()}}>Delete</button>
				</Typography>
			</Box>
		</Modal>
	);
}

DeleteModal.propTypes = {
	open: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	category_id: PropTypes.number.isRequired
};
