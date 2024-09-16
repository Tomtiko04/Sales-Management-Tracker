import { useQuery } from "@tanstack/react-query";
import { getProduct as getProductApi } from "../../../services/apiProductCatalog";

export default function useGetProduct(){
    const {data:isGetProduct, isPending:isGettingProduct, error} = useQuery({
        queryKey: ["get-product"],
        queryFn: getProductApi,
    })
    if(error) throw new Error("Something went wrong");

    return {isGetProduct, isGettingProduct}
}