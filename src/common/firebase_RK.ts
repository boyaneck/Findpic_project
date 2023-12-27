import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import envConfig from '../../config';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = envConfig.db.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
