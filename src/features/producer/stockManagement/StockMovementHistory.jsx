import { useEffect, useState } from "react";
import useGetStocks from "./useGetStocks";
import useAuthUser from "../../../hook/useAuthUser";
import supabase from "../../../services/supabase";

export default function StockMovementHistory() {
	const { isStocks, isGetStocks } = useGetStocks();
	const [stockData, setStockData] = useState([]);
	const { authUser } = useAuthUser();
	const [productData, setProductData] = useState([]);
	const userId = authUser?.id;
	useEffect(
		function () {
			function getStocks() {
				setStockData(isStocks);
			}

			getStocks();
		},
		[isStocks]
	);
	useEffect(
		function () {
			async function getProductInfo() {
				let { data: products, error } = await supabase
					.from("products")
					.select("*")
					.eq("producer_id", userId);
				if (error) throw new Error(error.message);
				setProductData(products);
			}
			getProductInfo();
		},
		[userId]
	);
	console.log(productData);
	return (
		<div>
			{isGetStocks && <div>Loading ...</div>}
			{!isGetStocks && (
				<ul>
					{stockData?.map((stock) => (
						<li key={stock.id}>{stock.quantity}</li>
					))}
				</ul>
			)}
		</div>
	);
}
