import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEthrbP_CGwDSCVskjMp-X0S89mTLHo-M",
  authDomain: "e-commerce-8882d.firebaseapp.com",
  projectId: "e-commerce-8882d",
  storageBucket: "e-commerce-8882d.appspot.com",
  messagingSenderId: "769065783114",
  appId: "1:769065783114:web:1a7064705e0208244fbbb3"
};


const app = initializeApp(firebaseConfig);
export const database = getAuth(app);