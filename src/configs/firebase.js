import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from 'firebase/functions';
import { bottomStandard } from './toastConfigs';
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
// const analytics = getAnalytics(app);
const auth = firebaseAuth.getAuth();
const db = getFirestore(app);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, 'localhost', 5001);

const googleProvider = new firebaseAuth.GoogleAuthProvider();

// REGULAR USER METHODS
const signInWithGoogle = async () => {
  try {
    const res = await firebaseAuth.signInWithPopup(auth, googleProvider);
    const user = res.user;
    firebaseAuth.updateProfile(user, {
      displayName: user.displayName,
    });
    toast(`Welcome ${user.displayName}`, bottomStandard);
    setUserData(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = result.user;
    toast(`Welcome ${user.displayName}`, bottomStandard);
    setUserData(user);
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
    firebaseAuth.updateProfile(user, {
      displayName: name,
    });
    setUserData({
      displayName: name,
      email: user.email,
      role: 'user',
      uid: user.uid,
      metadata: { creationTime: user.metadata.creationTime },
    });
    refreshToken();
    toast(`Welcome ${user.displayName}`, bottomStandard);
    firebaseAuth.sendEmailVerification(user).then(() => {
      toast.info(`Email Verification Link sent`, bottomStandard);
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await firebaseAuth.sendPasswordResetEmail(auth, email);
    toast(`Password Reset Link sent`, bottomStandard);
  } catch (err) {
    console.error(err);
    toast.error(`Unable to locate email`, bottomStandard);
  }
};
const refreshToken = () => {
  const user = auth?.currentUser;
  if (user) {
    user.getIdToken().then((token) => {
      localStorage.setItem('token', token);
    });
  }
};
const logout = () => {
  toast(`See you soon`, bottomStandard);
  firebaseAuth
    .signOut(auth)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userClaim');
    })
    .catch((e) => console.log(e));
};

const setUserData = async (user, forceUpdate = false) => {
  const userDocRef = doc(db, `Users/${user.uid}`);
  const userdoc = await getDoc(userDocRef);

  if (userdoc.exists() && !forceUpdate) {
    return userdoc.data();
  } else {
    await setDoc(
      userDocRef,
      {
        username: user.displayName,
        email: user.email,
        role: 'user',
        uid: user.uid,
        createdAt: user.metadata.creationTime,
      },
      { merge: true }
    );
  }
};

const getUserData = async (userId) => {
  const userdoc = await getDoc(doc(db, `Users/${userId}`));
  if (userdoc.exists()) {
    return userdoc.data();
  } else {
    return { error: 'Document data does not exist:' };
  }
};
const getUserClaims = async (forceUpdate) => {
  if (auth.currentUser) {
    return firebaseAuth.getAuth()?.currentUser?.getIdTokenResult(forceUpdate);
  }
};

// ADMIN USER METHODS
const adminRegisterWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = res.user;

    const setAdminClaim = httpsCallable(functions, 'addAdmin');
    setAdminClaim({ userId: user.uid })
      .then((res) => console.log('res' + res))
      .catch((e) => {
        console.log(e);
      });
    firebaseAuth.updateProfile(user, {
      displayName: name,
    });
    refreshToken();
    toast(`Welcome ${name}`, bottomStandard);
    const userDocRef = doc(db, `Users/${user.uid}`);
    const userdoc = await getDoc(userDocRef);

    if (userdoc.exists()) {
      return userdoc.data();
    } else {
      await setDoc(
        userDocRef,
        {
          username: user.displayName,
          email: user.email,
          role: 'admin',
          uid: user.uid,
          createdAt: user.metadata.creationTime,
        },
        { merge: true }
      );
    }

    firebaseAuth.sendEmailVerification(user).then(() => {
      toast.info(`Email Verification Link sent`, bottomStandard);
    });
  } catch (err) {
    console.error(err);
    toast.error(`Failed to Register`, bottomStandard);
  }
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  refreshToken,
  logout,
  getUserData,
  getUserClaims,
  adminRegisterWithEmailAndPassword,
};
