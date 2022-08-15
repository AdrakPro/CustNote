import admin from 'firebase-admin';
import { SERVICE_ACCOUNT } from '$lib/utils/constans.js';

const serviceAccount = JSON.parse(SERVICE_ACCOUNT);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth;
