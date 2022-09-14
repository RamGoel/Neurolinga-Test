import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import { collection, doc, getDoc, getDocs, } from "firebase/firestore";






const firebaseConfig = {
    apiKey: 'AIzaSyCRRGrKSo0RnHT0YHY92LGSJA5mNccZPP4',
    authDomain: 'ode2code-8109f.firebaseapp.com',
    databaseURL: 'https://ode2code-8109f-default-rtdb.firebaseio.com',
    projectId: 'ode2code-8109f',
    storageBucket: 'ode2code-8109f.appspot.com',
    messagingSenderId: '498335715985',
    appId: '1:498335715985:web:9ba486506a056f10b06530',
    measurementId: 'G-3TQE3H0JD1',
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbF = getFirestore(app)
const auth = getAuth();










export { ref, set, dbF, onAuthStateChanged, auth, db, onValue, signInWithEmailAndPassword }
