import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth" 
import { getFirestore, collection } from "@firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
const bucketUrl = "gs://sinriplayground.appspot.com";

const sinri = {
  id: process.env.REACT_APP_OWNER
}

const app = firebase.initializeApp(firebaseConfig);
const authService = getAuth(app);
const connectDB = getFirestore(app);
const fbStorage = getStorage(app, bucketUrl);
const commentRef = collection(connectDB, "commentHome");
const contentsRef = collection(connectDB, "글");
const footprint = collection(connectDB, "userFootprint")

export { authService, sinri, connectDB, fbStorage, commentRef, footprint, contentsRef };
