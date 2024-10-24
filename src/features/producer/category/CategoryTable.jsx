import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import ModalPanel from "../../../ui/ModalPanel";

const CategoryTable = ({
	categories,
	handleDelete,
	handleEdit,
	isDeletingCategory,
	isEditingCategory,
	isGettingCategories,
	openEditModal,
	isModal,
	setIsModal,
}) => {
	return (
		<div>
			<TableContainer sx={{ maxWidth: "100%", margin: "auto" }}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#f5f5f5" }}>
							<TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
							<TableCell sx={{ fontWeight: "bold" }} align="right">
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					{isGettingCategories ? (
						<div>Loading</div>
					) : (
						<TableBody>
							{categories?.map((category) => (
								<TableRow key={category.id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
									<TableCell>{category.category_name}</TableCell>
									<TableCell align="right">
										<IconButton
											aria-label="edit"
											onClick={() => {
												handleEdit(category.id, category.category_name), openEditModal();
											}}
											disabled={isEditingCategory}
											sx={{ color: "primary.main", mr: 1 }}>
											<EditIcon />
										</IconButton>
										<IconButton
											aria-label="delete"
											onClick={() => handleDelete(category.id)}
											disabled={isDeletingCategory}
											sx={{ color: "error.main" }}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
			{isModal && <ModalPanel open={isModal} setIsOpen={setIsModal}/>}
		</div>
	);
};

CategoryTable.propTypes = {
	categories: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	isDeletingCategory: PropTypes.bool.isRequired,
	isEditingCategory: PropTypes.bool.isRequired,
	isGettingCategories: PropTypes.bool.any,
	openEditModal: PropTypes.func.isRequired,
	isModal: PropTypes.bool.isRequired,
	setIsModal: PropTypes.func.isRequired,
};

export default CategoryTable;
