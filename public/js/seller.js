
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

function toggleDisplayData(type, button) {
    const container = document.getElementById('additionalFields');
    const currentType = container.getAttribute('data-current-type');
    
    // Clear previous content if the same button is pressed again or a different type is selected
    if (currentType === type) {
        container.innerHTML = "";
        container.removeAttribute('data-current-type');
        resetButtonImages();
        return;
    }

    // Clear previous content and set the current type attribute
    container.innerHTML = "";
    container.setAttribute('data-current-type', type);

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

    updateButtonImage(button, type);
}

function updateButtonImage(button, type) {
    const images = {
         'lessonSummaries': 'images/sicompurple.svg',
         'requestedHelpTopics': 'images/hashlamapurple.svg',
         'homeworkAssignments': 'images/targilpurple.svg'
    };

    resetButtonImages();
    const img = button.querySelector('img');
    if (img && images[type]) {
        img.src = images[type];
    }
    button.setAttribute('data-active', 'true');
}

function resetButtonImages() {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        const img = button.querySelector('img');
        if (img) {
            if (img.alt === 'סיכום') img.src = 'images/סיכום.svg';
            if (img.alt === 'השלמת נושא') img.src = 'images/hashlamawhite.svg';
            if (img.alt === 'עזרה בתרגיל בית') img.src = 'images/עזרה בתרגיל בית.svg';
        }
        button.removeAttribute('data-active');
    });
}


// function toggleDisplayData(type, button) {
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
//                 <div class="status-icon" onclick="handleClick(${item.studentId})">✔</div>
//             </div>`;
//         container.appendChild(element);
//     });
//     updateButtonImage(button, type);
// }




// function updateButtonImage(button, type) {
//     const images = {
//         'lessonSummaries': 'images/sicompurple.svg',
//         'requestedHelpTopics': 'images/hashlamapurple.svg',
//         'homeworkAssignments': 'images/targilpurple.svg'
//     };

//     resetButtonImages();
//     const img = button.querySelector('img');
//     if (img && images[type]) {
//         img.src = images[type];
//     }
// }

// function resetButtonImages() {
//     const buttons = document.querySelectorAll('.buttons button img');
//     buttons.forEach(img => {
//         if (img.alt === 'סיכום') img.src = 'images/סיכום.svg';
//         if (img.alt === 'השלמת נושא') img.src = 'images/hashlamawhite.svg';
//         if (img.alt === 'עזרה בתרגיל בית') img.src = 'images/עזרה בתרגיל בית.svg';
//     });
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