
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


