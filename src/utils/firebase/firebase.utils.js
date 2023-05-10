import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB_TFXgQ2y9TNVTlMGcdX4oujv5iBO2wik",
    authDomain: "crown-clothing-db-b408b.firebaseapp.com",
    projectId: "crown-clothing-db-b408b",
    storageBucket: "crown-clothing-db-b408b.appspot.com",
    messagingSenderId: "103847428015",
    appId: "1:103847428015:web:ceb11dfbe57c5ed020795a"
  };
  

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log(`The following error occured while creating the user: ${error.message}`)
        }
    }

    return userDocRef;
}