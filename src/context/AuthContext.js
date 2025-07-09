import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { user: null, token: null, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };

    case 'LOGIN_FAILURE':
      return { user: null, token: null, loading: false, error: action.payload };

    case 'LOGOUT':
      return { user: null, token: null, loading: false, error: null };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
