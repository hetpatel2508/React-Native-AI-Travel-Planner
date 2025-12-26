// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAdfj3OAK7ZA07wctO9YAHH1gWWIFoUhqU',
  authDomain: 'ai-trip-planner-2949e.firebaseapp.com',
  projectId: 'ai-trip-planner-2949e',
  storageBucket: 'ai-trip-planner-2949e.firebasestorage.app',
  messagingSenderId: '448928556126',
  appId: '1:448928556126:web:165e6b57619ca8cf4680cf',
  measurementId: 'G-1491R9MGJG',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);
