import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC_aMLgoKzIt7c_7lJ69oheV0Ril2GrS4",
  authDomain: "whatsapp-clone-b26b2.firebaseapp.com",
  projectId: "whatsapp-clone-b26b2",
  storageBucket: "whatsapp-clone-b26b2.appspot.com",
  messagingSenderId: "314501382440",
  appId: "1:314501382440:web:0781bec83932712515501d",
  measurementId: "G-K1LCT5C5D5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db