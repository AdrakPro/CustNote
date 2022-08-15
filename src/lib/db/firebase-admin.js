import * as credentials from './admin-key.json';
import admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

export const auth = admin.auth;
