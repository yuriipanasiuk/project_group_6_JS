import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const userDisplayName = document.querySelector(".display-name")
const signIn = document.querySelector('[data-sign-in]')
const logout = document.querySelector('[data-sign-out]')

// -----------------------------------------------------------------------------
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8JosctUlnHoYDhx27o-9K5qjoYQVd5I0",
  authDomain: "filmoteka-29879.firebaseapp.com",
  projectId: "filmoteka-29879",
  storageBucket: "filmoteka-29879.appspot.com",
  messagingSenderId: "472506073059",
  appId: "1:472506073059:web:2595b335e9952e9d2bead6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();


function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}


export const userAuth = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export const signOutUser = () => {
  signOut(auth).then(() => {
      signIn.classList.toggle("is-hidden")
      logout.parentNode.classList.toggle("is-hidden")
        //Sigh-out successfull.
    }).catch(() => {
        // An error happened.
    })
};

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("user", user)
    userDisplayName.innerHTML = user.displayName
    signIn.classList.toggle("is-hidden")
    logout.parentNode.classList.toggle("is-hidden")
  }

})



























// -----


signIn.addEventListener('click', () => {
  userAuth()
})

logout.addEventListener('click', () => {
  signOutUser()
  userDisplayName.innerHTML = null
})