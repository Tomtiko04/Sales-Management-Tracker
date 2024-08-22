import { PropTypes } from "prop-types";
import useDeleteSale from "../features/sales-rep/useDeleteSale";
export default function List({ data }) {
	const { deleteSale, isDeleting } = useDeleteSale();
	function deleteSalesById(productid) {
		deleteSale(productid);
	}
	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<p>{data?.quantity}</p>
				<p>{data?.customer_name}</p>
				<p>{data?.customer_address}</p>
				<p>{data?.phone_number}</p>
				<p>{data?.additional_info}</p>
				<p>{data?.date}</p>
				<p>{data?.review}</p>
				{data?.review === "unconfirmed" && (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "2rem",
						}}>
						<button>Edit</button>
						<button onClick={() => deleteSalesById(data?.id)} disabled={isDeleting}>
							Delete
						</button>
					</div>
				)}
			</div>
			<hr />
		</>
	);
}
//todo this will be a tabel.
List.propTypes = {
	data: PropTypes.any,
};
