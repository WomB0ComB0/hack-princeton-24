import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { type Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const serviceAccount = {
  type: 'service_account',
  project_id: import.meta.env.VITE_GCP_PROJECT_ID,
  private_key_id: import.meta.env.VITE_GCP_PRIVATE_KEY_ID,
  private_key: import.meta.env.VITE_GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: import.meta.env.VITE_GCP_CLIENT_EMAIL,
  client_id: import.meta.env.VITE_GCP_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: import.meta.env.VITE_GCP_CLIENT_X509_CERT_URL,
  universe_domain: 'googleapis.com',
};

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } else {
    app = getApps()[0]!;
  }

  auth = getAuth(app);
  firestore = getFirestore(app!);

  if (import.meta.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error(`${error instanceof Error ? error.message : error}`);
}

export { auth, app, firestore, serviceAccount };
