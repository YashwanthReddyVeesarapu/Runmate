import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// let REACT_APP_FIREBASE_KEY = "AIzaSyBanNTSX4yvX1qqLuYYpsBg4ZMTqxA_h50"
// let REACT_APP_FIREBASE_DOMAIN = "cs554final-141c8.firebaseapp.com"
// let REACT_APP_FIREBASE_DATABASE = "https://cs554final-141c8.firebaseio.com"
// let REACT_APP_FIREBASE_PROJECT_ID = "cs554final-141c8"
// let REACT_APP_FIREBASE_STORAGE_BUCKET = "cs554final-141c8.appspot.com"
// let REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "353020124219"
// let REACT_APP_FIREBASE_APP_ID = "1:353020124219:web:509eb01d529139a383501e"

// const firebaseConfig = {
//   apiKey: "AIzaSyDJric3VSK2HIG3BtXz8THUdglxRHipIPU",
//   authDomain: "runn-mate.firebaseapp.com",
//   projectId: "runn-mate",
//   storageBucket: "runn-mate.appspot.com",
//   messagingSenderId: "944915244191",
//   appId: "1:944915244191:web:9854a08337bc7ad387aeaa",
//   measurementId: "G-XXGZBJ18E6",
// };

// let REACT_APP_FIREBASE_KEY = firebaseConfig.apiKey;
// let REACT_APP_FIREBASE_DOMAIN = firebaseConfig.authDomain;
// let REACT_APP_FIREBASE_PROJECT_ID = firebaseConfig.projectId;
// let REACT_APP_FIREBASE_STORAGE_BUCKET = firebaseConfig.storageBucket;
// let REACT_APP_FIREBASE_MESSAGING_SENDER_ID = firebaseConfig.messagingSenderId;
// let REACT_APP_FIREBASE_APP_ID = firebaseConfig.appId;

let REACT_APP_FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY;
let REACT_APP_FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;
let REACT_APP_FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
let REACT_APP_FIREBASE_STORAGE_BUCKET =
  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
let REACT_APP_FIREBASE_MESSAGING_SENDER_ID =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
let REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

const app = initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

export const auth = getAuth(app);

export default app;
