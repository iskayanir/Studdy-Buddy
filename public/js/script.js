function displayStudents(receivingHelp, providingHelp) {
  const receivingContainer = document.getElementById('receiving-help');
  const providingContainer = document.getElementById('providing-help');

  // Clear previous content
  receivingContainer.innerHTML = '';
  providingContainer.innerHTML = '';

  // Display students receiving help
  for (const key in receivingHelp) {
    if (receivingHelp.hasOwnProperty(key)) {
      const student = receivingHelp[key];
      const studentDiv = document.createElement('div');
      studentDiv.classList.add('student');
      studentDiv.innerHTML = `
        <h3>${student.name}</h3>
        <p>Degree: ${student.degree}</p>
        <p>Year: ${student.year}</p>
        <p>Bio: ${student.bio}</p>
        <p>Hobbies: ${student.hobbies.join(', ')}</p>
        <p>Contact: ${student.contact.phone}, ${student.contact.email}</p>
      `;
      receivingContainer.appendChild(studentDiv);
    }
  }

  // Display students providing help
  for (const key in providingHelp) {
    if (providingHelp.hasOwnProperty(key)) {
      const student = providingHelp[key];
      const studentDiv = document.createElement('div');
      studentDiv.classList.add('student');
      studentDiv.innerHTML = `
        <h3>${student.name}</h3>
        <p>Degree: ${student.degree}</p>
        <p>Year: ${student.year}</p>
        <p>Bio: ${student.bio}</p>
        <p>Hobbies: ${student.hobbies.join(', ')}</p>
        <p>Contact: ${student.contact.phone}, ${student.contact.email}</p>
        <p>Academic Experience: ${student.academicExperience}</p>
      `;
      providingContainer.appendChild(studentDiv);
    }
  }
}


function saveProfileData() {

  const name = document.getElementById('name').value;
  const degree = document.getElementById('degree').value;
  const year = document.getElementById('year').value;
  // const courses = document.getElementById('course-search').value;
  const aboutMe = document.getElementById('aboutme').value;
  const hobbies = document.getElementById('hobbies').value;
  const phoneNumber = document.getElementById('number').value;
  const email = document.getElementById('email').value;

  // Save data to localStorage
  localStorage.setItem('name', name);
  localStorage.setItem('degree', degree);
  localStorage.setItem('year', year);
  // localStorage.setItem('courses', courses);
  localStorage.setItem('aboutMe', aboutMe);
  localStorage.setItem('hobbies', hobbies);
  localStorage.setItem('phoneNumber', phoneNumber);
  localStorage.setItem('email', email);

console.log(name)
}


window.onload = function() {
if (document.getElementById('displayName')) {
  document.getElementById('displayName').textContent = localStorage.getItem('name');
}
if (document.getElementById('displayDegree')) {
  document.getElementById('displayDegree').textContent = localStorage.getItem('degree');
}
if (document.getElementById('displayYear')) {
  document.getElementById('displayYear').textContent = localStorage.getItem('year');
}

if (document.getElementById('displayAboutMe')) {
  document.getElementById('displayAboutMe').textContent = localStorage.getItem('aboutMe');
}
if (document.getElementById('displayHobbies')) {
  document.getElementById('displayHobbies').textContent = localStorage.getItem('hobbies');
}
if (document.getElementById('displayPhoneNumber')) {
  document.getElementById('displayPhoneNumber').textContent = localStorage.getItem('phoneNumber');
}
if (document.getElementById('displayEmail')) {
  document.getElementById('displayEmail').textContent = localStorage.getItem('email');
}
};


