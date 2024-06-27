// const { or } = require("firebase/firestore");
// var helptype = "";
// var topic = "";
// var date = "";

// function toggleSearchField(typehelp) {
//     // מציאת אלמנט ה-<div> שבו נרצה להוסיף את שדה החיפוש
//     var additionalFieldsDiv = document.getElementById('additionalFields');
//     var additionalFieldsDiv1 = document.getElementById('additionalFields1');

//     // בדיקה אם שדה החיפוש קיים
//     var existingSearchField = document.getElementById('toggleSearchField');
//     var existingSearchField1 = document.getElementById('toggleSearchField1');

//     //הסרת שדה חיפוש אם קיים
//     if (typehelp === "sicom") {
//         if (existingSearchField) {
//             additionalFieldsDiv.removeChild(existingSearchField);
//             if (existingSearchField1) {
//                 additionalFieldsDiv1.removeChild(existingSearchField1);
//             }
//         } else {
//             // יצירת שדה חיפוש חדש
//             var searchField = document.createElement('input');
//             searchField.type = 'text';
//             searchField.placeholder = 'נושא...';
//             searchField.className = 'search-input';
//             searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש

//             // יצירת שדה חיפוש חדש תאריך
//             var searchField1 = document.createElement('input');
//             searchField1.type = 'text';
//             searchField1.placeholder = 'תאריך...';
//             searchField1.className = 'search-input';
//             searchField1.id = 'toggleSearchField1'; // קביעה ID לשדה החיפוש

//             // יצירת כפתור חיפוש חדש
//             var searchButton = document.createElement('button');
//             searchButton.textContent = 'שמור';
//             searchButton.className = 'search-button';
//             searchButton.onclick = function() {
//                 helptype = "";
//                 topic = "";
//             };

//             // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//             var searchContainer = document.createElement('div');
//             searchContainer.id = 'toggleSearchField';
//             searchContainer.appendChild(searchField);

//             // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//             var searchContainer1 = document.createElement('div');
//             searchContainer1.id = 'toggleSearchField1';
//             searchContainer1.appendChild(searchField1);
//             searchContainer1.appendChild(searchButton);

//             // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
//             additionalFieldsDiv.appendChild(searchContainer);
//             additionalFieldsDiv1.appendChild(searchContainer1);
//         }
//     } else {
//         if (existingSearchField) {
//             additionalFieldsDiv.removeChild(existingSearchField);
//             if (existingSearchField1) {
//                 additionalFieldsDiv1.removeChild(existingSearchField1);
//             }
//         } else {
//             // יצירת שדה חיפוש חדש
//             var searchField = document.createElement('input');
//             searchField.type = 'text';
//             searchField.placeholder = 'נושא...';
//             searchField.className = 'search-input';
//             searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש

//             // יצירת כפתור חיפוש חדש
//             var searchButton = document.createElement('button');
//             searchButton.textContent = 'שמור';
//             searchButton.className = 'search-button';
//             searchButton.onclick = function() {
//                 helptype = "";
//                 topic = "";
//             };

//             // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//             var searchContainer = document.createElement('div');
//             searchContainer.id = 'toggleSearchField';
//             searchContainer.appendChild(searchField);
//             searchContainer.appendChild(searchButton);

//             // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
//             additionalFieldsDiv.appendChild(searchContainer);
//         }
//     }
// }


const requestedHelpTopics = [
    {
      id: 1,
      topic: "אלגברה",
      description: "עזרה בפתרון משוואות"
    },
    {
      id: 2,
      topic: "פיזיקה",
      description: "הבנת חוקי ניוטון"
    },
    {
      id: 3,
      topic: "כימיה",
      description: "עזרה בכימיה אורגנית"
    }
  ];
  
  const lessonSummaries = [
    {
      id: 1,
      subject: "מתמטיקה",
      title: "סיכום יחידה 1",
      content: "סיכום של נושאים כולל משוואות ופונקציות."
    },
    {
      id: 2,
      subject: "היסטוריה",
      title: "תקופת הרנסאנס",
      content: "סקירה כללית על התקופה והשפעותיה."
    }
  ];
  
  const homeworkAssignments = [
    {
      id: 1,
      subject: "ביולוגיה",
      assignment: "כתוב דוח על דפוסי שינה בקרב בעלי חיים",
      dueDate: "2024-07-30"
    },
    {
      id: 2,
      subject: "אנגלית",
      assignment: "הכנת מצגת על חשיבות השפה האנגלית גלובלית",
      dueDate: "2024-08-05"
    }
  ];
  
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
                <div class="status-icon">✔</div>
            </div>`;
        container.appendChild(element);
    });
}