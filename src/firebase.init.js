// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLneFO21i_gs39fPfdUdbMHKljsOljngw",
  authDomain: "email-password-auth-641e5.firebaseapp.com",
  projectId: "email-password-auth-641e5",
  storageBucket: "email-password-auth-641e5.firebasestorage.app",
  messagingSenderId: "78214376753",
  appId: "1:78214376753:web:cea914115178d44f1c9410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth