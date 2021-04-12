import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRqAxeD7kPmfWD7AZPLt9z-lnmcXej4vs",
  authDomain: "tenedores-20721.firebaseapp.com",
  projectId: "tenedores-20721",
  storageBucket: "tenedores-20721.appspot.com",
  messagingSenderId: "602929243524",
  appId: "1:602929243524:web:c7283a0d0a527a30e669d1",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
