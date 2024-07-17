document.getElementById('searchInput').addEventListener('input', filterItems);
        document.getElementById('teacherInput').addEventListener('input', filterItems);

        function filterItems() {
            const courseInput = document.getElementById('searchInput').value.toLowerCase();
            const teacherInput = document.getElementById('teacherInput').value.toLowerCase();
            const gridItems = document.querySelectorAll('.grid-item');

            gridItems.forEach(item => {
                const courseName = item.querySelector('h2').textContent.toLowerCase();
                const teacherName = item.querySelector('.teacher').textContent.toLowerCase();

                const courseMatch = courseName.includes(courseInput);
                const teacherMatch = teacherName.includes(teacherInput);

                if (courseMatch && teacherMatch) {
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
                item.style.display = 'block';});
            }


            function fetchData() {
                console.log("hello before");
                fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/.json')
                .then(response => response.json())
                .then(data => {
                  const gridContainer = document.getElementById('gridContainer');
                  gridContainer.innerHTML = ''
                                   
                  Object.keys(data.courses).forEach(key => {
                    const course = data.courses[key];
            
                    const gridItem = document.createElement('div');
                    gridItem.classList.add('grid-item');
            
                    gridItem.innerHTML = `
                      <h2 class="course-name">${course['Course Name']}</h2>
                      <i class="bi bi-mortarboard icon"></i>
                      <ul>
                        <li class="faculty">פקולטה: ${course.Faculty}</li>
                        <li class ="department"> חוג: ${course.Department}</li>
                        <li class="teacher">מרצה: ${course['Lacture Name']}</li>
                      </ul>
                      <button class="add" onclick="ad   dCourse()">הוסף קורס</button>
                    `;
            
                    gridContainer.appendChild(gridItem);
                  });
                })
                .catch(error => console.error('Error fetching data:', error));
            }