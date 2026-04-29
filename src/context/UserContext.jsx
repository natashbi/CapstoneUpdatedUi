import { createContext, useContext } from 'react';

export const UserContext = createContext({ user: null, onLogout: null });
export const useAppUser = () => useContext(UserContext);
