document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('#tabs .tab-link');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function(event) {
            event.preventDefault(); // Prevents the default action of the link

            // Get the target section ID
            var targetId = tab.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('tabs');
    if (form) {
        form.addEventListener('selected', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally
            // Handle form submission
        });
    } else {
        console.error('Form not found!');
    }
});

function savefirebase(topic, type, idstudent, idcourse,status, date = null){
    alert(topic)
    alert(type)
    alert(idstudent)
    alert(status)
    alert(idcourse)
   
    const newrequest = {
        id_course: idcourse,
        id_student: idstudent,
        status_request: status,
        topic: topic,
        type: type
    };

    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newrequest)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Request saved successfully:', data);
        //fetchData(); // Optionally refresh the data
    })
    .catch(error => {
        console.error('Error saving request:', error);
    });

}


function showSection(sectionId) {
    
    // Get the currently active section
    var currentActiveSection = document.querySelector('.maintabs.active');
    
    // Get the new section to be shown
    var newSection = document.getElementById(sectionId);
    
    // Check if the new section is the same as the currently active section
    var isSameSection = newSection === currentActiveSection;

    // Hide all sections if the new section is different from the currently active one
    if (!isSameSection) {
        var sections = document.querySelectorAll('.maintabs');
        sections.forEach(function(maintabs) {
            maintabs.style.display = 'none';
            maintabs.classList.remove('active');
        });

        // Show the selected section
        if (newSection) {
            newSection.style.display = 'block';
            newSection.classList.add('active');
        }

        // Remove selected class from all tabs
        var tabs = document.querySelectorAll('#tabs ul li');
        tabs.forEach(function(tab) {
            tab.classList.remove('selected');
        });

        // Add selected class to the clicked tab
        var activeTab = document.querySelector('#tabs ul li a[href="#' + sectionId + '"]').parentNode;
        if (activeTab) {
            activeTab.classList.add('selected');
        }
    } else {
        // If the same section is clicked, just hide it
        if (newSection) {
            newSection.style.display = 'none';
            newSection.classList.remove('active');
        }

        // Remove selected class from the tab
        var activeTab = document.querySelector('#tabs ul li a[href="#' + sectionId + '"]').parentNode;
        if (activeTab) {
            activeTab.classList.remove('selected');
        }
    }
}


