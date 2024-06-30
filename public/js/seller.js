
// import buyers_students from './seller-profile.js';
import { buyers_students, seller_students } from './seller-profile.js';
const requestedHelpTopics = [
    {
      id: 1,
      topic: "אלגברה",
      description: "עזרה בפתרון משוואות",
      studentId: 101 // מזהה הסטודנט שביקש את העזרה
    },
    {
      id: 2,
      topic: "פיזיקה",
      description: "הבנת חוקי ניוטון",
      studentId: 102
    },
    {
      id: 3,
      topic: "כימיה",
      description: "עזרה בכימיה אורגנית",
      studentId: 103
    }
];

const lessonSummaries = [
    {
      id: 1,
      subject: "מתמטיקה",
      title: "סיכום יחידה 1",
      content: "סיכום של נושאים כולל משוואות ופונקציות.",
      studentId: 104
    },
    {
      id: 2,
      subject: "היסטוריה",
      title: "תקופת הרנסאנס",
      content: "סקירה כללית על התקופה והשפעותיה.",
      studentId: 105
    }
];

const homeworkAssignments = [
    {
      id: 1,
      subject: "ביולוגיה",
      assignment: "כתוב דוח על דפוסי שינה בקרב בעלי חיים",
      dueDate: "2024-07-30",
      studentId: 106
    },
    {
      id: 2,
      subject: "אנגלית",
      assignment: "הכנת מצגת על חשיבות השפה האנגלית גלובלית",
      dueDate: "2024-08-05",
      studentId: 107
    }
];



function displayData(dataArray) {
    const container = document.getElementById('additionalFields');
    // container.innerHTML = ""; // Clear previous content

    // בדיקה אם dataArray הוא מערך וכן מוגדר
    if (!Array.isArray(dataArray) || !dataArray) {
        console.error("Provided data is not an array or is undefined:", dataArray);
        return; // חזור מהפונקציה אם הנתון אינו מערך או אינו מוגדר
    }

    dataArray.forEach(item => {
        let element = document.createElement('div');
        element.className = "additional-item";
        element.innerHTML = `
            <div class="icon">👤</div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <div class="status-icon">✔</div>
            </div>`;
        container.appendChild(element);
    });
}





// function toggleDisplayData(type) {
//     const container = document.getElementById('additionalFields');
//     // Check the current data type being displayed
//     const currentType = container.getAttribute('data-current-type');

//     // Clear previous content if the same button is pressed again or a different type is selected
//     if (currentType === type || container.children.length > 0) {
//         container.innerHTML = "";
//         // If the same type is clicked, toggle it off and clear the attribute
//         if (currentType === type) {
//             container.removeAttribute('data-current-type');
//             return;
//         }
//     }

//     // Set the current type attribute
//     container.setAttribute('data-current-type', type);

//     // Determine which data to display based on 'type'
//     let dataArray = [];
//     switch (type) {
//         case 'lessonSummaries':
//             dataArray = lessonSummaries;
//             break;
//         case 'requestedHelpTopics':
//             dataArray = requestedHelpTopics;
//             break;
//         case 'homeworkAssignments':
//             dataArray = homeworkAssignments;
//             break;
//         default:
//             console.error('Unknown type:', type);
//             return;
//     }

