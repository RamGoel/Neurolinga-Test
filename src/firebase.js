// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from 'firebase/app';

import {
  ref,
  set,
  onValue,
  getDatabase,
  onChildAdded,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCHJkzwvxGMOtdbVY7xDre3963Gpikdkyk',
  authDomain: 'sample-freelane.firebaseapp.com',
  databaseURL: 'https://sample-freelane-default-rtdb.firebaseio.com',
  projectId: 'sample-freelane',
  storageBucket: 'sample-freelane.appspot.com',
  messagingSenderId: '227488074260',
  appId: '1:227488074260:web:d362812c46ef48ec3cf501',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var count = 9;

window.onload = () => {
  count = localStorage.getItem('fireBase Counter') || 0;
};
window.onbeforeunload = () => {
  localStorage.setItem('firebaseCounter', count);
};
async function sendMessage(user, text) {
  if (user) {
    try {
      const d = new Date();
      const messageRef = ref(db, `Messages/${count}`);
      await set(messageRef, {
        id: user,
        message: text,
        time: `${d.getHours()}:${d.getMinutes()}`,
      });

      count = count + 1;
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Choose a Chat First');
  }
}

export { db, ref, onChildAdded, onValue, set, sendMessage };
