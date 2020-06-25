import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyCQntFJ4QWtkSFDItQ4EcPne4Pv9gMTvIg",
    authDomain: "pacov-movement-c8e1b.firebaseapp.com",
    databaseURL: "https://pacov-movement-c8e1b.firebaseio.com",
    projectId: "pacov-movement-c8e1b",
    storageBucket: "pacov-movement-c8e1b.appspot.com",
    messagingSenderId: "794245407296",
    appId: "1:794245407296:web:f8c41f5feac54fc5cbb5a5"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export {
    fire
};