//     // Populate container with new data
//     dataArray.forEach(item => {
//         let element = document.createElement('div');
//         element.className = "additional-item";
//         element.innerHTML = `
//             <div class="icon">👤</div>
//             <div class="text-content">${item.description || item.title || item.assignment}</div>
//             <div class="status">
//                 <div class="status-icon">✔</div>
//             </div>`;
//         container.appendChild(element);
//     });
// }
function toggleDisplayData(type) {
    const container = document.getElementById('additionalFields');
    // Check the current data type being displayed
    const currentType = container.getAttribute('data-current-type');

    // Clear previous content if the same button is pressed again or a different type is selected
    if (currentType === type || container.children.length > 0) {
        container.innerHTML = "";
        // If the same type is clicked, toggle it off and clear the attribute
        if (currentType === type) {
            container.removeAttribute('data-current-type');
            return;
        }
    }

    // Set the current type attribute
    container.setAttribute('data-current-type', type);

    // Determine which data to display based on 'type'
    let dataArray = [];
    switch (type) {
        case 'lessonSummaries':
            dataArray = lessonSummaries;
            break;
        case 'requestedHelpTopics':
            dataArray = requestedHelpTopics;
            break;
        case 'homeworkAssignments':
            dataArray = homeworkAssignments;
            break;
        default:
            console.error('Unknown type:', type);
            return;
    }

    // Populate container with new data
    dataArray.forEach(item => {
        let element = document.createElement('div');
        element.className = "additional-item";
        element.innerHTML = `
            <div class="icon">👤</div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <div class="status-icon" onclick="handleClick(${item.studentId})">✔</div>
            </div>`;
        container.appendChild(element);
    });
}

// function handleClick(studentId) {
//     // שינוי צבע ה-✔️
//     event.target.style.color = 'black';

//     // שליפת פרטי הקשר של הסטודנט
//     const student = buyers_students[studentId];
//     if (student) {
//         alert(`פרטי הקשר של ${student.name}:\n\nביוגרפיה: ${student.bio}\n\nטלפון: ${student.contact.phone}\nאימייל: ${student.contact.email}`);
//     } else {
//         console.error('Student not found:', studentId);
//     }
// }


function handleClick(studentId) {
    // Change the background color of the ✔️ to green
    event.target.style.backgroundColor = 'green';

    // Optionally change the color of the text to white for better visibility
    event.target.style.color = 'white';

    // Retrieve the student contact details
    const student = buyers_students[studentId];
    if (student) {
        alert(`פרטי הקשר של ${student.name}:\n\nביוגרפיה: ${student.bio}\n\nטלפון: ${student.contact.phone}\nאימייל: ${student.contact.email}`);
    } else {
        console.error('Student not found:', studentId);
    }
}


// function handleClick(studentId) {
//     // Toggle the active checkmark class
//     event.target.classList.toggle('active-checkmark');

//     // Retrieve the student contact details
//     const student = buyers_students[studentId];
//     if (student) {
//         alert(`פרטי הקשר של ${student.name}:\n\nביוגרפיה: ${student.bio}\n\nטלפון: ${student.contact.phone}\nאימייל: ${student.contact.email}`);
//     } else {
//         console.error('Student not found:', studentId);
//     }
// }


window.toggleDisplayData = toggleDisplayData;
window.handleClick = handleClick;


// let lessonSummaries, helpTopics, homeworkAssignments;

// document.addEventListener("DOMContentLoaded", function() {
//     console.log('Attempting to load data from data.json');
//     fetch('data.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Data loaded successfully:", data);
//         lessonSummaries = data.lessonSummaries;
//         helpTopics = data.requestedHelpTopics;
//         homeworkAssignments = data.homeworkAssignments;
//     })
//     .catch(error => {
//         console.error('Failed to load data:', error);
//     });
// });

// function toggleDisplayData(type) {
//     console.log("Toggling display data for type:", type);
//     switch(type) {
//         case 'lessonSummaries':
//             if (!lessonSummaries) {
//                 console.error("Lesson summaries data is not loaded yet.");
//                 return;
//             }
//             displayData(lessonSummaries);
//             break;
//         case 'requestedHelpTopics':
//             if (!requestedHelpTopics) {
//                 console.error("Help topics data is not loaded yet.");
//                 return;
//             }
//             displayData(requestedHelpTopics);
//             break;
//         case 'homeworkAssignments':
//             if (!homeworkAssignments) {
//                 console.error("Homework assignments data is not loaded yet.");
//                 return;
//             }
//             displayData(homeworkAssignments);
//             break;
//         default:
//             console.error('Unknown type:', type);
//     }
// }