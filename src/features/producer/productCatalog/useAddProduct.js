import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../../services/apiProductCatalog";
import toast from "react-hot-toast";

export default function useAddProduct(){
    const queryClient = useQueryClient();
    const {mutate:isAddProduct, isPending:isAddingProduct, error} = useMutation({
        mutationKey: ["add-product"],
        mutationFn: addProduct,
        onSuccess: () => {
            toast.success("Product created");
            queryClient.invalidateQueries({
                queryKey: ["get-product"]
            })
        },
        onError: () => {
            toast.error("Error add product")
        }
    })

    if(error) throw new Error(error.message);
    return {isAddProduct, isAddingProduct}
}