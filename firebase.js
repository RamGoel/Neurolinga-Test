// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue ,set} from 'firebase/database';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth();


export {
  db,
  auth,
  set,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  ref,
  onValue,
  getDatabase,
  app,
  firebaseConfig,
};
