import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';


var firebaseConfig = {
	apiKey: 'AIzaSyCuT_xHUAwvSRH6zLks7oM6fE3MBBCsdn8',
	authDomain: 'aftest-84535.firebaseapp.com',
	projectId: 'aftest-84535',
	storageBucket: 'aftest-84535.appspot.com',
	messagingSenderId: '694428645159',
	appId: '1:694428645159:web:48abdc604c7c59704b9b02',
	measurementId: 'G-KPPD0WYHNP'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
firebase.analytics();

export { storage, firebase as default }