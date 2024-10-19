// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6x8Un000aoi3U5I2RB2m3S0J3lU0W8kc",
  authDomain: "voyagevista-cfdc9.firebaseapp.com",
  projectId: "voyagevista-cfdc9",
  storageBucket: "voyagevista-cfdc9.appspot.com",
  messagingSenderId: "640328785523",
  appId: "1:640328785523:web:84365b03208d629ff6d406",
  measurementId: "G-R5M7KM4DRQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);