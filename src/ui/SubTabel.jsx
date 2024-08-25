import PropTypes from "prop-types";
import useEditSaleStatus from "../features/sub-distributor/useEditSaleStatus";

export default function SubTabel({ sale, index }) {
	const { editStatus, isEditingStatus } = useEditSaleStatus();

	function onConfirm(id) {
		editStatus({
			status: "Confirmed",
			saleId: id,
		});
        console.log(id);
	}

	function onReject(id) {
		editStatus({
			status: "Rejected",
			saleId: id,
		});
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Product Type</th>
						<th>Quantity</th>
						<th>Customer Name</th>
						<th>Customer Address</th>
						<th>Customer Phone</th>
						<th>Supply Date</th>
						<th>Sales Rep Name</th>
						<th>Additional Info</th>
						<th>Edit Reason</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr key={sale.id}>
						<td>{index}</td>
						<td>{sale.product_type}</td>
						<td>{sale.quantity}</td>
						<td>{sale.customer_name}</td>
						<td>{sale.customer_address}</td>
						<td>{sale.phone_number}</td>
						<td>{sale.date}</td>
						<td>{sale.rep_name}</td>
						<td>{sale.additional_info}</td>
						{sale.edit_reason !== "-" ? <td>{sale.edit_reason}</td> : <td>No edit</td>}
						<td>{sale.status}</td>
						<td>
							{sale.status === "Pending" && (
								<>
									<button onClick={() => onConfirm(sale.id)} disabled={isEditingStatus}>
										Confirm
									</button>
									<button onClick={() => onReject(sale.id)} disabled={isEditingStatus}>
										Reject
									</button>
								</>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

SubTabel.propTypes = {
	sale: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};
