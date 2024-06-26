function toggleSearchField() {
    // מציאת אלמנט ה-<div> שבו נרצה להוסיף את שדה החיפוש
    var additionalFieldsDiv = document.getElementById('additionalFields');

    // בדיקה אם שדה החיפוש כבר קיים
    var existingSearchField = document.getElementById('toggleSearchField');

    if (existingSearchField) {
        // אם שדה החיפוש קיים, הסר אותו
        additionalFieldsDiv.removeChild(existingSearchField);
    } else {
        // יצירת שדה חיפוש חדש
        var searchField = document.createElement('input');
        searchField.type = 'text';
        searchField.placeholder = 'הזן נושא לחיפוש...';
        searchField.className = 'search-input';
        searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש

        // יצירת כפתור חיפוש חדש
        var searchButton = document.createElement('button');
        searchButton.textContent = 'חפש';
        searchButton.className = 'search-button';
        searchButton.onclick = function() {
            alert('חיפוש אחר: ' + searchField.value);
        };

        // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
        var searchContainer = document.createElement('div');
        searchContainer.id = 'toggleSearchField';
        searchContainer.appendChild(searchField);
        searchContainer.appendChild(searchButton);

        // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
        additionalFieldsDiv.appendChild(searchContainer);
    }
}
