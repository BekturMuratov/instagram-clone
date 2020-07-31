import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB-Knwg8Pv19ubQ9_9YJJoTNpB-XGmqnH8",
    authDomain: "instagram-clone-react-6b3a5.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-6b3a5.firebaseio.com",
    projectId: "instagram-clone-react-6b3a5",
    storageBucket: "instagram-clone-react-6b3a5.appspot.com",
    messagingSenderId: "481581800832",
    appId: "1:481581800832:web:b53d83ba4737c1e435f565",
    measurementId: "G-NK27KT5472"
})

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();



// const firebaseConfig = {
//     apiKey: "AIzaSyB-Knwg8Pv19ubQ9_9YJJoTNpB-XGmqnH8",
//     authDomain: "instagram-clone-react-6b3a5.firebaseapp.com",
//     databaseURL: "https://instagram-clone-react-6b3a5.firebaseio.com",
//     projectId: "instagram-clone-react-6b3a5",
//     storageBucket: "instagram-clone-react-6b3a5.appspot.com",
//     messagingSenderId: "481581800832",
//     appId: "1:481581800832:web:b53d83ba4737c1e435f565",
//     measurementId: "G-NK27KT5472"
//   };

// export default db;
