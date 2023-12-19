import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyB7-AGhISYoIqCAqt-kkrRkmbWEztH8Mag',
  authDomain: 'instagram-9e637.firebaseapp.com',
  projectId: 'instagram-9e637',
  storageBucket: 'instagram-9e637.appspot.com',
  messagingSenderId: '239770449983',
  appId: '1:239770449983:web:9e983b30c5ca76f425e08a',
};

const firebaseApp = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;


export { firebaseApp, FieldValue };
