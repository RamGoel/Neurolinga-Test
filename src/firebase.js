// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCHJkzwvxGMOtdbVY7xDre3963Gpikdkyk',
  authDomain: 'sample-freelane.firebaseapp.com',
  databaseURL: 'https://sample-freelane-default-rtdb.firebaseio.com',
  projectId: 'sample-freelane',
  storageBucket: 'sample-freelane.appspot.com',
  messagingSenderId: '227488074260',
  appId: '1:227488074260:web:d362812c46ef48ec3cf501',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  db,
  ref,
  onValue,
  getDatabase,
  getStoreType,
  app,
  analytics,
  firebaseConfig,
  loginUser,
};
