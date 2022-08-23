// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

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
  sendEmailVerification,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';

const auth = getAuth();
const loginUser = (email, password) => {
  if (email != '' && password != '') {
    // setBtnText("Checking...");

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        onAuthStateChanged(auth, (user) => {
          location.replace('/home');
        });
      })
      .catch((error) => {
        alert('User Not Found');
      });
  } else {
    alert('Enter Valid Email & Password');
  }
};

// SignUp Function
// const signUser = (Name, email, password, userId) => {
//   if (Name != '' && userId != '' && email != '' && password != '') {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((user) => {
//         // Send verification email
//         sendEmailVerification(auth.currentUser)
//           .then(() => {
//             alert('Please Verify Email Id');
//           })
//           .catch((error) => {
//             alert('Some Error Occured ! Try Again');
//           });
//         // Update User Profile
//         updateProfile(auth.currentUser, {
//           displayName: Name,
//           photoURL: userId,
//         })
//           .then(() => {
//             alert('Account Created Successfully');
//           })
//           .catch(function (error) {
//             alert(error.message);
//           });
//         // Update User Data
//         set(
//           ref('Users/' + userId).set({
//             Name: Name,
//             uid: userId,
//             email: email,
//             password: password,
//           })
//         );

//         // Form.reset();
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   } else {
//     alert("Details can't be Empty");
//   }
// };

// const signOutUser = () => {
//   signOut(auth)
//     .then(() => {
//       location.replace('/user');
//     })
//     .catch(() => {
//       alert('Some Error Occured');
//     });
// };

// // Forget Mail Form

// const forgotPass = (email) => {
//   if (email != '') {
//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         alert('Password Reset Mail Send Successfully');
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   } else {
//     alert('Enter a Email Id');
//   }
// };

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
