import CategoryManagement from "../producer/category/CategoryManagement";
import AddProductForm from "../producer/productCatalog/AddProductForm";

export default function ProducerDashboard() {
	return (
		<div>
			<h1>ProducerDashboard</h1>
			<CategoryManagement />
			<AddProductForm />
		</div>
	);
}
