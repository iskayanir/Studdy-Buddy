
function filterItems() {

    const gridItems = document.querySelectorAll('.grid-item');
    const courseInput = document.getElementById('searchInput').value.toLowerCase();
    const teacherInput = document.getElementById('teacherInput').value.toLowerCase();
    const departmentInput = document.getElementById('departmentInput').value.toLowerCase();
    const coursenumberinput = document.getElementById('coursenumberinput').value;    
    
    gridItems.forEach(item => {
        const courseName = item.querySelector('h2').textContent.toLowerCase();
        const teacherName = item.querySelector('.teacher').textContent.toLowerCase();
        const departmentName = item.querySelector('.department').textContent.toLowerCase();
        const coursenumber = item.querySelector('.course-id').textContent;

        
        const courseMatch = courseName.includes(courseInput);
        const teacherMatch = teacherName.includes(teacherInput);
        const departmentMatch = departmentName.includes(departmentInput);
        const numberMatch = coursenumber.includes(coursenumberinput);

        
            if (courseMatch && teacherMatch && departmentMatch && numberMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
    });
        }


function filterFaculty(faculty) {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const facultyText = item.querySelector('.faculty').textContent;

        if (facultyText.includes(faculty)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterAll(){
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
    item.style.display = 'block';
    });
}
       
