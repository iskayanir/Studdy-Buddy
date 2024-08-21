function searchRequests(studentEmail, courseID) {
    courseID = String(courseID)
    console.log(studentEmail,courseID)
    console.log('Searching for requests with studentEmail: ${studentEmail} and courseID: ${courseID}');
    return fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
        .then(response => response.json())
        .then(data => {
            let matchingRequests = [];

            // בדיקה בתוך בקשות
            if (data) {
                for (let key in data) {
                    const request = data[key];
                    if (request.id_student === studentEmail && request.id_course === courseID) {
                        matchingRequests.push({
                            requestId: key,
                            ...request
                        });
                        console.log('Matching request found: ${JSON.stringify(request)}');
                        var typehelp = request.type
                        var topic = request.topic
                        if(request.date){
                            var date = request.date
                        } 
                        createAndAppendNewItem(typehelp, topic, date)
                        
                    }
                }
            }

            if (matchingRequests.length === 0) {
                console.log('No matching requests found');
                return null;
            }
            return matchingRequests;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                return null;
            });
}


function savefirebase(topic, type, idstudent, idcourse, status, date = null) {
    let newrequest; // Declare newrequest outside of the if-else block

    if (type === "sicom") {
        newrequest = {
            id_course: idcourse,
            id_student: idstudent,
            status_request: status,
            topic: topic,
            date: date,
            type: type
        };
    } else {
        newrequest = {
            id_course: idcourse,
            id_student: idstudent,
            status_request: status,
            topic: topic,
            type: type
        };
    }

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
        const requestId = data.name;
        createAndAppendNewItem(type, topic, requestId, date);
        // fetchData(); // Optionally refresh the data
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


function saveInput(typehelp) {
    var idcourse = document.getElementById("idcurrentcourse").textContent
    console.log("saveinputidcours", idcourse)
    var userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        var idstudent = userData.email || '';
    }

    var status = "waiting";
    var topic;
    var date;

    if (typehelp === "sicom") {
        // Get the input value
        var searchField = document.getElementById('toggleSearchField').value;
        var searchField1 = document.getElementById('toggleSearchField1').value;
        if (searchField || searchField1) {
            topic = searchField;
            date = searchField1;
            savefirebase(topic, typehelp, idstudent, idcourse, status, date);
        } else {
            alert("Search field not found");
            return;
        }
    } else if (typehelp === "hashlama") {
        var searchField = document.getElementById('toggleSearchField2').value;
        if (searchField) {
            topic = searchField;
            savefirebase(topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    } else if (typehelp === "ezra") {
        var searchField = document.getElementById('toggleSearchField3').value;
        if (searchField) {
            topic = searchField;
            savefirebase(topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    }
    
    // createAndAppendNewItem(typehelp, topic, date);

    // Hide all elements with the 'maintabs' class
    var tabs = document.querySelectorAll('.maintabs');
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });
}


function deleteRecordById(recordId) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${recordId}.json`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete record');
        }
        return response.json();
    })
    .then(data => {
        console.log(`Record with ID ${recordId} deleted successfully:`, data);
    })
    .catch(error => {
        console.error('Error deleting record:', error);
    });
}

function createAndAppendNewItem(typehelp, topic, requestId, date = null) {
    // Create new item element
    var newItem = document.createElement('div');
    newItem.className = 'grid-item';

    // Determine icon based on the type of help
    var iconClass = '';
    if (typehelp === "sicom") {
        iconClass = 'bi bi-sticky'; // Example icon for 'sicom'
    } else if (typehelp === "hashlama") {
        iconClass = 'bi bi-journal-text'; // Example icon for 'hashlama'
    } else {
        iconClass = 'bi bi-journal-check'; // Example icon for 'ezra'
    }

    // Set the content of the new item
    newItem.innerHTML = `
        <i class="${iconClass} icon"></i>
        <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
        <ul>
            <li class="topic">${topic}</li>
            ${typehelp === 'sicom' && date ? `<li class="date">תאריך סיכום: ${date}</li>` : ''}
        </ul>
        <div class="status-section">
            <div class="status-container">
                <div class="status-title">סטטוס:</div>
                <div class="status-icon">
                    <input type="checkbox" id="statusCheckbox_${requestId}" class="status-checkbox">
                    <label for="statusCheckbox_${requestId}" class="custom-checkbox"></label>
                </div>
            </div>
        </div>
        <div class="delete-section">
            <i class="bi bi-trash3 delete-icon"></i>
        </div>
    `;
    
    var deleteIcon = newItem.querySelector('.delete-icon');
    deleteIcon.addEventListener('click', function() {
        var courseContent = document.querySelector('.course-content');
        courseContent.removeChild(newItem);
        deleteRecordById(requestId)
            .then(() => {
                console.log("Record deleted from Firebase successfully");
            })
            .catch((error) => {
                console.error("Error deleting record from Firebase: ", error);
            });
    });

    // Append the new item to the course-content
    var courseContent = document.querySelector('.course-content');
    var firstChild = courseContent.firstChild; // Get the first child element
    if (firstChild) {
        courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
    } else {
        courseContent.appendChild(newItem); // If no children, just append newItem
    }
}




// async function loadCoursesDatafromFB(email) {
//     var type = "studentsReceivingHelp";
//     var studentId = await getStudentIdByEmail(email, type);
    
//     console.log(studentId);
//     console.log(type);

//     if (studentId && type) {
//         return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data) {
//                     // Check if courses exist
//                     if (data.courses) {
//                         // Extract and add course buttons
//                         var courses = data.courses;
//                         courses.forEach(course => {
//                             var firstCourse = data.courses[0];
//                             console.log(`Course number: ${course}`);
//                             loadDataCoursesDatafromFB(course);
//                             console.log('First course ID:', firstCourse);
//                             return firstCourse
//                         });
//                     } else {
//                         console.log('No courses found for this student.');
//                     }
//                 } else {
//                     console.log('No data found for this student.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     } else {
//         console.log('No student ID or user type found.');
//     }
// }


async function loadCoursesDatafromFB(email) {
    var type = "studentsReceivingHelp";
    var studentId = await getStudentIdByEmail(email, type);
    
    console.log(studentId);
    console.log(type);

    if (studentId && type) {
        return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Check if courses exist
                    if (data.courses) {
                        // Iterate over the keys of the courses object
                        var courses = data.courses;
                        Object.keys(courses).forEach(courseId => {
                            console.log(`Course number: ${courseId}`);
                            loadDataCoursesDatafromFB(courseId);
                        });

                        // Return the first course ID if needed
                        var firstCourse = Object.keys(courses)[0];
                        console.log('First course ID:', firstCourse);
                        return firstCourse;
                    } else {
                        console.log('No courses found for this student.');
                    }
                } else {
                    console.log('No data found for this student.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.log('No student ID or user type found.');
    }
}



async function getStudentIdByEmail(email, type) {
    try {
        const response = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`);
        const data = await response.json();
        for (let key in data) {
            let student = data[key];
            if (student.mail === email) {
                return key; // Return the student ID
            }
        }
        return null; // Return null if the email is not found
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function loadDataCoursesDatafromFB(idcourse) {
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/courses/${idcourse}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const courseName = data["Course Name"];
                const lectureName = data["Lacture Name"];
                const department = data["Department"];
                console.log(`Course Name: ${courseName}`);
                console.log(`Lecture Name: ${lectureName}`);
                console.log(`Department: ${department}`);
                coursesinhtml(idcourse,courseName,lectureName,department )
            } else {
                console.log('No data found for this course.');
            }
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
}


 
function coursesinhtml(idcourse, courseName, lectureName, department) {
    var coursebutton = document.getElementById("courses_buttons");

    // Create a new button element
    var button = document.createElement("button");
    button.id = idcourse;
    button.className = "bluck";
    button.innerHTML = `<i class="bi bi-book"></i> ${idcourse} - ${courseName}`;
    button.style.fontSize = '16px'
    

    // Attach the onclick event dynamically
    button.setAttribute('onclick', `coursebuttondo(${JSON.stringify(idcourse)}, 
                            ${JSON.stringify(courseName)}, 
                            ${JSON.stringify(lectureName)}, 
                            ${JSON.stringify(department)})`);

    // Append the button to the courses_buttons container
    coursebutton.appendChild(button);
}

function coursebuttondo(idcourse, courseName, lectureName, department) {
    // let button = document.getElementById(idcourse);
    // button.style.backgroundColor =  '#334999'; // צבע רקע כחול
    // button.style.color = 'white'; // צבע טקסט לבן

    // Select the parent element
    const parentElement = document.querySelector('.course-content');

    // Check if the element exists
    if (parentElement) {
    // Remove all child elements
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    }

    // צור את המידע שאתה רוצה להכניס
    var coursetitle = document.getElementById("coursedata");
    coursetitle.innerHTML =  department + " - " +
                             courseName + '/ ' +
                             lectureName;
    var currentcourse = document.getElementById("idcurrentcourse")
    currentcourse.innerHTML = idcourse
    console.log(currentcourse.textContent)

    var userData = JSON.parse(localStorage.getItem('userData'));
    var email = userData.email || '';
    console.log(email)
    searchRequests(email, idcourse).then(matchingRequests => {
        if (matchingRequests) {
            console.log('Matching requests:', matchingRequests);
        } else {
            console.log('No requests matched the criteria.');
       }
    
    });
                                
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


//function createAndAppendNewItem(typehelp, topic, requestId, date = null) {
//    console.log(requestId);
  ///  // Create new item element
//    var newItem = document.createElement('div');
  //  newItem.className = 'item';

    // Create the header section
//    var headerSection = document.createElement('div');
  //  headerSection.className = 'header-section';

    // Create title for the summary type
//    var summaryTitleSpan = document.createElement('span');
  //  summaryTitleSpan.className = 'title-text';
    //summaryTitleSpan.textContent = 'סוג בקשה: ';

    //var summarySpan = document.createElement('span');
   // summarySpan.className = 'summary-text';
   // if (typehelp === "sicom") {
     //   summarySpan.textContent = 'סיכום  ';
       // summarySpan.classList.add('summary-sicom'); 
  //  } else if (typehelp === "hashlama") {
   //     summarySpan.textContent = 'השלמת נושא  ';
     //   summarySpan.classList.add('summary-hashlama');
   // } else {
     //   summarySpan.textContent = 'עזרה בתרגיל בית  ';
       // summarySpan.classList.add('summary-ezra');
    //}

    // Append the summary title and span to the header section
    //headerSection.appendChild(summaryTitleSpan);
    //headerSection.appendChild(summarySpan);

    // Create the topic section
    //var topicSection = document.createElement('div');
    //topicSection.className = 'topic-section';

    // Create the topic title
    //var topicTitleSpan = document.createElement('span');
//    topicTitleSpan.className = 'title-text';
  //  topicTitleSpan.textContent = 'נושא: ';

    // Create the topic span
    //var fractionSpan = document.createElement('span');
 //   fractionSpan.textContent = topic;
   // fractionSpan.className = 'topic-text';

    // Append the topic title and span to the topic section
//    topicSection.appendChild(topicTitleSpan);
  //  topicSection.appendChild(fractionSpan);

    //if (typehelp === "sicom" && date) {
   //     var dateSection = document.createElement('div');
     //   dateSection.className = 'date-section';

       // var dateTitleSpan = document.createElement('span');
      //  dateTitleSpan.className = 'title-text';
     //   dateTitleSpan.textContent = 'תאריך סיכום: ';

       // var dateSpan = document.createElement('span');
      //  dateSpan.textContent = date;
      //  dateSpan.className = 'date-text';

     //   dateSection.appendChild(dateTitleSpan);
       // dateSection.appendChild(dateSpan);
    //}

    // Create the status section
//    var statusSection = document.createElement('div');
  //  statusSection.className = 'status-section';

//    var statusTitleDiv = document.createElement('div');
  //  statusTitleDiv.className = 'title-text';
//    statusTitleDiv.textContent = 'סטטוס ';

//    var statusDiv = document.createElement('div');
  //  statusDiv.className = 'status';

//    var statusIconDiv = document.createElement('div');
  //  statusIconDiv.className = 'status-icon';

    // Create the checkbox and custom styles
//    var checkbox = document.createElement('input');
  //  checkbox.type = 'checkbox';
    //checkbox.className = 'status-checkbox';

    // Ensure each checkbox has a unique ID
   // var uniqueId = 'statusCheckbox_' + Date.now();
   // checkbox.id = uniqueId;

   // var customCheckbox = document.createElement('label');
   // customCheckbox.className = 'custom-checkbox';
    //customCheckbox.htmlFor = uniqueId;

//    var deleteIconTitleSpan = document.createElement('span');
  //  deleteIconTitleSpan.className = 'title-text';
    //deleteIconTitleSpan.textContent = '';

   // var deleteIcon = document.createElement('i');
//    deleteIcon.className = 'bi bi-trash3 delete-icon'; // Add Bootstrap icon classes and your custom class


    // Attach click event listener to delete the item
//    deleteIcon.addEventListener('click', function () {
  //      courseContent.removeChild(newItem);

        // מחיקת הרשומה מהפיירבייס
        // const recordId = newItem.getAttribute(requestId);  // תוסיף ID של הרשומה כאטריבוט של האלמנט
    //    deleteRecordById(requestId)
      //      .then(() => {
        ///        console.log("Record deleted from Firebase successfully");
           // })
       //     .catch((error) => {
     //           console.error("Error deleting record from Firebase: ", error);
         //   });
    //});

//    statusIconDiv.appendChild(checkbox);
  //  statusIconDiv.appendChild(customCheckbox);

    // Append the status icon to the status div
//    statusDiv.appendChild(statusTitleDiv);
  //  statusDiv.appendChild(statusIconDiv);

    // Append spans and status div to the new item
  //  newItem.appendChild(summaryTitleSpan);
    //newItem.appendChild(summarySpan);
//    newItem.appendChild(topicTitleSpan);
  //  newItem.appendChild(fractionSpan);
    //if (typehelp === "sicom" && date) {
      //  newItem.appendChild(dateTitleSpan);
        //newItem.appendChild(dateSpan);
   // }
    //newItem.appendChild(statusDiv);
 //   newItem.appendChild(deleteIconTitleSpan);
   // newItem.appendChild(deleteIcon);

    // Append the new item to course-content
  //  var courseContent = document.querySelector('.course-content');
//    var firstChild = courseContent.firstChild; // Get the first child element
//       if (firstChild) {
//        courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
    //} else {
  //      courseContent.appendChild(newItem); // If no children, just append newItem
//    }
//}