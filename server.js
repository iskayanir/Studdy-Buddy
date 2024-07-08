

// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// const path = require('path');
// const { initializeApp } = require("firebase/app");
// const { getDatabase, ref, get, child } = require("firebase/database");

// // const app = express();
// const PORT = process.env.PORT || 3000;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getDatabase, ref, get, child} from 'firebase/database';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBca6BVRgwMO3XJ_gVIn2DK3uHxj7bnHms",
//   authDomain: "study-buddy-d457d.firebaseapp.com",
//   databaseURL: "https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "study-buddy-d457d",
//   storageBucket: "study-buddy-d457d.appspot.com",
//   messagingSenderId: "254149753908",
//   appId: "1:254149753908:web:04ccb86462b3ee2d815e61",
//   measurementId: "G-G9L8WVHF1X",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app);


// "student_1": {
//   "name": "יונתן כהן",
//   "degree": "מדעי המחשב",
//   "year": 2,
//   "courses": [
//   ],
//   "bio": "סטודנט לתואר ראשון במדעי המחשב עם התעניינות מיוחדת באלגוריתמים ומערכות מבוזרות. משתתף בפרויקטים חיצוניים ומשתדל לשלב לימודים עם עבודה בתחום.",
//   "hobbies": [

//   ],
//   "contact": {
//     "phone": "050-1234567",
//     "email": "yonatan@example.com"
//   }
// },

// // פונקציה לדוגמא להוספת נתונים ל-Firebase Realtime Database
// function writeUserData(userId, name, degree,year, courses, bio, hobbies, contact ) {
//   set(ref(database, 'users/' + userId), {
//     username: name,
//     email: email
//   });
// }

// // פונקציה לדוגמא לקריאת נתונים מ-Firebase Realtime Database
// function readUserData(userId) {
//   const dbRef = ref(database);
//   get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// }

// // דוגמאות לשימוש בפונקציות
// writeUserData('1', 'John Doe', 'john.doe@example.com');
// readUserData('1');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

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
  const starCountRef = ref(db, 'studentsReceivingHelp');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  res.json(data);

});
});




 server.use(express.static(path.join(__dirname, 'public')));

 server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// server.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//   server.get('/try', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'try.html'));
//   });


// server.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// server.get('/buyer_search_page', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'buyer_search_page.html'));
// });

// server.get('/seller_search_page', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'seller_search_page.html'));
// });

// server.get('/seller', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'seller.html'));
// });

// server.get('/buyer', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
// });

// server.get('/buyer_profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'buyer_profile.html'));
// });

// server.get('/seller_profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'seller_profile.html'));
// });

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
  

// const express = require('express');
// const database = require('./public/js/firebase-app'); // ודא שהנתיב נכון
// const path = require('path');
// const server = express();
// const port = 3000;

// server.get('/data', async (req, res) => {
//   const dbRef = database.ref('students/studentsReceivingHelp');
//   try {
//     const snapshot = await dbRef.get();
//     if (snapshot.exists()) {
//       res.json(snapshot.val());
//     } else {
//       res.status(404).json({error: "No data available"});
//     }
//   } catch (error) {
//     res.status(500).json({error: error.message});
//   }
// });



// const fs = require('fs');
// const bodyParser = require('body-parser'); // יש להתקין אם אינו מותקן: npm install body-parser

// server.use(bodyParser.json()); // עבור פרסינג של JSON מבקשות POST

// server.post('/save-profile', (req, res) => {
//   const userData = req.body; // מקבל את הנתונים מהצד לקוח

//   // קריאה מקובץ ה-JSON
//   fs.readFile('./students.json', 'utf8', (err, data) => {
//       if (err) {
//           console.error(err);
//           res.status(500).send("Error reading file.");
//           return;
//       }

//       const students = JSON.parse(data);
//       // הוספת משתמש חדש - יש להגדיר מפתח ייחודי
//       students.students[`student_${Object.keys(students.students).length + 1}`] = userData;

//       // כתיבה חזרה לקובץ
//       fs.writeFile('./students.json', JSON.stringify(students, null, 2), 'utf8', (err) => {
//           if (err) {
//               console.error(err);
//               res.status(500).send("Error writing file.");
//               return;
//           }
//           res.send("Profile saved successfully.");
//       });
//   });
// });




// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);

// module.exports = { database };

// // Configuring Passport
// passport.use(new GoogleStrategy({
//     clientID: '1085756530979-gs6lh3igb62qi666c1v3uk4p6kopc83e.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'http://localhost:3000/auth/google/callback'
//   },
//   function(accessToken, refreshToken, profile, done) {
//       // כאן ניתן לשמור את פרטי המשתמש למסד נתונים
//       return done(null, profile);
//   }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });



// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// // Middleware
// app.use(session({ secret: 'random_secret_key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });



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







// // Test route to read data from Firebase
// app.get('/test', (req, res) => {
//   const dbRef = ref(database);
//   get(child(dbRef, test)).then((snapshot) => {
//     if (snapshot.exists()) {
//       res.send(snapshot.val());
//     } else {
//       res.send('No data available');
//     }
//   }).catch((error) => {
//     res.status(500).send('Failed to read data: ' + error);
//   });
// });



// app.get('/api/students', async (req, res) => {
//   try {
//     const studentsReceivingHelpRef = ref(database, 'studentsReceivingHelp');
//     const studentsProvidingHelpRef = ref(database, 'studentsProvidingHelp');
    
//     const [receivingSnapshot, providingSnapshot] = await Promise.all([
//       get(studentsReceivingHelpRef),
//       get(studentsProvidingHelpRef)
//     ]);

//     if (receivingSnapshot.exists() && providingSnapshot.exists()) {
//       const studentsReceivingHelp = receivingSnapshot.val();
//       const studentsProvidingHelp = providingSnapshot.val();
      
//       console.log("Students Receiving Help:", studentsReceivingHelp); // לוגים לבדיקת הנתונים
//       console.log("Students Providing Help:", studentsProvidingHelp); // לוגים לבדיקת הנתונים
      
//       res.json({
//         studentsReceivingHelp,
//         studentsProvidingHelp
//       });
//     } else {
//       res.status(404).json({ error: "No data available" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Serving on port ${PORT}`);
// });