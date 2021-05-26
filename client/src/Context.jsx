import { createContext, useContext } from 'react';

const Context = createContext({
	isLogin: false,
	token: null,
	setIsLogin: async () => console.log('setIsLogin function error'),
	setToken: async () => console.log('setToken function error'),
	getProfile: async () => console.log('getProfile function error'),
	currentUser: null
});

export const useAppContext = () => useContext(Context);
export default Context;