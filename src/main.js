import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5LfWf5wNa2Ws1a8zEPiwa3akZYIs0IH4",
  authDomain: "loginsystem-11c24.firebaseapp.com",
  projectId: "loginsystem-11c24",
  storageBucket: "loginsystem-11c24.appspot.com",
  messagingSenderId: "837975237951",
  appId: "1:837975237951:web:e0600403f3c6ff882b1f8a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
