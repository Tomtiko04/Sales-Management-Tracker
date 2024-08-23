import { useEffect, useState } from 'react';
import List from '../../ui/List';
import useGetAllSales from './useGetAllSales';

export default function SalesHistory() {
    const {salesData} = useGetAllSales();
	const [sales, setSales] = useState([]);

	useEffect(function(){
		setSales(salesData)
	},[salesData])
   
  return (
		<div>
			<h1>SalesHistory</h1>
			{sales?.length > 0 && sales?.map((sale) => <List data={sale} key={sale.id} />)}
			{sales?.length == 0 && <div>Record Empty</div>}
		</div>
	);
}


//todo filter by review, search buy customers name