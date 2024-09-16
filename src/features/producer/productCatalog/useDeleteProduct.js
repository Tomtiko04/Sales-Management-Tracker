import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../../services/apiProductCatalog";
import toast from "react-hot-toast";

export default function useDeleteProduct(){
    const queryClient = useQueryClient();
    const {mutate: isProductDelete, isPending:isProductDeleting, error} = useMutation({
        mutationKey: ["product-delete"],
        mutationFn: deleteProductApi,
        onSuccess: () => {
            toast.error("Product was deleted sucessful");
            queryClient.invalidateQueries({
                queryKey: ["get-product"]
            })
        },
        onError: () => {
            toast.error("Product was not deleted");
        }
    })
    if(error) throw new Error(error.message);
    return {isProductDelete, isProductDeleting}
}