// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAaIIJhfRy6Mhik1OkYbhgzNdk3l9Jn1TY',
	authDomain: 'custnote-38c35.firebaseapp.com',
	projectId: 'custnote-38c35',
	storageBucket: 'custnote-38c35.appspot.com',
	messagingSenderId: '554174210361',
	appId: '1:554174210361:web:a4118343fda470722ec8e8',
	measurementId: 'G-RL5TBB5YHE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const userDoc = (userId: string) => doc(db, 'users', userId);

export { auth, db, userDoc };
