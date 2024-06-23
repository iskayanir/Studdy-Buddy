// This is an example server.
// To run it, right click server.js and select run.

function handle(request, response) {
  let path = request.path;
  console.log("Received request: " + path);
  if (path === '/') path = 'index.html';
  getFile(path).subscribe(file => {
    response.sendFile(file);
  }, err => {
    response.sendText('Page not found. Perhaps the filename is wrong?');
  });
}



console.log('Server is running');



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