import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle as signInWithGoogleApi } from "../../services/apiAuth";

export default function useGoogle() {
  const {mutate: isLoginGoogle, isPending: isLogingGoogle} = useMutation({
	mutationFn: signInWithGoogleApi,
	onSuccess: () => {
		console.log("logged in with google")
	},
	onError: () => {
		console.log("logged in with google failed");
	}
  })
  
  return {isLoginGoogle, isLogingGoogle}
}
