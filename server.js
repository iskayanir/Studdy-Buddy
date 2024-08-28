
// const { initializeApp } = require("firebase/app");
// const { getDatabase, ref, onValue, query, orderByChild, equalTo, get } = require("firebase/database");

// const firebaseConfig = {
//     apiKey: "AIzaSyBca6BVRgwMO3XJ_gVIn2DK3uHxj7bnHms",
//     authDomain: "study-buddy-d457d.firebaseapp.com",
//     databaseURL: "https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "study-buddy-d457d",
//     storageBucket: "study-buddy-d457d.appspot.com",
//     messagingSenderId: "254149753908",
//     appId: "1:254149753908:web:04ccb86462b3ee2d815e61",
//     measurementId: "G-G9L8WVHF1X",
//   };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// module.exports = database;


//
require('dotenv').config();
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;

// שאר הקוד ב-server.js נשאר כפי שהוא


//



const db = getDatabase();
// const starCountRef = ref(db, 'studentsReceivingHelp');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data)
// });



const port = 3000;
const express = require('express');
const server = express();
const path = require('path'); // הוסף את השורה הזו

server.get('getStudents', async (req, res) => {
  const starCountRef = ref(db, 'student/studentsReceivingHelp');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  res.json(data);

});
});




server.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});



server.get('/searchEmail/:email', (req, res) => {
    console.log("Search email route hit with email:", req.params.email);
    
    res.send("This is a simple text response.");
});




server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

server.get('/search_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search_page.html'));
});

server.get('/seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seller.html'));
});

server.get('/buyer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
});

server.get('/buyer_profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buyer_profile.html'));
});

server.get('/seller_profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seller_profile.html'));
});