function setupProfilePictureUpload() {
  const profilePictureContainer = document.querySelector('.profile_picture_container');
  const profilePicture = document.getElementById('profilePicture');
  const profilePictureInput = document.getElementById('profilePictureInput');
  const defaultImageSrc = 'images/prof.jpeg'; // Set this to your default image path

  profilePictureContainer.addEventListener('click', function() {
      profilePictureInput.click();
  });

  profilePictureInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const photoUrl = e.target.result; // Save the base64 image URL in a variable
              profilePicture.src = photoUrl; // Update the profile picture preview
              
              const type = localStorage.getItem('userType');
              const studentId = localStorage.getItem('GlobalStudentID');

              if (type && studentId) {
                  const updateUrl = `https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`;
                  fetch(updateUrl, {
                      method: 'PATCH', // Use PATCH to update only the 'image' field
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ image: photoUrl }), // Update the 'image' field with the base64 image URL
                  })
                  .then(response => {
                      if (response.ok) {
                          console.log('Photo uploaded and saved to Firebase successfully.');
                      } else {
                          console.error('Failed to update Firebase with the photo.');
                      }
                  })
                  .catch(error => {
                      console.error('Error updating Firebase:', error);
                  });
              } else {
                  console.error('User type or student ID not found in localStorage.');
              }
          };
          reader.readAsDataURL(file);
      } else {
          // If no file is selected (user cancels the upload), revert to default image
          profilePicture.src = defaultImageSrc;
      }
  });

  // Function to reset to default image
  window.resetProfilePicture = function() {
      profilePicture.src = defaultImageSrc;
  };
}


document.addEventListener('DOMContentLoaded', setupProfilePictureUpload);


function editProfileData1() {
  const type = localStorage.getItem('userType');
  console.log(type)
  const id = localStorage.getItem('GlobalStudentID');
  console.log(id)
  const userdata = JSON.parse(localStorage.getItem('userData'));
  const currentImageSrc = document.getElementById('profilePicture').src;
  
  // שימוש בתמונה המוצגת כרגע, אלא אם כן מדובר בתמונת ברירת מחדל
  const picture = currentImageSrc !== 'images/prof.jpeg' ? currentImageSrc : userdata.imageUrl;

  const name = document.getElementById('name').value || '';
  const degree = document.getElementById('degree').value || '';
  const year = document.getElementById('year').value || '';
  const mail = document.getElementById('email').value || '';
  const tel = document.getElementById('number').value || '';
  const aboutme = document.getElementById('aboutme').value || '';
  const hobbies = document.getElementById('hobbies').value || '';

  // יצירת אובייקט עם הנתונים המעודכנים
  let updatedStudent = {
      name: name,
      degree: degree,
      mail: mail,
      tel: tel,
      year: year,
      aboutme: aboutme,
      hobbies: hobbies,
      image: picture // וודא שהתמונה הנוכחית נשמרת
  };

  // עדכון הנתונים בפיירבייס
  fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${id}.json`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudent)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Profile updated successfully:', data);
      // עדכון הנתונים ב-Local Storage
      localStorage.setItem('userData', JSON.stringify(updatedStudent));
      // מעבר לעמוד הפרופיל לאחר עדכון הפרטים
      window.location.href = 'profile.html';
  })
  .catch(error => {
      console.error('Error updating profile:', error);
  });
}


function loadProfileDatafromFB() {
var type = localStorage.getItem('userType');
console.log(type);

var studentId = localStorage.getItem('GlobalStudentID');
console.log(studentId);

if (studentId && type) {
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
              console.log(data.image)
                // הצגת המידע בטפסים השונים
                document.getElementById('name').value = data.name || '';
                document.getElementById('degree').value = data.degree || '';
                document.getElementById('year').value = data.year || '';
                document.getElementById('number').value = data.tel || '';
                document.getElementById('email').value = data.mail || '';
                document.getElementById('aboutme').value = data.aboutme || '';
                document.getElementById('hobbies').value = data.hobbies || '';

                // עדכון ה-src של תמונת הפרופיל
                document.getElementById('profilePicture').src = data.image || 'images/prof.jpeg';

               
            } else {
                console.error('User data not found');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
} else {
    console.log('No user ID found in LocalStorage or userType is missing.');
}
}
