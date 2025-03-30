import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC0qdB2DD0sB2elWhc0sVb_2dRDH65Mf9A",
    authDomain: "sweatsense-e8a24.firebaseapp.com",
    projectId: "sweatsense-e8a24",
    storageBucket: "sweatsense-e8a24.firebasestorage.app",
    messagingSenderId: "577613325509",
    appId: "1:577613325509:web:647fe7026a33039478fcac",
    measurementId: "G-RC8DBJ7HWZ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);