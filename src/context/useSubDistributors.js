import { useQuery } from "@tanstack/react-query";
import { listSubDistributors as listSubDistributorsApi } from "../services/apiSubDistributors";

export default function useSubDistributors() {
	const {
		isPending,
		error,
		data: subList,
	} = useQuery({
		queryKey: ["sub-distributors-list"],
		queryFn: listSubDistributorsApi,
	});
    if(error) throw new Error(error.message);

    return {isPending, subList}
}
