import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCw446gUCO4IP8bSMuMyyd60w-w0mr3o0E",
    authDomain: "v-canteen-d9cfc.firebaseapp.com",
    projectId: "v-canteen-d9cfc",
    storageBucket: "v-canteen-d9cfc.appspot.com",
    messagingSenderId: "975524463438",
    appId: "1:975524463438:web:411c8e358b8aec8ba1941f",
    measurementId: "G-CVJJQM42GN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const auth = getAuth(app)
const db = getFirestore(app);

export { db, auth, storage };
