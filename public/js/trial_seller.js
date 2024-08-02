
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
        let iconClass, tooltipText;
        switch(item.type) {
            case "sicom":
                iconClass = "bi bi-sticky"
                tooltipText = "סיכום";
                break;
            case "hashlama":
                iconClass = "bi bi-journal-text";
                tooltipText = "השלמת חומר";
                break;
            default:
                iconClass = "bi bi-journal-check";
                tooltipText = "עזרה בתרגיל";
        }
        element.innerHTML = `
            <div class="icon-with-image">
                <i class="bi ${iconClass}"></i>
            </div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
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
        default:
            console.error('Unknown type:', type);
            return;
    }


    dataArray.forEach(item => {
        let element = document.createElement('div');
        element.className = "additional-item";
        
        let iconClass, tooltipText;
        switch(item.type) {
            case "sicom":
                iconClass = "bi-sticky";
                tooltipText = "סיכום";
                break;
            case "hashlama":
                iconClass = "bi-journal-text";
                tooltipText = "השלמת חומר";
                break;
            default:
                iconClass = "bi-journal-check";
                tooltipText = "עזרה בתרגיל";
        }

        element.innerHTML = `
            <div class="icon-with-image">
                <i class="bi bi-journal-check"></i>
                <span class="tooltip-text">${tooltipText}</span>
            </div>
            <div class="text-content">${item.description || item.title || item.assignment}</div>
            <div class="status">
                <i class="bi bi-check-square status-icon" onclick="handleClick(${item.studentId}, event)"></i>
            </div>`;
        
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

    event.stopPropagation();

    // Change the icon to a filled square and make it green
    const iconElement = event.target;
    iconElement.classList.remove('bi-check-square');
    iconElement.classList.add('bi-check-square-fill');
    iconElement.style.color = 'green';

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

