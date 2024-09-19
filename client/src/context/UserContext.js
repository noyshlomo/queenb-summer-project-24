import { createContext, useReducer } from "react";
// Creating a new context to share user authentication state
export const UserContext = createContext();

// Defining the reducer function that will handle state changes based on the action type.
export const UserAuthReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state;
    }
}
// Creating a context provider component that wraps other components
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserAuthReducer, {user: null});
    console.log('state: ', state);
    return (
        <UserContext.Provider value={{...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}