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
import { useState } from "react";
import ModalPanel from "../../../ui/ModalPanel";
import DeleteModal from "../../../ui/DeleteModal";

const CategoryTable = ({
	categories,
	handleDelete,
	handleEdit,
	isDeletingCategory,
	isEditingCategory,
	isGettingCategories,
}) => {
	const [editId, setEditId] = useState(null);
	const [editName, setEditName] = useState("");
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	function handleEditModal(id, editName){
		setEditId(id);
		setEditName(editName);
		setEditModal(!editModal);
	}

	function handleDeleteModal(id) {
		setDeleteId(id)
		setDeleteModal(!deleteModal);
	}

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
												handleEditModal(category.id, category.category_name);
											}}
											disabled={isEditingCategory}
											sx={{ color: "primary.main", mr: 1 }}>
											<EditIcon />
										</IconButton>
										<IconButton
											aria-label="delete"
											onClick={() => handleDeleteModal(category.id)}
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
			{editModal && (
				<ModalPanel
					open={editModal}
					setIsOpen={setEditModal}
					defaultEdit={editName}
					id={editId}
					handleEdit={handleEdit}
				/>
			)}
			{deleteModal && (
				<DeleteModal
					open={deleteModal}
					setIsOpen={setDeleteModal}
					handleDelete={handleDelete}
					category_id={deleteId}
				/>
			)}
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
};

export default CategoryTable;
