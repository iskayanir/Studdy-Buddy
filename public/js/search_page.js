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