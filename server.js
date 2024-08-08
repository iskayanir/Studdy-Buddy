

// // דוגמאות לשימוש בפונקציות
// writeUserData('1', 'John Doe', 'john.doe@example.com');
// readUserData('1');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue, query, orderByChild, equalTo, get } = require("firebase/database");

// const { getDatabase, ref, onValue } = require("firebase/database");

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

// server.get('addStudent', async (req, res) => {
//     const starCountRef = ref(db, 'student/studentsReceivingHelp');
//   onValue(starCountRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data)
//     res.json(data);
  
//   });
//   });






server.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});


// // מסלול לבדיקה אם סטודנט נמצא ב-database
// server.get('/getStudent/{studentId}', async (req, res) => {
//     const studentId = req.params.id;
//     const db = getDatabase();
//     const studentRef = ref(db, `student/studentsReceivingHelp/${studentId}`);
  
//     try {
//       const snapshot = await get(studentRef);
//       if (snapshot.exists()) {
//         res.json({ exists: true, data: snapshot.val() });
//       } else {
//         res.json({ exists: false });
//       }
//     } catch (error) {
//       console.error("Error reading data: ", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

// פונקציה לחיפוש כתובת מייל בדאטאבייס
// server.get('/searchEmail/:email', async (req, res) => {
//     console.log("jnjkk")
//     const email = req.params.email;
  
//     // חיפוש ברשימת מקבלי העזרה
//     const receivingHelpRef = ref(db, 'student/studentsReceivingHelp');
//     const receivingHelpQuery = query(receivingHelpRef, orderByChild('contact/email'), equalTo(email));
  
//     // חיפוש ברשימת נותני העזרה
//     const providingHelpRef = ref(db, 'student/studentsProvidingHelp');
//     const providingHelpQuery = query(providingHelpRef, orderByChild('contact/email'), equalTo(email));
  
//     try {
//       const receivingHelpSnapshot = await get(receivingHelpQuery);
//       const providingHelpSnapshot = await get(providingHelpQuery);
  
//       if (receivingHelpSnapshot.exists()) {
//         const data = receivingHelpSnapshot.val();
//         res.json({ exists: true, data, type: 'receivingHelp' });
//       } else if (providingHelpSnapshot.exists()) {
//         const data = providingHelpSnapshot.val();
//         res.json({ exists: true, data, type: 'providingHelp' });
//       } else {
//         res.json({ exists: false });
//       }
//     } catch (error) {
//       console.error("Error reading data: ", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

server.get('/searchEmail/:email', (req, res) => {
    console.log("Search email route hit with email:", req.params.email);
    
    res.send("This is a simple text response.");
});




//   server.get('/searchEmail/:email', async (req, res) => {
//     console.log("Search email route hit with email:", req.params.email);
//     const email = req.params.email;

//     try {
//         // חיפוש ברשימת מקבלי העזרה
//         const receivingHelpRef = ref(db, 'student/studentsReceivingHelp');
//         const providingHelpRef = ref(db, 'student/studentsProvidingHelp');

//         const receivingHelpSnapshot = await get(receivingHelpRef);
//         const providingHelpSnapshot = await get(providingHelpRef);

//         let data = null;
//         let type = null;

//         // חיפוש ברשימת מקבלי העזרה
//         if (receivingHelpSnapshot.exists()) {
//             const students = receivingHelpSnapshot.val();
//             for (const key in students) {
//                 if (students[key].contact.email === email) {
//                     data = students[key];
//                     type = 'receivingHelp';
//                     break;
//                 }
//             }
//         }

//         // חיפוש ברשימת נותני העזרה אם לא נמצא ב-ReceivingHelp
//         if (!data && providingHelpSnapshot.exists()) {
//             const students = providingHelpSnapshot.val();
//             for (const key in students) {
//                 if (students[key].contact.email === email) {
//                     data = students[key];
//                     type = 'providingHelp';
//                     break;
//                 }
//             }
//         }

//         if (data) {
//             res.json({ exists: true, data, type });
//         } else {
//             res.json({ exists: false });
//         }
//     } catch (error) {
//         console.error("Error reading data:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));



server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// server.post('/saveUser', async (req, res) => {
//     const { userId, name, email, type } = req.body;
//     const userRef = ref(database, `student/${type}/${userId}`);
//     await set(userRef, { name, email });
//     res.sendStatus(200);
// });

// server.get('/checkUser', async (req, res) => {
//     const { studentId } = req.query;
//     console.log(`userId: ${userId}`);
//     const userProvidingRef = ref(db, `student/studentsProvidingHelp/${studentId}`);
//     const userReceivingRef = ref(db, `student/studentsReceivingHelp/${studentId}`);
//     const snapshotProviding = await get(userProvidingRef);
//     const snapshotReceiving = await get(userReceivingRef);

//     const exists = snapshotProviding.exists() || snapshotReceiving.exists();
//     const type = snapshotProviding.exists() ? 'studentsProvidingHelp' : 'studentsReceivingHelp';
//     res.json({ exists, type });
// });

// server.get('/getUser', async (req, res) => {
//     const { userId, type } = req.query;
//     const userRef = ref(database, `student/${type}/${userId}`);
//     const snapshot = await get(userRef);
//     const userData = snapshot.val();
//     res.json(userData);
// });



//  server.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });






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