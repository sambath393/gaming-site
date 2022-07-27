// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDC1NC24gTk__d4_SOjLMXOeUmxTHQqpjU',
  authDomain: 'gaming-bot-c3d43.firebaseapp.com',
  databaseURL: 'https://gaming-bot-c3d43-default-rtdb.firebaseio.com',
  projectId: 'gaming-bot-c3d43',
  storageBucket: 'gaming-bot-c3d43.appspot.com',
  messagingSenderId: '41849945800',
  appId: '1:41849945800:web:cece23ecc186495d662ffd',
  measurementId: 'G-V15RTBLCSY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const stroage = getStorage(app);
