import { createContext, useContext } from 'react';

const Context = createContext({
	token: null,
	setToken: async () => console.log('setToken function error'),
	isLogin: false,
	setIsLogin: async () => console.log('setIsLogin function error'),
	currentUser: null,
	getProfile: async () => console.log('getProfile function error'),
	logout: () => console.log('logout function error')
});

export const useAppContext = () => useContext(Context);
export default Context;