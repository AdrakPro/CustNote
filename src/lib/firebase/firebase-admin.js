import admin from 'firebase-admin';
import { SERVICE_ACCOUNT } from '$lib/utils/constants.js';

const serviceAccount = JSON.parse(SERVICE_ACCOUNT);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
}, 'SERVER');

export const auth = admin.auth;
