import List from '../../ui/List';
import useGetAllSales from './useGetAllSales';

export default function SalesHistory() {
    const {salesData} = useGetAllSales();
   
  return (
		<div>
			<h1>SalesHistory</h1>
			{salesData?.map((sales) => (
				<List data={sales} key={sales.id} />
			))}
		</div>
	);
}


//todo filter by review, search buy customers name