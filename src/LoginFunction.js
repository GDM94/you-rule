import firebase from "firebase/app";
import "firebase/auth";
import dotenv from 'dotenv'
dotenv.config()



const Login = (setUser) => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
      };

    
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user_name = result.user["displayName"];
            var idToken = result.credential['idToken'];
            setUser(user_name, idToken);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });

}

export default Login;

