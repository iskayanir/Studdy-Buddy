// search for course name in grid-items and leave visible only 
// courses matching search input


document.getElementById('searchInput').addEventListener('input', function() {
    var input, filter, gridContainer, gridItems, h2, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value;
    gridContainer = document.getElementById('gridContainer');
    gridItems = gridContainer.getElementsByClassName('grid-item');
    for (i = 0; i < gridItems.length; i++) {
        h2 = gridItems[i].getElementsByTagName('h2')[0];
        if (h2) {
            txtValue = h2.textContent || h2.innerText;
            if (txtValue.indexOf(filter) > -1 || filter === "") {
                gridItems[i].style.display = '';
            } else {
                gridItems[i].style.display = 'none';
            }
        }
    }
});

// on click shows all courses
function filterAll(){
    const gridItems = document.querySelectorAll('.grid-item'); 
    gridItems.forEach(item =>{
         item.style.display = 'block';
        })
}

// on click shows only courses from buttons faculty
function filterFaculty(faculty) {
    // Get all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Loop through all grid items
    gridItems.forEach(item => {
        // Get the faculty text from the grid item
        const facultyText = item.querySelector('.faculty').textContent;
        
        // Check if the faculty text matches the button text
        if (facultyText.includes(faculty)) {
            // Show the grid item
            item.style.display = 'block';
        
        } else {
            // Hide the grid item
            item.style.display = 'none';
        }
    });
}