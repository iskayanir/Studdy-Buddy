// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-auth-domain",
//     databaseURL: "your-database-url",
//     projectId: "your-project-id",
//     storageBucket: "your-storage-bucket",
//     messagingSenderId: "your-messaging-sender-id",
//     appId: "your-app-id",
//     measurementId: "your-measurement-id",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// function displayData() {
//     const dbRef = ref(database);

//     // Fetching the students receiving help
//     get(child(dbRef, 'studentsReceivingHelp')).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const container = document.getElementById('studentsReceivingHelp');
//             container.innerHTML = ""; // Clear existing content
//             Object.values(data).forEach(student => {
//                 container.innerHTML += `<p>Name: ${student.name} - Year: ${student.year}</p>`;
//             });
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });

//     // Fetching the students providing help
//     get(child(dbRef, 'studentsProvidingHelp')).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const container = document.getElementById('studentsProvidingHelp');
//             container.innerHTML = ""; // Clear existing content
//             Object.values(data).forEach(student => {
//                 container.innerHTML += `<p>Name: ${student.name} - Year: ${student.year}</p>`;
//             });
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
// }

// // Call the function to display data on load
// document.addEventListener('DOMContentLoaded', displayData);


const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyBca6BVRgwMO3XJ_gVIn2DK3uHxj7bnHms",
    authDomain: "study-buddy-d457d.firebaseapp.com",
    databaseURL: "https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "study-buddy-d457d",
    storageBucket: "study-buddy-d457d.appspot.com",
    messagingSenderId: "254149753908",
    appId: "1:254149753908:web:04ccb86462b3ee2d815e61",
    measurementId: "G-G9L8WVHF1X",
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/search_page', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'search_page.html'));
// });

// app.get('/seller', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'seller.html'));
// });

// app.get('/buyer', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
// });

// app.get('/buyer_profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'buyer_profile.html'));
// });

// app.get('/seller_profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'seller_profile.html'));
// });