import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
import dotenv from 'dotenv';
dotenv.config();

var firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.SENDER_INFO,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
firebase.analytics();

export { storage, firebase as default }