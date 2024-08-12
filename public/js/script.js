// document.addEventListener("DOMContentLoaded", () => {
//     fetch('/api/students')
//       .then(response => response.json())
//       .then(data => {
//         if (data.error) {
//           console.error(data.error);
//         } else {
//           displayStudents(data.studentsReceivingHelp, data.studentsProvidingHelp);
//         }
//       })
//       .catch(error => console.error("Error fetching data:", error));
//   });


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



//   window.onload = function() {
//     document.getElementById('displayName').textContent = localStorage.getItem('name');
//     document.getElementById('displayDegree').textContent = localStorage.getItem('degree');
//     document.getElementById('displayYear').textContent = localStorage.getItem('year');
//     document.getElementById('displayCourses').textContent = localStorage.getItem('courses');
//     document.getElementById('displayAboutMe').textContent = localStorage.getItem('aboutMe');
//     document.getElementById('displayHobbies').textContent = localStorage.getItem('hobbies');
//     document.getElementById('displayPhoneNumber').textContent = localStorage.getItem('phoneNumber');
//     document.getElementById('displayEmail').textContent = localStorage.getItem('email');
//     // טען והצג נתונים נוספים בדומה לדוגמאות שלעיל
// };

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
  // if (document.getElementById('displayCourses')) {
  //   document.getElementById('displayCourses').textContent = localStorage.getItem('courses');
  // }
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
  const profilePicture = document.getElementById('profilePicture');
  const profilePictureInput = document.getElementById('profilePictureInput');
  const defaultImageSrc = 'path/to/default-profile-picture.png'; // Set this to your default image path

  profilePicture.addEventListener('click', function() {
    profilePictureInput.click();
  });

  profilePictureInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePicture.src = e.target.result;
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
  }
}

document.addEventListener('DOMContentLoaded', setupProfilePictureUpload);





function editProfileData() {
  const type = localStorage.getItem('userType');
  const id = localStorage.getItem('GlobalStudentID'); // או כל משתנה אחר ששומר את ה-ID

  console.log(type + " סוג סטודנט ה");
  console.log(id + " ID סטודנט ה");

  const name = document.getElementById('name').value;
  const degree = document.getElementById('degree').value;
  const year = document.getElementById('year').value;
  const mail = document.getElementById('email').value;
  const tel = document.getElementById('number').value;
  const aboutme = document.getElementById('aboutme').value;
  const hobbies = document.getElementById('hobbies').value;

  // יצירת אובייקט עם הנתונים החדשים
  let updatedStudent = {
      name: name,
      degree: degree,
      mail: mail,
      tel: tel,
      year: year,
      aboutme: aboutme,
      hobbies: hobbies
  };

  // עדכון הנתונים בפיירבייס
  fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${id}.json`, {
      method: 'PUT', // השתמש ב-PUT כדי לעדכן את הרשומה הקיימת
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudent)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Profile updated successfully:', data);
      // מעבר לעמוד הבא לאחר עדכון הפרטים
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
                  // הצגת המידע בטפסים השונים
                  document.getElementById('name').value = data.name || '';
                  document.getElementById('degree').value = data.degree || '';
                  document.getElementById('year').value = data.year || '';
                  document.getElementById('number').value = data.tel || '';
                  document.getElementById('email').value = data.mail || '';
                  document.getElementById('aboutme').value = data.aboutme || '';
                  document.getElementById('hobbies').value = data.hobbies || '';

                  // עדכון תמונת הפרופיל במידה וקיימת
                  if (data.imageUrl) {
                      document.getElementById('profilePicture').src = data.imageUrl;
                  }
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
