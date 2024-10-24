import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {PropTypes} from "prop-types"

function SearchBar({ value, onChange, onSearch }) {
	return (
		<Box sx={{ mt: 3 }}>
			<TextField
				variant="outlined"
				placeholder="Search..."
				value={value}
				onChange={onChange}
				sx={{ width: "30%"}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={onSearch} aria-label="search">
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
}

SearchBar.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
