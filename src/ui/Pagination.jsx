import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";

export default function Pagination({
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
	count,
}) {
	return (
		<TablePagination
			component="div"
			count={count}
			page={page}
			onPageChange={onPageChange}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={onRowsPerPageChange}
		/>
	);
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func.isRequired,
	count: PropTypes.number.isRequired,
};
