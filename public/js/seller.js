
// // import buyers_students from './seller-profile.js';
// import { buyers_students, seller_students } from './seller-profile.js';


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

            <div class="text-content">${item.title}</div>
            <div class="status">
                <i class="bi bi-check-square"></i>
            </div>`;
        container.appendChild(element);
    });
}

function toggleDisplayData(type, button) {
    // Reset all button colors and set the clicked button to blue
    resetButtonColors();
    button.classList.remove('black');
    button.classList.add('blue');

    const container = document.getElementById('additionalFields');
    const currentType = container.getAttribute('data-current-type');
    
    // Clear previous content if the same button is pressed again or a different type is selected
    if (currentType === type) {
        container.innerHTML = "";
        container.removeAttribute('data-current-type');
        return;
    }

    // Clear previous content and set the current type attribute
    container.innerHTML = "";
    container.setAttribute('data-current-type', type);

    let dataArray = [];
    switch (type) {
        case 'course1':
            dataArray = course1;
            break;
        case 'course2':
            dataArray = course2;
            break;
        case 'course3':
            dataArray = course3;
            break;
        case 'archive':
            dataArray = archive;
            break;
        case 'approvedrequests':
            dataArray = approvedrequests;
            break
        default:
            console.error('Unknown type:', type);
            return;
    }

    dataArray.forEach(item => {
        let element = document.createElement('div');
        var iditem = Date.now();
        element.id = String(iditem);
        element.className = "additional-item";
        var typehelp = item.type;
        if (typehelp === "sicom") {
            element.innerHTML = `
            <div class="icon-with-image">
                <i class="bi bi-sticky"></i>
                <span class="tooltip-text">סיכום</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <i class="bi bi-check-square status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'></i>
            </div>`;
        } else if (typehelp === "hashlama") {
            element.innerHTML = `
            <div class="icon-with-image">
                <i class="bi bi-journal-text"></i>
                <span class="tooltip-text">השלמת חומר</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <i class="bi bi-check-square status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'></i>
            </div>`;
        } else {
            element.innerHTML = `
            <div class="icon-with-image">
                <i class="bi bi-journal-check"></i>
                <span class="tooltip-text">עזרה בתרגיל</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <i class="bi bi-check-square status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'></i>
            </div>`;
        }
    
        container.appendChild(element);
    });
    
}

function resetButtonColors() {
    const buttons = document.querySelectorAll('.section button');
    buttons.forEach(button => {
        button.classList.remove('blue');
        button.classList.add('black');
    });
}


function handleClick(helpitem, elementid, type) {
    // Change the background color of the ✔️ to green
    event.target.style.backgroundColor = 'green';

    // Optionally change the color of the text to white for better visibility
    event.target.style.color = 'white';

    // Remove the element from the DOM
    const additionalField = document.getElementById("additionalFields");
    const deleteElement = document.getElementById(elementid);
    additionalField.removeChild(deleteElement);

    // Add the item to the approved requests array
    const approvedItem = {
        id: helpitem.id,
        type: helpitem.type,
        subject: helpitem.subject,
        title: helpitem.title,
        content: helpitem.content,
        studentId: helpitem.studentId
    };
    approvedrequests.push(approvedItem);

    // Map the type string to the actual array
    let courseArray;
    switch (type) {
        case 'course1':
            courseArray = course1;
            break;
        case 'course2':
            courseArray = course2;
            break;
        case 'course3':
            courseArray = course3;
            break;
        case 'archive':
            courseArray = archive;
            break;
        case 'approvedrequests':
            courseArray = approvedrequests;
            break;
        default:
            console.error('Unknown type:', type);
            return;
    }

    // Filter out the item from the corresponding course array
    const updatedArray = courseArray.filter(item => item.id !== helpitem.id);
    
    // Update the original array
    switch (type) {
        case 'course1':
            course1.length = 0;
            course1.push(...updatedArray);
            break;
        case 'course2':
            course2.length = 0;
            course2.push(...updatedArray);
            break;
        case 'course3':
            course3.length = 0;
            course3.push(...updatedArray);
            break;
        case 'archive':
            archive.length = 0;
            archive.push(...updatedArray);
            break;
        case 'approvedrequests':
            approvedrequests.length = 0;
            approvedrequests.push(...updatedArray);
            break;
    }

    console.log('Updated array:', updatedArray);
}


    // // Retrieve the student contact details
    // const student = buyers_students[studentId];
    // if (student) {
    //     alert(`פרטי הקשר של ${student.name}:\n\nביוגרפיה: ${student.bio}\n\nטלפון: ${student.contact.phone}\nאימייל: ${student.contact.email}`);
    // } else {
    //     console.error('Student not found:', studentId);
    // }


window.toggleDisplayData = toggleDisplayData;
window.handleClick = handleClick;



async function loadCoursesDatafromFB(email) {
    var type = "studentsProvidingHelp";
    var studentId = await getStudentIdByEmail(email, type);
    
    console.log(studentId);

    if (studentId && type) {
        return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Check if courses exist
                    if (data.courses) {
                        // Iterate over the courses object keys
                        Object.keys(data.courses).forEach(courseId => {
                            console.log(`Course number: ${courseId}`);
                            loadDataCoursesDatafromFB(courseId);
                        });
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

    // Attach the onclick event dynamically
    button.setAttribute('onclick', `coursebuttondo(${JSON.stringify(idcourse)}, 
                            ${JSON.stringify(courseName)}, 
                            ${JSON.stringify(lectureName)}, 
                            ${JSON.stringify(department)})`);

    // Append the button to the courses_buttons container
    coursebutton.appendChild(button);
}

function coursebuttondo(idcourse, courseName, lectureName, department) {
    var courseContent = document.getElementById('course-content');
    if (courseContent){
        // Remove all child elements
        while (courseContent.firstChild) {
            courseContent.removeChild(courseContent.firstChild);
    }
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
    showrequests(idcourse)
//     searchRequests(email, idcourse).then(matchingRequests => {
//         if (matchingRequests) {
//             console.log('Matching requests:', matchingRequests);
//         } else {
//             console.log('No requests matched the criteria.');
//        }
    
//     });
                                
}

// function showrequests(idcourse){
//     console.log('Searching for requests with IDcourse: ${idcourse}');
//     return fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
//         .then(response => response.json())
//         .then(data => {
//             let matchingRequests = [];

//             // בדיקה בתוך בקשות
//             if (data) {
//                 for (let key in data) {
//                     const request = data[key];
//                     console.log(request)
//                     console.log(request.id_course)
//                     console.log(idcourse)
//                     if (request.id_course === String(idcourse)) {
//                         matchingRequests.push({
//                             requestId: key,
//                             ...request
//                         });
//                         console.log('Matching request found: ${JSON.stringify(request)}');
//                         var typehelp = request.type
//                         var topic = request.topic
//                         var status = request.status_request
//                         console.log(typehelp, topic, status)
//                         if(request.date){
//                             var date = request.date
//                             createAndAppendNewItem(typehelp, topic, status, date)
//                         } 
//                         createAndAppendNewItem(typehelp, topic, status)
                        
//                     }
//                 }
//             }

//             if (matchingRequests.length === 0) {
//                 console.log('No matching requests found');
//                 return null;
//             }
//             return matchingRequests;
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 return null;
//             });


// }

}
function showrequests(idcourse){
    console.log(`Searching for requests with IDcourse: ${idcourse}`);
    return fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
        .then(response => response.json())
        .then(data => {
            let matchingRequests = [];

            // בדיקה בתוך בקשות
            if (data) {
                for (let key in data) {
                    const request = data[key];
                    console.log(request);
                    if (request.id_course === String(idcourse)) {
                        matchingRequests.push({
                            requestId: key,
                            ...request
                        });
                        console.log(`Matching request found: ${JSON.stringify(request)}`);
                        var typehelp = request.type;
                        var topic = request.topic;
                        var status = request.status_request;
                        var requestId = key; // Use the request ID for the next steps
                        console.log(typehelp, topic, status, requestId);
                        if (status !== "approved") {
                            if(request.date){
                                var date = request.date;
                                createAndAppendNewItem(typehelp, topic, status, date, requestId, idcourse);
                            } else {
                                createAndAppendNewItem(typehelp, topic, status, null, requestId, idcourse);
                            }}
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

function showapprovedrequest() {
    var courseContent = document.getElementById('course-content');
    if (courseContent){
        // Remove all child elements
        while (courseContent.firstChild) {
            courseContent.removeChild(courseContent.firstChild);
    }}
    
    // השגת המייל של המשתמש הנוכחי
    var userData = JSON.parse(localStorage.getItem('userData')); 
    var email = userData.email || '';

    // בקשת כל ה-requests מ-Firebase
    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
        .then(response => response.json())
        .then(data => {
            // מעבר על כל הבקשות
            for (var requestId in data) {
                if (data.hasOwnProperty(requestId)) {
                    var request = data[requestId];
                    
                    // בדיקה אם יש מפתח בשם "id_seller_approved" ואם התוכן שלו זהה למייל של המשתמש
                    if (request.id_seller_approved && request.id_seller_approved === email) {
                        var typehelp = request.type;
                        var topic = request.topic;
                        var status = request.status_request;
                        var idcourse = request.id_course
                        var requestId = request; // Use the request ID for the next steps
                        console.log(typehelp, topic, status, requestId);
                        console.log("התנאים מתקיימים עבור הבקשה עם ה-ID:", requestId);
                        if (typehelp === "sicom"){
                            var date = request.date;
                            createAndAppendNewItem(typehelp, topic, status, date, requestId, idcourse);
                        } else {
                            createAndAppendNewItem(typehelp, topic, status, null, requestId, idcourse);

                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error("שגיאה בקבלת הבקשות מ-Firebase:", error);
        });
}



// function createAndAppendNewItem(typehelp, topic, status, date = null) {
//     // Create new item element
//     var newItem = document.createElement('div');
//     newItem.className = 'item';

//     // Create title for the summary type
//     var summaryTitleSpan = document.createElement('span');
//     summaryTitleSpan.className = 'title-text';
//     summaryTitleSpan.textContent = 'סוג בקשה: ';

//     var summarySpan = document.createElement('span');
//     summarySpan.className = 'summary-text';
//     if (typehelp === "sicom") {
//         summarySpan.textContent = 'סיכום  ';
//         summarySpan.classList.add('summary-sicom'); 
//     } else if (typehelp === "hashlama") {
//         summarySpan.textContent = 'השלמת נושא  ';
//         summarySpan.classList.add('summary-hashlama');
//     } else {
//         summarySpan.textContent = 'עזרה בתרגיל בית  ';
//         summarySpan.classList.add('summary-ezra');
//     }

//     // Create title for the topic
//     var topicTitleSpan = document.createElement('span');
//     topicTitleSpan.className = 'title-text';
//     topicTitleSpan.textContent = 'נושא: ';

//     // Create topic span
//     var fractionSpan = document.createElement('span');
//     fractionSpan.textContent = topic;
//     fractionSpan.className = 'topic-text';

//     if (typehelp === "sicom" && date) {
//         var dateTitleSpan = document.createElement('span');
//         dateTitleSpan.className = 'title-text';
//         dateTitleSpan.textContent = 'תאריך סיכום: ';

//         var dateSpan = document.createElement('span');
//         dateSpan.textContent = date;
//         dateSpan.className = 'date-text';
//     }

//     // Create title for the status
//     var statusTitleDiv = document.createElement('div');
//     statusTitleDiv.className = 'title-text';
//     statusTitleDiv.textContent = 'סטטוס בקשה ';

//     var statusDiv = document.createElement('div');
//     statusDiv.className = 'status';

//     var statusIconDiv = document.createElement('div');
//     statusIconDiv.className = 'status-icon';

//     // Create the checkbox and custom styles
//     var checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.className = 'status-checkbox';

//     // Ensure each checkbox has a unique ID
//     var uniqueId = 'statusCheckbox_' + Date.now();
//     checkbox.id = uniqueId;

//     var customCheckbox = document.createElement('label');
//     customCheckbox.className = 'custom-checkbox';
//     customCheckbox.htmlFor = uniqueId;

//     // var deleteIconTitleSpan = document.createElement('span');
//     // deleteIconTitleSpan.className = 'title-text';
//     // deleteIconTitleSpan.textContent = 'מחיקה ';

//     // var deleteIcon = document.createElement('i');
//     // deleteIcon.className = 'bi bi-trash3 delete-icon'; // Add Bootstrap icon classes and your custom class


//     // // Attach click event listener to delete the item
//     // deleteIcon.addEventListener('click', function () {
//     //     courseContent.removeChild(newItem);
//     // });

//     statusIconDiv.appendChild(checkbox);
//     statusIconDiv.appendChild(customCheckbox);

//     // Append the status icon to the status div
//     statusDiv.appendChild(statusTitleDiv);
//     statusDiv.appendChild(statusIconDiv);

//     // Append spans and status div to the new item
//     newItem.appendChild(summaryTitleSpan);
//     newItem.appendChild(summarySpan);
//     newItem.appendChild(topicTitleSpan);
//     newItem.appendChild(fractionSpan);
//     if (typehelp === "sicom" && date) {
//         newItem.appendChild(dateTitleSpan);
//         newItem.appendChild(dateSpan);
//     }
//     newItem.appendChild(statusDiv);
    

//     // Append the new item to course-content
//     var courseContent = document.getElementById('course-content');
//     courseContent.appendChild(newItem)}

async function createAndAppendNewItem(typehelp, topic, status, date = null, requestId, idcourse) {
    // Create new item element
    var newItem = document.createElement('div');
    newItem.className = 'item';

    // Determine icon based on the type of help
    var iconClass = '';
    if (typehelp === "sicom") {
        iconClass = 'bi bi-sticky'; // Example icon for 'sicom'
    } else if (typehelp === "hashlama") {
        iconClass = 'bi bi-journal-text'; // Example icon for 'hashlama'
    } else {
        iconClass = 'bi bi-journal-check'; // Example icon for 'ezra'
    }

    // Set the content of the new item based on the status
    if (status === "approved") {
        newItem.innerHTML = `
            <i class="${iconClass} icon"></i>
            <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
            <ul>
                <li class="topic"> - ${topic}${idcourse}</li>
                ${typehelp === 'sicom' && date ? `<li class="date">תאריך סיכום: ${date}</li>` : ''}
            </ul>
            <button class="help-approve-button">פרטים על הסטודנט!</button>
        `;

        newItem.querySelector('.help-approve-button').addEventListener('click', async function () {
            console.log('Click event triggered');
            const studentDetails = await getBuyerOfRequest(requestId);
            alert(`פרטי הקשר של ${studentDetails.name}:\n\nביוגרפיה: ${studentDetails.bio}\n\nטלפון: ${studentDetails.phone}\nאימייל: ${studentDetails.email}`);
        });
    } else {
        newItem.innerHTML = `
            <i class="${iconClass} icon"></i>
            <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
            <ul>
                <li class="topic">${topic}</li>
                ${typehelp === 'sicom' && date ? `<li class="date">תאריך סיכום: ${date}</li>` : ''}
            </ul>
            <button class="help-button">אני רוצה לעזור!</button>
        `;

        newItem.querySelector('.help-button').addEventListener('click', async function () {
            console.log('Click event triggered');
            try {
                const studentDetails = await getBuyerOfRequest(requestId);
                alert(`פרטי הקשר של ${studentDetails.name}:\n\nביוגרפיה: ${studentDetails.bio}\n\nטלפון: ${studentDetails.phone}\nאימייל: ${studentDetails.email}`);

                const IdSeller = localStorage.getItem('GlobalStudentID');
                const fromName = await getNameSeller(IdSeller);
                const sellerData = JSON.parse(localStorage.getItem('userData'));
                const mailSeller = sellerData.email;
                const telSeller = await getTelSeller(IdSeller);
                const message = `I can help you! This is my mail: ${mailSeller} and my phone: ${telSeller}`;
                
                console.log(`${studentDetails.email} מייל`);
                // sendEmail(studentDetails.email, studentDetails.name, fromName, message, mailSeller);

                // Update the status and add id_seller_approved in Firebase
                const updateData = {
                    status_request: "approved",
                    mail_seller_approved: mailSeller,
                    id_seller_approved: IdSeller
                };

                fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Status updated and seller approved in Firebase:', data);
                    alert("הבקשה עברה לתקיה 'בקשות מאושרות'");
                    newItem.remove();  // Remove the item from the DOM
                })
                .catch(error => {
                    console.error('Error updating Firebase:', error);
                });

            } catch (error) {
                console.error('Error fetching student details:', error);
                alert('לא ניתן להציג את פרטי הסטודנט.');
            }
        });
    }
    
    // Append the new item to course-content
    var courseContent = document.getElementById('course-content');
    courseContent.appendChild(newItem);
}


async function getNameSeller(IdSeller) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsProvidingHelp/${IdSeller}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                return data.name; // מחזיר את השם של הסטודנט
            } else {
                console.log("No student found for this ID");
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            return null;
        });
}

async function getTelSeller(IdSeller) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsProvidingHelp/${IdSeller}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                return data.tel; // מחזיר את השם של הסטודנט
            } else {
                console.log("No student found for this ID");
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            return null;
        });
}


    // var firstChild = courseContent.firstChild; // Get the first child element
    // if (firstChild) {
    //     courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
    // } else {
    //     courseContent.appendChild(newItem); // If no children, just append newItem
    // }




    

    async function getBuyerOfRequest(requestId) {
        try {
            console.log(requestId+ "בקשה")
            // שלב 1: שליפת הבקשה על בסיס ה-ID שלה
            const requestResponse = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json`);
            const requestData = await requestResponse.json();
    
            if (!requestData || !requestData.id_student) {
                throw new Error('Student ID not found in request');
            }
    
            const studentMail = requestData.id_student;
            const buyerId = await getStudentIdByEmail(studentMail, 'studentsReceivingHelp');

            console.log(studentMail)
            console.log(buyerId)
            // שלב 2: שליפת פרטי הסטודנט על בסיס הסטודנט ID שהתקבל מהבקשה
            const studentResponse = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp/${buyerId}.json`);
            const studentData = await studentResponse.json();
    
            return {
                name: studentData.name || 'לא ידוע',
                bio: studentData.aboutme || 'אין ביוגרפיה זמינה',
                phone: studentData.tel || 'לא זמין',
                email: studentData.mail || 'לא זמין'
            };
        } catch (error) {
            console.error('Error fetching student details:', error);
            throw error;
        }
    }
    

  // import emailjs from '@emailjs/browser';

emailjs.init("3tDwFwbFt57-geFOx");


function sendEmail(toEmail, toName, fromName, message, mailSeller) {
    console.log("מייל נשלח");
    console.log(toEmail, toName, fromName, message)
    console.log(mailSeller)
    emailjs.send("service_7sqzy6r", "template_hpt1elf", {
        email_buyer: toEmail,  // זהו השם שמופיע בטמפלייט שלך
        to_name: toName,
        from_name: fromName,
        message: message,
        email_seller: mailSeller 
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.error('FAILED...', error);
    });
}

