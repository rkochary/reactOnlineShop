import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyCRdVSksH0QzR_12oJXVC7mMdd-sJBjYIg',
   authDomain: 'online-shop-674ff.firebaseapp.com',
   projectId: 'online-shop-674ff',
   storageBucket: 'online-shop-674ff.appspot.com',
   messagingSenderId: '994083342799',
   appId: '1:994083342799:web:0747da05d7660c0e826aba'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
