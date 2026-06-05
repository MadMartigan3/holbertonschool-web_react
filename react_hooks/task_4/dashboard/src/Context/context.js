import { createContext } from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const logOut = () => {};

const AppContext = createContext({ user: defaultUser, logOut });

export default AppContext;
