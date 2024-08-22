import { PropTypes } from "prop-types";
export default function List({ datas }) {
	return (
		<div>
			{datas?.map((data) => (
				<div key={data?.id}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<p>{data?.quantity}</p>
						<p>{data?.customer_name}</p>
						<p>{data?.customer_address}</p>
						<p>{data?.phone_number}</p>
						<p>{data?.additional_info}</p>
						<p>{data?.date}</p>
						<p>{data?.review}</p>
                       {data?.review === "unconfirmed" && <div>
                        <p>Edit</p>
                        <p>Delete</p>
                       </div> }
                        <p>Delete</p>
					</div>
					<hr />
				</div>
			))}
		</div>
	);
}
//todo this will be a tabel.
List.propTypes = {
	datas: PropTypes.any,
};