// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCy3DlecRc2J-D1JH_4vF-B1ssMgnulLg4',
  authDomain: 'instagram-clone-12b86.firebaseapp.com',
  databaseURL:
    'https://instagram-clone-12b86-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'instagram-clone-12b86',
  storageBucket: 'instagram-clone-12b86.appspot.com',
  messagingSenderId: '588564230602',
  appId: '1:588564230602:web:14bcb2503972a58ad51f33',
  measurementId: 'G-1RDEJ11D4T',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
