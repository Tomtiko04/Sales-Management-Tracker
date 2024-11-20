// import { useEffect, useState } from "react";
import ProductTable from "../../../ui/ProductTable";
import CreateProductForm from "./CreateProductForm";
import useGetProduct from "./useGetProduct";

export default function Product() {
	const { isGetProduct, isGettingProduct } = useGetProduct();
	// const [productLists, setProductList] = useState([]);
	// useEffect(() => {
	// 	if (isGetProduct?.length > 0) {
	// 		setProductList(isGetProduct);
	// 	}
	// }, [isGetProduct]);
	return (
		<div>
			<h1>Product Page</h1>
			{/* List Product table */}
			<ProductTable productLists={isGetProduct} isGettingProduct={isGettingProduct} />
			<CreateProductForm />
		</div>
	);
}
