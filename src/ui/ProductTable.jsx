import PropTypes from "prop-types";

export default function ProductTable({ productLists, isGettingProduct }) {
	console.log(productLists);
	return (
		// TODO: Create, Read, Update, Delete
		<div>
			<h1>ProductTable</h1>
			{isGettingProduct && <div>Loading...</div>}
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Image</th>
						<th>Name</th>
						<th>Category</th>
						<th>Code</th>
						{/* <th>Code</th>
						<th>Unit</th>
						<th>Cost Price</th>
						<th>Selling Price</th> */}
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{productLists?.map((product, index) => (
						<tr key={product.id}>
							<td>{index + 1}</td>
							<td>Image</td>
							<td>{product.product_name}</td>
							<td>{product.category}</td>
							<td>{product.sku}</td>
							<td>{product.status || "Active"}</td>
							<td>
								<div>
									<button>View</button>
									<button>Edit</button>
									<button>Delete</button>
								</div>
							</td>
							{/* <td>{product?.category}</td>
							<td>{product?.code}</td>
							<td>{product?.unit}</td>
							<td>{product?.cost_price}</td>
							<td>{product?.selling_price}</td>
							<td>{product?.status}</td> */}
							<td>{/* Actions such as edit/delete can be added here */}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

ProductTable.propTypes = {
	productLists: PropTypes.array.isRequired,
	isGettingProduct: PropTypes.bool.isRequired,
};
