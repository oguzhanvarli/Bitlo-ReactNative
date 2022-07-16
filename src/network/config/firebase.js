
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';


const firebaseConfig = {
  apiKey: "AIzaSyD6_OW0lou3TMtpNoGv1jTOn8lJ5OIQx5k",
  authDomain: "native-auth-67897.firebaseapp.com",
  projectId: "native-auth-67897",
  storageBucket: "native-auth-67897.appspot.com",
  messagingSenderId: "538299676456",
  appId: "1:538299676456:web:6749bf632b7bcdbe57421d"
};

const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app)
// export default app

//using this because of react native AsyncStorage warning.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };