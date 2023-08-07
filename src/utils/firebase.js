// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  // connectAuthEmulator,
  getAuth,
} from 'firebase/auth'
import {
  // connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore'
import {
  // connectStorageEmulator,
  getStorage,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDq1Hms3EQ-rA7J4sV1d0TStZGJuS9fZhw',
  authDomain: 'library-management-fad9d.firebaseapp.com',
  projectId: 'library-management-fad9d',
  storageBucket: 'library-management-fad9d.appspot.com',
  messagingSenderId: '581825639918',
  appId: '1:581825639918:web:f7e3f8a9120b098a22caff',
}

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// export const auth = getAuth(app)
// connectAuthEmulator(auth, 'http://127.0.0.1:9099')

// export const db = getFirestore(app)
// connectFirestoreEmulator(db, '127.0.0.1', 8080)

// export const storage = getStorage(app)
// connectStorageEmulator(storage, '127.0.0.1', 9199)
