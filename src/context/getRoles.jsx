import { createContext, useEffect, useReducer } from "react";
import supabase from "../services/supabase";
import {PropTypes} from "prop-types"

export const RolesContext = createContext();

const initialState = {
	role: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "roles/get":
			return{
                ...state, 
                role: action.payload
            };

		default:
			throw new Error("Action unknown");
	}
}

export default function RolesProvider({ children }) {
	useEffect(function () {
		async function getRoles() {
			const { data: Roles } = await supabase.from("Roles").select("role");
			if (Roles) {
				dispatch({type:"roles/get", payload: Roles});
			}
		}
		getRoles();
	}, []);
	const [state, dispatch] = useReducer(reducer, initialState);
	return <RolesContext.Provider value={{ state, dispatch }}>{children}</RolesContext.Provider>;
}


RolesProvider.propTypes = {
    children: PropTypes.any
}