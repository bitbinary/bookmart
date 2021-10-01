import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebaseAuth.getAuth();
const db = firebaseFirestore.getFirestore();
const googleProvider = new firebaseAuth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await firebaseAuth.signInWithPopup(auth, googleProvider);
    const user = res.user;
    // const query = await db
    //   .collection('users')
    //   .where('uid', '==', user.uid)
    //   .get();
    // if (query.docs.length === 0) {
    //   // await db.collection('users').add({
    //   //   uid: user.uid,
    //   //   name: user.displayName,
    //   //   authProvider: 'google',
    //   //   email: user.email,
    //   // });
    // }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = res.user;
    firebaseAuth.sendEmailVerification(user).then(() => {
      alert('Email verification sent. Please verify your email.');
    });
    // await db.collection('users').add({
    //   uid: user.uid,
    //   name,
    //   authProvider: 'local',
    //   email,
    // });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await firebaseAuth.sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  firebaseAuth
    .signOut(auth)
    .then(() => console.log('logged out'))
    .catch((e) => console.log(e));
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
