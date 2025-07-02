
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import axios from 'axios'


// local var
let config = {
    apiKey: "AIzaSyC1W8yvzVmyHTW39CHlQVF0mDtyUI8QxF4",
    authDomain: "wikka-84fb8.firebaseapp.com",
    projectId: "wikka-84fb8",
    storageBucket: "wikka-84fb8.appspot.com",
    messagingSenderId: "865595193804",
    appId: "1:865595193804:web:8b0798f11f274fe1be4569",
    measurementId: "G-22WE9BJ90C"
}

// const getFbConfig = async () => {
//     const options = {
//         method: 'GET',
//         url: 'http://localhost:8000/firebase'
//     }

//     const unsub = await axios.request(options)
//         .then(res => {
//             console.log(res.data)
//             if (res?.data) config = res.data
//         })
// }

// getFbConfig()

// Initialize Firebase
const app = initializeApp(config)
export const auth = getAuth(app)
export const database = getFirestore()
export default app
