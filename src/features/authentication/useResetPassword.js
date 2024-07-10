import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";

export default function useResetPassword() {
  const {mutate: resetPassword, isPending: isReseting} = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: ()=> {
        alert("password reset")
    },
    onError: () => {
        alert("password reset failed")
    }
  })
  return { resetPassword, isReseting };
}
