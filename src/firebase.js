import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDnWp4ckNGEZEJx5LKOFF-0QZFw9CviUlw",
    authDomain: "slack-clone-389c1.firebaseapp.com",
    projectId: "slack-clone-389c1",
    storageBucket: "slack-clone-389c1.appspot.com",
    messagingSenderId: "883260424543",
    appId: "1:883260424543:web:7d65f8a981a314569df6ea",
    measurementId: "G-48MMW0RWD6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // connects everything
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;