import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
import dotenv from 'dotenv';
dotenv.config();

var firebaseConfig = {
	apiKey: String(process.env.API_KEY),
	authDomain: String(process.env.AUTH_DOMAIN),
	projectId: String(process.env.PROJECT_ID),
	storageBucket: String(process.env.STORAGE_BUCKET),
	messagingSenderId: Number(process.env.SENDER_INFO),
	appId: String(process.env.APP_ID),
	measurementId: String(process.env.MEASUREMENT_ID),
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
firebase.analytics();

export { storage, firebase as default }