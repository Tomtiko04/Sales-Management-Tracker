import { PropTypes } from "prop-types";
export default function Empty({ emptyText }) {
	return <div>{emptyText}</div>;
}

Empty.propTypes = {
	emptyText: PropTypes.string,
};
