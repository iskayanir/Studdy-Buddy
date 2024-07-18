
// import buyers_students from './seller-profile.js';
import { buyers_students, seller_students } from './seller-profile.js';
const course1 = [
    {
      id: 1,
      type: "sicom",
      subject: "מתמטיקה",
      title: "סיכום יחידה 1",
      content: "סיכום של נושאים כולל משוואות ופונקציות.",
      studentId: 104
    },
    {
      id: 2,
      type: "homework",
      subject: "היסטוריה",
      title: "תרגיל 5 תקופת הרנסאנס",
      content: "סקירה כללית על התקופה והשפעותיה.",
      studentId: 105
    }
];

const course2 = [
    {
      id: 1,
      type: "hashlama",
      subject: "אלגברה",
      title: "עזרה בפתרון משוואות",
      studentId: 101 // מזהה הסטודנט שביקש את העזרה
    },
    {
      id: 2,
      type: "homework",
      subject: "פיזיקה",
      title: "תרגיל 2 - הבנת חוקי ניוטון",
      studentId: 102
    },
    {
      id: 3,
      type: "sicom",
      subject: "כימיה",
      title: "סיכום בכימיה אורגנית",
      studentId: 103
    }
];

const course3 = [
    {
      id: 1,
      type: "sicom",
      subject: "ביולוגיה",
      title: "סיכום דפוסי שינה בקרב בעלי חיים",
      dueDate: "2024-07-30",
      studentId: 106
    },
    {
      id: 2,
      type: "hashlama",
      subject: "אנגלית",
      title: "השלמת חומר - חשיבות השפה האנגלית גלובלית",
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
            <div class="text-content">${item.title}</div>
            <div class="status">
                <div class="status-icon">✔</div>
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
            <div class="icon">👤</div>
            <img src="images/iconsicom.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">סיכום</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <div class="status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'>✔</div>
            </div>`;
        } else if (typehelp === "hashlama") {
            element.innerHTML = `
            <div class="icon-with-image">
            <div class="icon">👤</div>
            <img src="images/iconhashlama.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">השלמת חומר</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <div class="status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'>✔</div>
            </div>`;
        } else {
            element.innerHTML = `
            <div class="icon-with-image">
            <div class="icon">👤</div>
            <img src="images/iconhomework.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">עזרה בתרגיל</span>
            </div>
            <div class="text-content">${item.title}</div>
            <div class="status">
                <div class="status-icon" onclick='handleClick(${JSON.stringify(item)}, "${element.id}", "${type}")'>✔</div>
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


