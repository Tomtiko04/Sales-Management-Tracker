export default function ProductTable() {
  return (
		//TODO Create, Read, Update, Delete
		<div>
			<h1>ProductTable</h1>
			<table>
				<tr>
					<th>#</th>
                    <th>Image</th>
					<th>Name</th>
					<th>Category</th>
					<th>Code</th>
                    <th>Unit</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Status</th>
                    <th>Actions</th>
				</tr>
				<tr>
					<td>Alfreds Futterkiste</td>
					<td>Maria Anders</td>
					<td>Germany</td>
				</tr>
				<tr>
					<td>Centro comercial Moctezuma</td>
					<td>Francisco Chang</td>
					<td>Mexico</td>
				</tr>
			</table>
		</div>
	);
}
