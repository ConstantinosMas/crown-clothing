import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, updateDoc, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB_TFXgQ2y9TNVTlMGcdX4oujv5iBO2wik",
    authDomain: "crown-clothing-db-b408b.firebaseapp.com",
    projectId: "crown-clothing-db-b408b",
    storageBucket: "crown-clothing-db-b408b.appspot.com",
    messagingSenderId: "103847428015",
    appId: "1:103847428015:web:ceb11dfbe57c5ed020795a"
};
  

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const saveCartToAuthUser = async (userAuth, userCart) => {
    if (!userAuth) { return; }

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
        try {
            await updateDoc(userDocRef, {
                'userCart': userCart
            });
        } catch(error) {
            console.log(`The following error occured while saving the cart to the user account: ${error.message}`)
        }
    }
};

export const getAuthUserCart = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
        try {
            return userSnapshot.data().userCart;
        } catch(error) {
            console.log(`The following error occured while getting cart data: ${error.message}`)
        }
    }
};

export const favoriteButtonHandler = async (userAuth, productToAdd) => {
    if (!userAuth) { return; }

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    const userFavoritesArray = userSnapshot.data().favorites;

    if (userSnapshot.exists()) {
        const productIsFavorite = userFavoritesArray.find((product) => {return product.id == productToAdd.id});
        if (productIsFavorite) {
            try {
                const newFavsArray = userFavoritesArray.filter((product) => {return product.id !== productToAdd.id});     
                await updateDoc(userDocRef, {
                    'favorites': newFavsArray
                });
                return;
            } catch(error) {
                console.log(`The following error occured while removing product from favorites: ${error.message}`)    
            }

        }

        try {
            await updateDoc(userDocRef, {
                'favorites': [...userFavoritesArray, productToAdd]
            });
        } catch(error) {
            console.log(`The following error occured while adding product to favorites: ${error.message}`)    
        }
    }
};

export const getAuthUserFavorites = async (userAuth) => {
    return;
    // const userDocRef = doc(db, 'users', userAuth.uid);
    // const userSnapshot = await getDoc(userDocRef);

    // if (userSnapshot.exists()) {
    //     try {
    //         return userSnapshot.data().favorites;
    //     } catch(error) {
    //         console.log(`The following error occured while getting favorites data: ${error.message}`)
    //     }
    // }
};

export const saveOrderToDb = async (order) => {
    await addDoc(collection(db, 'orders'), order);
};

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) { return; }

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
                userCart: [],
                favorites: [],
            });
        } catch(error) {
            console.log(`The following error occured while creating the user: ${error.message}`)
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) { return; }

    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) { return; }

    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
}

export const SignOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );

    });
}

export const getUserFavorites = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    return new Promise((resolve, reject) => {
        if (userSnapshot.exists()) {
            const favs = userSnapshot.data().favorites;
            resolve(favs);
        }
    })
    .catch((err) => {   
        console.log(err);
    })
};