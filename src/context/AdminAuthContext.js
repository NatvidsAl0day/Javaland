import { createContext, useEffect, useReducer } from "react";

const initial_state = {
    admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null,
    loading: false,
    error: null,
};


export const AdminAuthContext = createContext(initial_state);

const AdminAuthReducer = (state, action) => {
    switch (action.type) {
        case 'ADMIN_LOGIN_START':
            return {
                admin: null,
                loading: true,
                error: null,
            };
        case 'ADMIN_LOGIN_SUCCESS':
            return {
                admin: action.payload,
                loading: false,
                error: null,
            };
        case 'ADMIN_LOGIN_FAILURE':
            return {
                admin: null,
                loading: false,
                error: action.payload,
            };
        case 'ADMIN_LOGOUT':
            return {
                admin: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AdminAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdminAuthReducer, initial_state);

    useEffect(() => {
        localStorage.setItem('admin', JSON.stringify(state.admin));
    }, [state.admin]);

    return (
        <AdminAuthContext.Provider value={{
            admin: state.admin,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AdminAuthContext.Provider>
)}
