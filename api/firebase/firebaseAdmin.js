import admin from "firebase-admin";
import dotenv from 'dotenv';
dotenv.config();
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId:process.env.FIREBASE_PROJECT_ID,
    privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail:process.env.FIREBASE_PRIVATE_KEY,
  }),
}); 

export default firebaseApp; 
