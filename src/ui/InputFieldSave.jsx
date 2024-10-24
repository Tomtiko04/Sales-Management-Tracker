import { Box, TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { IoSaveOutline } from "react-icons/io5";
import PropTypes from "prop-types";

export default function InputFieldSave({
	handleSubmit,
	label,
	categoryName,
	setCategoryName,
	isAddingCategory,
}) {
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 2,
			}}>
			<TextField
				id="category-name"
				label={label}
				variant="outlined"
				value={categoryName}
				onChange={(e) => setCategoryName(e.target.value)}
				required
				fullWidth
				sx={{ flexGrow: 1 }}
				InputLabelProps={{
					sx: {
						"& .MuiInputLabel-asterisk": {
							color: "red",
						},
					},
				}}
			/>
			{!isAddingCategory ? (
				<Button
					type="submit"
					variant="contained"
					startIcon={<IoSaveOutline />}
					size="small"
					sx={{ height: 56, width: 100 }}>
					Save
				</Button>
			) : (
				<LoadingButton
					type="submit"
					loading={isAddingCategory}
					loadingPosition="start"
					startIcon={<IoSaveOutline />}
					variant="contained"
					size="small"
					sx={{ height: 56, width: 100 }}>
					Saving
				</LoadingButton>
			)}
		</Box>
	);
}

InputFieldSave.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	label: PropTypes.string,
	categoryName: PropTypes.string.isRequired,
	setCategoryName: PropTypes.func.isRequired,
	isAddingCategory: PropTypes.bool,
};