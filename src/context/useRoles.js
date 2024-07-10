// import { useContext } from "react";
// import { RolesContext } from "./getRoles";

// function useRoles(){
//     const context = useContext(RolesContext);
//     if (!context) throw new Error("RolesContext was used outside of the RolesProvider");
// 		return context;
// }

// export {useRoles}

import { useQuery } from '@tanstack/react-query'
import { getRoles as getRolesApi } from '../services/apiRoles'

export default function useRoles() {
 const { isPending, error, data:roleData } = useQuery({
		queryKey: ["roles"],
		queryFn: getRolesApi,
 });

 if(error) throw new Error(error.message);

 return {roleData, isPending}
 
}
