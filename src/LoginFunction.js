import firebase from "firebase/app";
import "firebase/auth";
import dotenv from 'dotenv'
dotenv.config()



const Login = (setUser) => {
    const firebaseConfig = {
        apiKey: "AIzaSyDYKT4i-17UPlgaiojouyHNv1sA_svhkjM",
        authDomain: "you-rule-iot.firebaseapp.com",
        projectId: "you-rule-iot",
        storageBucket: "you-rule-iot.appspot.com",
        messagingSenderId: "645027876603",
        appId: "1:645027876603:web:2bfb86a6f5eb91b19d6a5e"
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