function saveInput(typehelp, idcourse, idstudent){
    var status = "waiting"
    if (typehelp === "sicom") {
        // Get the input value
        var searchField = document.getElementById('toggleSearchField').value;
        var searchField1 = document.getElementById('toggleSearchField1').value;
        if (searchField || searchField1) {
            var topic = searchField; // Declare topic
            var date = searchField1; // Declare date
            // savefirebase(topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    }else if (typehelp === "hashlama") {
        var searchField = document.getElementById('toggleSearchField2').value;
        if (searchField) {
            var topic = searchField;
            // savefirebase(topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    } else if (typehelp === "ezra") {
        var searchField = document.getElementById('toggleSearchField3').value;
        if (searchField) {
            var topic = searchField;
            // savefirebase(topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search fields not found");
            return;
        }
    }
    // Create new item element
    var newItem = document.createElement('div');
    newItem.className = 'item';
    
    var summarySpan = document.createElement('span');
    if( typehelp === "sicom"){
        summarySpan.textContent = 'סיכום - ';
    }else if(typehelp === "hashlama"){
        summarySpan.textContent = 'השלמת חומר - ';
    }else{
        summarySpan.textContent = 'עזרה בתרגיל בית - ';
    }

    if( typehelp === "sicom"){
        var dateSpan = document.createElement('span');
        dateSpan.textContent = date;}

    var fractionSpan = document.createElement('span');
    fractionSpan.textContent = topic;

    var statusDiv = document.createElement('div');
    statusDiv.className = 'status';
    
    var statusIconDiv = document.createElement('div');
    statusIconDiv.className = 'status-icon';
    
    // Create the checkbox and custom styles
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'status-checkbox';

    // Ensure each checkbox has a unique ID
    var uniqueId = 'statusCheckbox_' + Date.now();
    checkbox.id = uniqueId;

    var customCheckbox = document.createElement('label');
    customCheckbox.className = 'custom-checkbox';
    customCheckbox.htmlFor = uniqueId;

    var deleteIcon = document.createElement('img');
    deleteIcon.src = 'images/garbage.svg';
    deleteIcon.alt = 'Delete';
    deleteIcon.className = 'delete-icon';

    // Attach click event listener to delete the item
    deleteIcon.addEventListener('click', function() {
        courseContent.removeChild(newItem);
    });

    statusIconDiv.appendChild(checkbox);
    statusIconDiv.appendChild(customCheckbox);

    // Append the status icon to the status div
    statusDiv.appendChild(statusIconDiv);
    
    // Append spans and status div to the new item
    newItem.appendChild(summarySpan);
    newItem.appendChild(fractionSpan);
    if( typehelp === "sicom"){
        newItem.appendChild(dateSpan);}
    newItem.appendChild(statusDiv);
    newItem.appendChild(deleteIcon);

    // Append the new item to course-content
    var courseContent = document.querySelector('.course-content');
    var firstChild = courseContent.firstChild; // Get the first child element
    if (firstChild) {
        courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
    } else {
        courseContent.appendChild(newItem); // If no children, just append newItem
    }

}


// function toggleSearchField(typehelp, idcourse, idstudent) {
//     var status = "waiting"
//     var buttons = ['sicom', 'hashlama', 'ezra'];

//     buttons.forEach(function(buttonId) {
//         var button = document.getElementById(buttonId);
//         if (buttonId === typehelp) {
//             button.classList.add('active');
//         } else {
//             button.classList.remove('active');
//         }
//     });

// // function toggleSearchField(typehelp) {
// //    var buttons = [
// //        { id: 'sicom', white: 'images/sicomwhite.svg', purple: 'images/sicompurple.svg' },
// //        { id: 'hashlama', white: 'images/hashlamawhite.svg', purple: 'images/hashlamapurple.svg' },
// //        { id: 'ezra', white: 'images/targilwhite.svg', purple: 'images/targilpurple.svg' }
//  //   ];

// //    buttons.forEach(function(button) {
//   //      var img = document.getElementById(button.id).querySelector('img');
//     //    if (button.id === typehelp) {
//       //      img.src = button.purple;
//         //} else {
//           //  img.src = button.white;
//        // }
//     //}); 

//     // מציאת אלמנט ה-<div> שבו נרצה להוסיף את שדה החיפוש
//     var additionalFieldsDiv = document.getElementById('additionalFields');
//     var additionalFieldsDiv1 = document.getElementById('additionalFields1');

//     // בדיקה אם שדה החיפוש קיים
//     var existingSearchField = document.getElementById('toggleSearchField');
//     var existingSearchField1 = document.getElementById('toggleSearchField1');

//     var inpu = document.getElementById("datefield")

//     //בדיקה אם מדובר בסיכום
//     if (typehelp === "sicom") {
//         //הסרת שדה חיפוש אם קיים
//         if (existingSearchField1) {
//             if (inpu){ 
//                 additionalFieldsDiv.removeChild(existingSearchField);
//                 additionalFieldsDiv1.removeChild(existingSearchField1);
//             }else{
//                 additionalFieldsDiv.removeChild(existingSearchField);
//                 additionalFieldsDiv1.removeChild(existingSearchField1);
//                  // יצירת שדה חיפוש חדש
//                 var searchField = document.createElement('input');
//                 searchField.type = 'text';
//                 searchField.placeholder = 'נושא...';
//                 searchField.className = 'search-input';
//                 searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש
//                 // יצירת שדה חיפוש חדש תאריך
//                 var searchField1 = document.createElement('input');
//                 searchField1.type = 'text';
//                 searchField1.placeholder = 'תאריך...';
//                 searchField1.className = 'search-input';
//                 searchField1.id = 'datefield'; // קביעה ID לשדה החיפוש
//                 // יצירת כפתור שמור
//                 var searchButton = document.createElement('button');
//                 searchButton.textContent = 'שמור';
//                 searchButton.className = 'search-button';
//                 searchButton.onclick = function() {
//                     if (searchField) {
//                         topic = searchField.value;
//                         date =searchField1.value
//                         savefirebase(topic, typehelp, idstudent, idcourse, status)
//                     // Create new item element
//                     var newItem = document.createElement('div');
//                     newItem.className = 'item';
                    
//                     var summarySpan = document.createElement('span');
//                     summarySpan.textContent = 'סיכום - ';
    
//                     var dateSpan = document.createElement('span');
//                     dateSpan.textContent = date;
        
//                     var fractionSpan = document.createElement('span');
//                     fractionSpan.textContent = topic;
        
//                     var statusDiv = document.createElement('div');
//                     statusDiv.className = 'status';
                    
//                     var statusIconDiv = document.createElement('div');
//                     statusIconDiv.className = 'status-icon';
                    
//                     // Create the checkbox and custom styles
//                     var checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.className = 'status-checkbox';

//                     // Ensure each checkbox has a unique ID
//                     var uniqueId = 'statusCheckbox_' + Date.now();
//                     checkbox.id = uniqueId;

//                     var customCheckbox = document.createElement('label');
//                     customCheckbox.className = 'custom-checkbox';
//                     customCheckbox.htmlFor = uniqueId;

//                     var deleteIcon = document.createElement('img');
//                     deleteIcon.src = 'images/garbage.svg';
//                     deleteIcon.alt = 'Delete';
//                     deleteIcon.className = 'delete-icon';

//                     // Attach click event listener to delete the item
//                     deleteIcon.addEventListener('click', function() {
//                         courseContent.removeChild(newItem);
//                     });

//                     statusIconDiv.appendChild(checkbox);
//                     statusIconDiv.appendChild(customCheckbox);

//                     // Append the status icon to the status div
//                     statusDiv.appendChild(statusIconDiv);
                    
//                     // Append spans and status div to the new item
//                     newItem.appendChild(summarySpan);
//                     newItem.appendChild(fractionSpan);
//                     newItem.appendChild(dateSpan);
//                     newItem.appendChild(statusDiv);
//                     newItem.appendChild(deleteIcon);
        
//                     // Append the new item to course-content
//                     var courseContent = document.querySelector('.course-content');
//                     var firstChild = courseContent.firstChild; // Get the first child element
//                     if (firstChild) {
//                         courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
//                     } else {
//                         courseContent.appendChild(newItem); // If no children, just append newItem
//                     }
            
//                         // Optionally remove the search fields if needed
//                         // additionalFieldsDiv.removeChild(existingSearchField);
//                         // additionalFieldsDiv1.removeChild(existingSearchField1);
//                     } else {
//                         alert("Search field not found");
//                     }
//                     existingSearchField = document.getElementById('toggleSearchField')
//                     existingSearchField1 = document.getElementById('toggleSearchField1');
//                     additionalFieldsDiv.removeChild(existingSearchField);
//                     additionalFieldsDiv1.removeChild(existingSearchField1);
//                 };

//                 // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//                 var searchContainer = document.createElement('div');
//                 searchContainer.id = 'toggleSearchField';
//                 searchContainer.appendChild(searchField);

//                 // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//                 var searchContainer1 = document.createElement('div');
//                 searchContainer1.id = 'toggleSearchField1';
//                 searchContainer1.appendChild(searchField1);
//                 searchContainer1.appendChild(searchButton);

//                 // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
//                 additionalFieldsDiv.appendChild(searchContainer);
//                 additionalFieldsDiv1.appendChild(searchContainer1);

//             }
            
//         }else{
//             if (existingSearchField){
//                 additionalFieldsDiv.removeChild(existingSearchField);}
//                 // יצירת שדה חיפוש חדש
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
//             searchField1.id = 'datefield'; // קביעה ID לשדה החיפוש
//             // יצירת כפתור שמור
//             var searchButton = document.createElement('button');
//             searchButton.textContent = 'שמור';
//             searchButton.className = 'search-button';
//             searchButton.onclick = function() {
//                 if (searchField) {
//                     topic = searchField.value;
//                     date =searchField1.value
//                     savefirebase(topic, typehelp, idstudent, idcourse, status)
//                     // Create new item element
//                     var newItem = document.createElement('div');
//                     newItem.className = 'item';
                    
//                     var summarySpan = document.createElement('span');
//                     summarySpan.textContent = 'סיכום - ';
    
//                     var dateSpan = document.createElement('span');
//                     dateSpan.textContent = date;
        
//                     var fractionSpan = document.createElement('span');
//                     fractionSpan.textContent = topic;
        
//                     var statusDiv = document.createElement('div');
//                     statusDiv.className = 'status';
                    
//                     var statusIconDiv = document.createElement('div');
//                     statusIconDiv.className = 'status-icon';
                    
//                     // Create the checkbox and custom styles
//                     var checkbox = document.createElement('input');
//                     checkbox.type = 'checkbox';
//                     checkbox.className = 'status-checkbox';

//                     // Ensure each checkbox has a unique ID
//                     var uniqueId = 'statusCheckbox_' + Date.now();
//                     checkbox.id = uniqueId;

//                     var customCheckbox = document.createElement('label');
//                     customCheckbox.className = 'custom-checkbox';
//                     customCheckbox.htmlFor = uniqueId;

//                     var deleteIcon = document.createElement('img');
//                     deleteIcon.src = 'images/garbage.svg';
//                     deleteIcon.alt = 'Delete';
//                     deleteIcon.className = 'delete-icon';

//                     // Attach click event listener to delete the item
//                     deleteIcon.addEventListener('click', function() {
//                         courseContent.removeChild(newItem);
//                     });

//                     statusIconDiv.appendChild(checkbox);
//                     statusIconDiv.appendChild(customCheckbox);

//                     // Append the status icon to the status div
//                     statusDiv.appendChild(statusIconDiv);
                    
//                     // Append spans and status div to the new item
//                     newItem.appendChild(summarySpan);
//                     newItem.appendChild(fractionSpan);
//                     newItem.appendChild(dateSpan);
//                     newItem.appendChild(statusDiv);
//                     newItem.appendChild(deleteIcon);
        
//                     // Append the new item to course-content
//                     var courseContent = document.querySelector('.course-content');
//                     var firstChild = courseContent.firstChild; // Get the first child element
//                     if (firstChild) {
//                         courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
//                     } else {
//                         courseContent.appendChild(newItem); // If no children, just append newItem
//                     }
        
//                     // Optionally remove the search fields if needed
//                     // additionalFieldsDiv.removeChild(existingSearchField);
//                     // additionalFieldsDiv1.removeChild(existingSearchField1);
//                 } else {
//                     alert("Search field not found");
//                 }
//                 existingSearchField = document.getElementById('toggleSearchField')
//                 existingSearchField1 = document.getElementById('toggleSearchField1');
//                 additionalFieldsDiv.removeChild(existingSearchField);
//                 additionalFieldsDiv1.removeChild(existingSearchField1);
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
//         if (existingSearchField1) {
//             var inp = existingSearchField1.querySelector('input')
//             existingSearchField1.removeChild(inp)
//         } else {
//             if (existingSearchField) {
//                 additionalFieldsDiv.removeChild(existingSearchField);}
//             // יצירת שדה חיפוש חדש
//             var searchField = document.createElement('input');
//             searchField.type = 'text';
//             searchField.placeholder = 'נושא...';
//             searchField.className = 'search-input';
//             searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש
//             }
//         // יצירת כפתור שמור
//         var searchButton = document.createElement('button');
//         searchButton.textContent = 'שמור';
//         searchButton.className = 'search-button';
//         searchButton.onclick = function() {
//             if (searchField) {
//             topic = searchField.value;
//             savefirebase(topic, typehelp, idstudent, idcourse, status)
//             // Create new item element
//             var newItem = document.createElement('div');
//             newItem.className = 'item';
            
//             if (typehelp === 'hashlama'){
//                 var summarySpan = document.createElement('span');
//                 summarySpan.textContent = 'השלמת נושא - ';
//             }else{
//                 var summarySpan = document.createElement('span');
//                 summarySpan.textContent = 'עזרה בתרגיל בית - ';
//             }
            

//             var fractionSpan = document.createElement('span');
//             fractionSpan.textContent = topic;

//             var statusDiv = document.createElement('div');
//             statusDiv.className = 'status';
            
//             var statusIconDiv = document.createElement('div');
//             statusIconDiv.className = 'status-icon';
            
//             var checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.className = 'status-checkbox';

//             // Ensure each checkbox has a unique ID
//             var uniqueId = 'statusCheckbox_' + Date.now();
//             checkbox.id = uniqueId;

//             var customCheckbox = document.createElement('label');
//             customCheckbox.className = 'custom-checkbox';
//             customCheckbox.htmlFor = uniqueId;
            
//             var deleteIcon = document.createElement('img');
//             deleteIcon.src = 'images/garbage.svg';
//             deleteIcon.alt = 'Delete';
//             deleteIcon.className = 'delete-icon';

//             // Attach click event listener to delete the item
//             deleteIcon.addEventListener('click', function() {
//                 courseContent.removeChild(newItem);
//             });

//             statusIconDiv.appendChild(checkbox);
//             statusIconDiv.appendChild(customCheckbox);

//             // Append the status icon to the status div
//             statusDiv.appendChild(statusIconDiv);

//             // Append spans and status div to the new item
//             newItem.appendChild(summarySpan);
//             newItem.appendChild(fractionSpan);
//             newItem.appendChild(statusDiv);
//             newItem.appendChild(deleteIcon);
            

//             // Append the new item to course-content
//             var courseContent = document.querySelector('.course-content');
//             var firstChild = courseContent.firstChild; // Get the first child element
//             if (firstChild) {
//                 courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
//             } else {
//                 courseContent.appendChild(newItem); // If no children, just append newItem
//             }

//             // Optionally remove the search fields if needed
//             // additionalFieldsDiv.removeChild(existingSearchField);
//             // additionalFieldsDiv1.removeChild(existingSearchField1);
        
//         } else {
//             alert("Search field not found");
//         }
//         existingSearchField = document.getElementById('toggleSearchField')
//         existingSearchField1 = document.getElementById('toggleSearchField1');
//         additionalFieldsDiv.removeChild(existingSearchField);
//         additionalFieldsDiv1.removeChild(existingSearchField1);
//     };


//         // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
//         var searchContainer = document.createElement('div');
//         searchContainer.id = 'toggleSearchField';
//         searchContainer.appendChild(searchField);
//         searchContainer.appendChild(searchButton);

//         // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
//         additionalFieldsDiv.appendChild(searchContainer);
        
//     }

// }