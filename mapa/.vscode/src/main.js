import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { initializeApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const app = createApp(App);
app.use(VueGoogleMaps, {
    
    load: {
        key: 'AIzaSyBWLUcztq2pKseTSqJVjqLWRMMtKihD4-U',
    },
}).mount('#app')









var admin = require("firebase-admin"); 
admin.initializeApp({ credential: admin.credential.cert("bec98e9646920d6fdf62e9b78527c1f33251e896"), databaseURL: "NodeJs" });

