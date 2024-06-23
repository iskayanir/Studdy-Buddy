
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuring Passport
passport.use(new GoogleStrategy({
    clientID: '1085756530979-gs6lh3igb62qi666c1v3uk4p6kopc83e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      // כאן ניתן לשמור את פרטי המשתמש למסד נתונים
      return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Middleware
app.use(session({ secret: 'random_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/search_page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search_page.html'));
});

app.get('/seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seller.html'));
});

app.get('/buyer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
});

app.get('/buyer_profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'buyer_profile.html'));
});

app.get('/seller_profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seller_profile.html'));
});

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});





// const express = require('express');
// const path = require('path');
// const app = express();

// const port = process.env.PORT || 3000;

// // Serve static files from the root directory
// app.use(express.static(path.join(__dirname)));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on http://0.0.0.0:${port}`);
// });


// function handle(request, response) {
//   let path = request.path;
//   console.log("Received request: " + path);
//   if (path === '/') path = 'index.html';
//   getFile(path).subscribe(file => {
//     response.sendFile(file);
//   }, err => {
//     response.sendText('Page not found. Perhaps the filename is wrong?');
//   });
// }



// console.log('Server is running');



// const wakka = require('wakka');
// const path = require('path');

// const app = wakka();

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, 'styles.css'));
// });

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'home.html'));
// });

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });