import React, { createContext, useEffect, useReducer } from "react";

const initial_state = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,        // user info
  token: localStorage.getItem('token_admin') || null,              // JWT
  loading: false,
  error: null,
};

export const AdminAuthContext = createContext(initial_state);

const AdminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADMIN_LOGIN_SUCCESS':
      // action.payload = { user: {…}, token: "xxx.yyy.zzz" }
      return {
        admin: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'ADMIN_LOGIN_FAILURE':
      return {
        admin: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case 'ADMIN_LOGOUT':
      return {
        admin: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AdminAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminAuthReducer, initial_state);

  // Sync to localStorage whenever admin or token changes
  useEffect(() => {
    if (state.admin) {
      localStorage.setItem('admin', JSON.stringify(state.admin));
    } else {
      localStorage.removeItem('admin');
    }

    if (state.token) {
      localStorage.setItem('token_admin', state.token);
    } else {
      localStorage.removeItem('token_admin');
    }
  }, [state.admin, state.token]);

  return (
    <AdminAuthContext.Provider value={{
      admin: state.admin,
      token: state.token,
      loading: state.loading,
      error: state.error,
      dispatch,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
