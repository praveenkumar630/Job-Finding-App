// Import the functions you need from the SDKs you need
//  import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJF31_ZNWWZnT8jbtiK_qv3cvFm2qvMtM",
    authDomain: "jobfindingapp-92a44.firebaseapp.com",
    projectId: "jobfindingapp-92a44",
    storageBucket: "jobfindingapp-92a44.appspot.com",
    messagingSenderId: "1091957041591",
    appId: "1:1091957041591:web:bf12c44d61a5d792542032",
    measurementId: "G-GGQL126BPZ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig); 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };