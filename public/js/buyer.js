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
                        var status = request.status_request
                        var dateCreateRequest = request.date_create_request
                        if(request.date){
                            var date = request.date
                        } 
                        
                        createAndAppendNewItem(dateCreateRequest, status,typehelp, topic, key, date)
                        
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


function savefirebase(dateCreateRequest, topic, type, idstudent, idcourse, status, date = null) {
    let newrequest; // Declare newrequest outside of the if-else block

    if (type === "sicom") {
        newrequest = {
            date_create_request: dateCreateRequest,
            id_course: idcourse,
            id_student: idstudent,
            status_request: status,
            topic: topic,
            date: date,
            type: type
        };
    } else {
        newrequest = {
            date_create_request: dateCreateRequest,
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
        alert("הבקשה שלך נקלטה. כשיהיה מישהו שיוכל לעזור תקבל מייל עם הפרטים שלו והם יופיעו גם כאן באתר")
        const requestId = data.name;
        createAndAppendNewItem(dateCreateRequest, status, type, topic, requestId, date);
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
    if (!idcourse) {
        console.warn('idcourse is not defined. Exiting function.');
        alert("לא ניתן להכניס רשומה ללא הרשמה לקורסים")
        return; // יציאה מהפונקציה
    }

    var dateCreateRequest = new Date();
    console.log(dateCreateRequest)
    // Get day, month, and year
    const day = String(dateCreateRequest.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(dateCreateRequest.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed, months are zero-based
    const year = String(dateCreateRequest.getFullYear()).slice(-2); // Get last two digits of the year
    dateCreateRequest = `${day}/${month}/${year}`
    console.log(dateCreateRequest)
    
    
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
            savefirebase(dateCreateRequest, topic, typehelp, idstudent, idcourse, status, date);
        } else {
            alert("Search field not found");
            return;
        }
    } else if (typehelp === "hashlama") {
        var searchField = document.getElementById('toggleSearchField2').value;
        if (searchField) {
            topic = searchField;
            savefirebase(dateCreateRequest, topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    } else if (typehelp === "ezra") {
        var searchField = document.getElementById('toggleSearchField3').value;
        if (searchField) {
            topic = searchField;
            savefirebase(dateCreateRequest, topic, typehelp, idstudent, idcourse, status);
        } else {
            alert("Search field not found");
            return;
        }
    }
    

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

function createAndAppendNewItem(dateCreateRequest, status, typehelp, topic, requestId, date = null) {
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

    if (status === "waiting"){
            // Set the content of the new item
        newItem.innerHTML = `
        <i class="${iconClass} icon"></i>
        <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
        <ul>
        ${typehelp === 'sicom' && date ? `<li class="topic">${topic} מתאריך ${date}</li>` : `<li class="topic">${topic}</li>`}
        </ul>
        <div class="status-section">
            <button id="status-button_${requestId}" class="status-button-waiting">מחכה לאישור</button>
        </div>
        <div class="delete-section">
            <i class="bi bi-trash3 delete-icon"></i>
        </div>
        <div class="create"> הבקשה נוצרה בתאריך: ${dateCreateRequest} </div>
    `;


    }else{
        // Set the content of the new item
        newItem.innerHTML = `
        <i class="${iconClass} icon"></i>
        <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
        <ul>
            ${typehelp === 'sicom' && date ? `<li class="topic">${topic} מתאריך ${date}</li>` : `<li class="topic">${topic}</li>`}
        </ul>
        <div class="status-section">
            <button id="status-button_${requestId}" class="status-button-approved">הבקשה אושרה!</button>
        </div>
        <div class="delete-section">
            <i class="bi bi-trash3 delete-icon"></i>
        </div>
        <div class="create"> הבקשה נוצרה בתאריך: ${dateCreateRequest} </div>
    `;

    }
    
    // Attach the click event listener for the status button
    var statusButton = newItem.querySelector(`#status-button_${requestId}`);
    statusButton.addEventListener('click', function() {
        ShowSellerDetails(requestId, status); // Call statuschange function with requestId
    });

    // Delete item event listener
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

function ShowSellerDetails(requestId, status) {
    console.log(requestId)
    if (status === "waiting") {
        alert("הבקשה עוד לא אושרה");
    } else {
        // Step 1: Fetch data from requests.json
        fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json`)
            .then(response => response.json()) // Parse the JSON data
            .then(data => {
                console.log(data)
                if (data && data.id_seller_approved) {
                    // Get the "id_seller_approved"
                    const idSellerApproved = data.id_seller_approved;
                    console.log("id_seller_approved:", idSellerApproved);
                    
                    // Step 2: Fetch data from students.json using idSellerApproved
                    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsProvidingHelp/${idSellerApproved}.json`); // Corrected fetch URL and added return
                } else {
                    throw new Error("id_seller_approved not found in requests data.");
                }
            })
            .then(response => response.json()) // Parse the JSON data for students
            .then(studentData => {
                if (studentData) {
                    // Log all student information
                    console.log("Student Information:", studentData);
                    var name = studentData["name"]
                    var mail = studentData["mail"]
                    var phone = studentData["tel"]
                    var degree = studentData["degree"]
                    var year = studentData["year"]

                    var alertMessage = `הבקשה שלך אושרה על ידי ${name}!
                    \nאימייל: ${mail}
                    \nטלפון: ${phone}
                    \nתואר: ${degree}
                    \nשנה: ${year}`;

                    // Show the alert
                    alert(alertMessage); 
                } else {
                    console.log("No student data found for the given id_seller_approved.");
                }
            })
            .catch(error => {
                console.error("Error fetching data from Firebase:", error);
            });

            
    }

    // Implement status change logic here, using the requestId if needed
    console.log(`Status changed for requestId: ${requestId}`);
}



async function loadCoursesDatafromFB(email) {
    var type = "studentsReceivingHelp";
    var studentId = await getStudentIdByEmail(email, type);
    
    // console.log(studentId);
    // console.log(type);

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
                            // console.log(`Course number: ${courseId}`);
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
    button.style.fontSize = '18px'
    

    // Attach the onclick event dynamically
    button.setAttribute('onclick', `coursebuttondo(${JSON.stringify(idcourse)}, 
                            ${JSON.stringify(courseName)}, 
                            ${JSON.stringify(lectureName)}, 
                            ${JSON.stringify(department)})`);

    // Append the button to the courses_buttons container
    coursebutton.appendChild(button);
}


function coursebuttondo(idcourse, courseName, lectureName, department) {
    // שינוי הצבע של הכפתור הנלחץ
    var allButtons = document.querySelectorAll("#courses_buttons button");
    allButtons.forEach(button => {
        button.classList.remove('selected-courses');
    });

    var clickedButton = document.getElementById(idcourse);
    clickedButton.classList.add('selected-courses');

    // קוד קיים - שמירה על הפונקציונליות המקורית
    const parentElement = document.querySelector('.course-content');

    if (parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    var coursetitle = document.getElementById("coursedata");
    coursetitle.innerHTML = courseName + ' / ' + lectureName;

    var currentcourse = document.getElementById("idcurrentcourse");
    currentcourse.innerHTML = idcourse;
    console.log(currentcourse.textContent);

    var userData = JSON.parse(localStorage.getItem('userData'));
    var email = userData.email || '';
    console.log(email);

    searchRequests(email, idcourse).then(matchingRequests => {
        if (matchingRequests) {
            console.log('Matching requests:', matchingRequests);
        } else {
            console.log('No requests matched the criteria.');
        }
    });
}

