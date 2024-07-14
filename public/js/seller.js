
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
      topic: "אלגברה",
      description: "עזרה בפתרון משוואות",
      studentId: 101 // מזהה הסטודנט שביקש את העזרה
    },
    {
      id: 2,
      type: "homework",
      topic: "פיזיקה",
      description: "תרגיל 2 - הבנת חוקי ניוטון",
      studentId: 102
    },
    {
      id: 3,
      type: "sicom",
      topic: "כימיה",
      description: "סיכום בכימיה אורגנית",
      studentId: 103
    }
];

const course3 = [
    {
      id: 1,
      type: "sicom",
      subject: "ביולוגיה",
      assignment: "סיכום דפוסי שינה בקרב בעלי חיים",
      dueDate: "2024-07-30",
      studentId: 106
    },
    {
      id: 2,
      type: "hashlama",
      subject: "אנגלית",
      assignment: "השלמת חומר - חשיבות השפה האנגלית גלובלית",
      dueDate: "2024-08-05",
      studentId: 107
    }
];

const archive =[]

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
        default:
            console.error('Unknown type:', type);
            return;
    }

    dataArray.forEach(item => {
        let element = document.createElement('div');
        element.className = "additional-item";
        var typehelp = item.type
        if(typehelp === "sicom"){
            element.innerHTML = `
            <div class="icon-with-image">
            <div class="icon">👤</div>
            <img src="images/iconsicom.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">סיכום</span>
            </div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <div class="status-icon" onclick="handleClick(${item.studentId})">✔</div>
            </div>`;
        }else if(typehelp === "hashlama"){
            element.innerHTML = `
            <div class="icon-with-image">
            <div class="icon">👤</div>
            <img src="images/iconhashlama.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">השלמת חומר</span>
            </div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <div class="status-icon" onclick="handleClick(${item.studentId})">✔</div>
            </div>`;
        }else{
            element.innerHTML = `
            <div class="icon-with-image">
            <div class="icon">👤</div>
            <img src="images/iconhomework.svg" alt="icon" class="icon-image"/>
            <span class="tooltip-text">עזרה בתרגיל</span>
            </div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <div class="status-icon" onclick="handleClick(${item.studentId})">✔</div>
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


