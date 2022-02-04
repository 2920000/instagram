import { initializeApp } from "firebase/app";
import { getFirestore} from  'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmaneqSLGckPryYXff73UAsgIFuz3zb04",
  authDomain: "instagram-c9761.firebaseapp.com",
  projectId: "instagram-c9761",
  storageBucket: "instagram-c9761.appspot.com",
  messagingSenderId: "364066455711",
  appId: "1:364066455711:web:531482667eaf8ec154e2aa"
};

export const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
const storage=getStorage(app)
export {db,storage}