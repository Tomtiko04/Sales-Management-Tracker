import { useEffect, useState } from "react";
import supabase from "../services/supabase";

export default function useAuthUser() {
    const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
		async function getAuthUser() {
			const { data, error } = await supabase.auth.getUser();
            if(data){
                setAuthUser(data.user)
            }else{
                console.log(error);
            }
		}
		getAuthUser();
	}, []);
    return {authUser}
}
