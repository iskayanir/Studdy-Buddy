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



let helpTopics, lessonSummaries, homeworkAssignments;

document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        helpTopics = data.requestedHelpTopics;
        lessonSummaries = data.lessonSummaries;
        homeworkAssignments = data.homeworkAssignments;
    });
});

function displayData(dataArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content
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

function toggleDisplayData(type) {
    switch(type) {
        case 'sicom':
            displayData(lessonSummaries, 'additionalFields');
            break;
        case 'hashlama':
            displayData(helpTopics, 'additionalFields');
            break;
        case 'ezra':
            displayData(homeworkAssignments, 'additionalFields');
            break;
        default:
            console.error('Unknown type:', type);
    }
}
