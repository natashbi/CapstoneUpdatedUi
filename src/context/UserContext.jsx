import { createContext, useContext } from 'react';

export const UserContext = createContext({ user: null, onLogout: null, setUser: null });
export const useAppUser = () => useContext(UserContext);
