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
  