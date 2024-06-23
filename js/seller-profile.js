    const searchBar = document.querySelector('#search')
    searchBar.addEventListener('keyup', searchCourse);

    function searchCourse(event) {
      const text = event.target.value.toLowerCase();
      const courseList = document.querySelectorAll('.yourListClassNames .user');

      document.querySelectorAll('.courses').forEach(function(user){

        const userName = user.querySelector('.course').innerText

        if(userName.toLowerCase().indexOf(text) != -1) {
          user.style.display = 'block'
        } else {
          user.style.display = 'none'
        }
      });
    }