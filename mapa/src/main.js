import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'



const app = createApp(App);
app.use(VueGoogleMaps, {
    
    load: {
        key: 'AIzaSyBWLUcztq2pKseTSqJVjqLWRMMtKihD4-U',
    },
}).mount('#app')



//Firebase

/*const functions = require('firebase-functions'); 
const express = require("express")
const test = express()


test.get("/",(req, res)=>{
    res.status(200).send({ data: "wordly hellos" });
});
exports.test = functions.https.onRequest(test);
*/

var admin = require("firebase-admin"); 
admin.initializeApp({ credential: admin.credential.cert("bec98e9646920d6fdf62e9b78527c1f33251e896"), databaseURL: "NodeJs" });

