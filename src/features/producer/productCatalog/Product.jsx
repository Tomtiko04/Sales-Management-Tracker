import ProductTable from "../../../ui/ProductTable";
import CreateProductForm from "./CreateProductForm";

export default function Product() {
  return (
    <div>
        <h1>Product Page</h1>
        {/* List Product table */}
        <ProductTable />
        <CreateProductForm />
    </div>
  )
}
