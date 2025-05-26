import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyATt6sXIJ9hHjGNDYCMZJQrWhuMmMAKYuc",
  authDomain: "personafied-33f7c.firebaseapp.com",
  projectId: "personafied-33f7c",
  storageBucket: "personafied-33f7c.firebasestorage.app",
  messagingSenderId: "300597609576",
  appId: "1:300597609576:web:5ff9dff488dce062c227dd"
};


const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, googleProvider, db};


