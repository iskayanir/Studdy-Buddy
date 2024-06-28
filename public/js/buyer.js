const { or } = require("firebase/firestore");
var helptype = "";
var topic = "";
var date = "";

function toggleSearchField(typehelp) {
    var buttons = [
        { id: 'sicom', white: 'images/sicomwhite.svg', purple: 'images/sicompurple.svg' },
        { id: 'hashlama', white: 'images/hashlamawhite.svg', purple: 'images/hashlamapurple.svg' },
        { id: 'ezra', white: 'images/targilwhite.svg', purple: 'images/targilpurple.svg' }
    ];

    buttons.forEach(function(button) {
        var img = document.getElementById(button.id).querySelector('img');
        if (button.id === typehelp) {
            img.src = button.purple;
        } else {
            img.src = button.white;
        }
    }); 

    // מציאת אלמנט ה-<div> שבו נרצה להוסיף את שדה החיפוש
    var additionalFieldsDiv = document.getElementById('additionalFields');
    var additionalFieldsDiv1 = document.getElementById('additionalFields1');

    // בדיקה אם שדה החיפוש קיים
    var existingSearchField = document.getElementById('toggleSearchField');
    var existingSearchField1 = document.getElementById('toggleSearchField1');

    var inpu = document.getElementById("datefield")

    //בדיקה אם מדובר בסיכום
    if (typehelp === "sicom") {
        //הסרת שדה חיפוש אם קיים
        if (existingSearchField1) {
            if (inpu){ 
                additionalFieldsDiv.removeChild(existingSearchField);
                additionalFieldsDiv1.removeChild(existingSearchField1);
            }else{
                additionalFieldsDiv.removeChild(existingSearchField);
                additionalFieldsDiv1.removeChild(existingSearchField1);
                 // יצירת שדה חיפוש חדש
                var searchField = document.createElement('input');
                searchField.type = 'text';
                searchField.placeholder = 'נושא...';
                searchField.className = 'search-input';
                searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש
                // יצירת שדה חיפוש חדש תאריך
                var searchField1 = document.createElement('input');
                searchField1.type = 'text';
                searchField1.placeholder = 'תאריך...';
                searchField1.className = 'search-input';
                searchField1.id = 'datefield'; // קביעה ID לשדה החיפוש
                // יצירת כפתור שמור
                var searchButton = document.createElement('button');
                searchButton.textContent = 'שמור';
                searchButton.className = 'search-button';
                searchButton.onclick = function() {
                    if (searchField) {
                        topic = searchField.value;
                        date =searchField1.value
                        // Create new item element
                        var newItem = document.createElement('div');
                        newItem.className = 'item';
                        
                        var summarySpan = document.createElement('span');
                        summarySpan.textContent = 'סיכום - ';

                        var dateSpan = document.createElement('span');
                        dateSpan.textContent = date;
            
                        var fractionSpan = document.createElement('span');
                        fractionSpan.textContent = topic;
            
                        var statusDiv = document.createElement('div');
                        statusDiv.className = 'status';
                        
                        var statusIconDiv = document.createElement('div');
                        statusIconDiv.className = 'status-icon';
                        statusIconDiv.textContent = '✔';
            
                        // Append the status icon to the status div
                        statusDiv.appendChild(statusIconDiv);
            
                        // Append spans and status div to the new item
                        newItem.appendChild(summarySpan);
                        newItem.appendChild(fractionSpan);
                        newItem.appendChild(dateSpan);
                        newItem.appendChild(statusDiv);
            
                        // Append the new item to course-content
                        var courseContent = document.querySelector('.course-content');
                        courseContent.appendChild(newItem);
            
                        // Optionally remove the search fields if needed
                        // additionalFieldsDiv.removeChild(existingSearchField);
                        // additionalFieldsDiv1.removeChild(existingSearchField1);
                    } else {
                        alert("Search field not found");
                    }
                    existingSearchField = document.getElementById('toggleSearchField')
                    existingSearchField1 = document.getElementById('toggleSearchField1');
                    additionalFieldsDiv.removeChild(existingSearchField);
                    additionalFieldsDiv1.removeChild(existingSearchField1);
                };

                // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
                var searchContainer = document.createElement('div');
                searchContainer.id = 'toggleSearchField';
                searchContainer.appendChild(searchField);

                // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
                var searchContainer1 = document.createElement('div');
                searchContainer1.id = 'toggleSearchField1';
                searchContainer1.appendChild(searchField1);
                searchContainer1.appendChild(searchButton);

                // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
                additionalFieldsDiv.appendChild(searchContainer);
                additionalFieldsDiv1.appendChild(searchContainer1);

            }
            
        }else{
            if (existingSearchField){
                additionalFieldsDiv.removeChild(existingSearchField);}
                // יצירת שדה חיפוש חדש
            var searchField = document.createElement('input');
            searchField.type = 'text';
            searchField.placeholder = 'נושא...';
            searchField.className = 'search-input';
            searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש
            // יצירת שדה חיפוש חדש תאריך
            var searchField1 = document.createElement('input');
            searchField1.type = 'text';
            searchField1.placeholder = 'תאריך...';
            searchField1.className = 'search-input';
            searchField1.id = 'datefield'; // קביעה ID לשדה החיפוש
            // יצירת כפתור שמור
            var searchButton = document.createElement('button');
            searchButton.textContent = 'שמור';
            searchButton.className = 'search-button';
            searchButton.onclick = function() {
                if (searchField) {
                    topic = searchField.value;
                    date =searchField1.value
                    // Create new item element
                    var newItem = document.createElement('div');
                    newItem.className = 'item';
                    
                    var summarySpan = document.createElement('span');
                    summarySpan.textContent = 'סיכום - ';
    
                    var dateSpan = document.createElement('span');
                    dateSpan.textContent = date;
        
                    var fractionSpan = document.createElement('span');
                    fractionSpan.textContent = topic;
        
                    var statusDiv = document.createElement('div');
                    statusDiv.className = 'status';
                    
                    var statusIconDiv = document.createElement('div');
                    statusIconDiv.className = 'status-icon';
                    
                    // Create the checkbox and custom styles
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'status-checkbox';
                    checkbox.id = 'statusCheckbox';
                    
                    var customCheckbox = document.createElement('label');
                    customCheckbox.className = 'custom-checkbox';
                    customCheckbox.htmlFor = 'statusCheckbox';

                    statusIconDiv.appendChild(checkbox);
                    statusIconDiv.appendChild(customCheckbox);

                    // Append the status icon to the status div
                    statusDiv.appendChild(statusIconDiv);
                    
                    // Append spans and status div to the new item
                    newItem.appendChild(summarySpan);
                    newItem.appendChild(fractionSpan);
                    newItem.appendChild(dateSpan);
                    newItem.appendChild(statusDiv);
        
                    // Append the new item to course-content
                    var courseContent = document.querySelector('.course-content');
                    courseContent.appendChild(newItem);
        
                    // Optionally remove the search fields if needed
                    // additionalFieldsDiv.removeChild(existingSearchField);
                    // additionalFieldsDiv1.removeChild(existingSearchField1);
                } else {
                    alert("Search field not found");
                }
                existingSearchField = document.getElementById('toggleSearchField')
                existingSearchField1 = document.getElementById('toggleSearchField1');
                additionalFieldsDiv.removeChild(existingSearchField);
                additionalFieldsDiv1.removeChild(existingSearchField1);
            };
    
            // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
            var searchContainer = document.createElement('div');
            searchContainer.id = 'toggleSearchField';
            searchContainer.appendChild(searchField);
    
            // יצירת <div> כדי להחזיק את שדה החיפוש ואת כפתור החיפוש
            var searchContainer1 = document.createElement('div');
            searchContainer1.id = 'toggleSearchField1';
            searchContainer1.appendChild(searchField1);
            searchContainer1.appendChild(searchButton);
    
            // הוספת <div> המכיל את שדה החיפוש והכפתור ל-div המקורי
            additionalFieldsDiv.appendChild(searchContainer);
            additionalFieldsDiv1.appendChild(searchContainer1);

        }        
               
    } else {
        if (existingSearchField1) {
            var inp = existingSearchField1.querySelector('input')
            existingSearchField1.removeChild(inp)
        } else {
            if (existingSearchField) {
                additionalFieldsDiv.removeChild(existingSearchField);}
            // יצירת שדה חיפוש חדש
            var searchField = document.createElement('input');
            searchField.type = 'text';
            searchField.placeholder = 'נושא...';
            searchField.className = 'search-input';
            searchField.id = 'toggleSearchField'; // קביעה ID לשדה החיפוש
            }
        // יצירת כפתור שמור
        var searchButton = document.createElement('button');
        searchButton.textContent = 'שמור';
        searchButton.className = 'search-button';
        searchButton.onclick = function() {
            if (searchField) {
            topic = searchField.value;
                
            // Create new item element
            var newItem = document.createElement('div');
            newItem.className = 'item';
            
            if (typehelp === 'hashlama'){
                var summarySpan = document.createElement('span');
                summarySpan.textContent = 'השלמת נושא - ';
            }else{
                var summarySpan = document.createElement('span');
                summarySpan.textContent = 'עזרה בתרגיל בית - ';
            }
            

            var fractionSpan = document.createElement('span');
            fractionSpan.textContent = topic;

            var statusDiv = document.createElement('div');
            statusDiv.className = 'status';
            
            var statusIconDiv = document.createElement('div');
            statusIconDiv.className = 'status-icon';
            
            // Create the checkbox and custom styles
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'status-checkbox';
            checkbox.id = 'statusCheckbox';
            
            var customCheckbox = document.createElement('label');
            customCheckbox.className = 'custom-checkbox';
            customCheckbox.htmlFor = 'statusCheckbox';

            statusIconDiv.appendChild(checkbox);
            statusIconDiv.appendChild(customCheckbox);

            // Append the status icon to the status div
            statusDiv.appendChild(statusIconDiv);

            // Append spans and status div to the new item
            newItem.appendChild(summarySpan);
            newItem.appendChild(fractionSpan);
            newItem.appendChild(statusDiv);
            

            // Append the new item to course-content
            var courseContent = document.querySelector('.course-content');
            courseContent.appendChild(newItem);

            // Optionally remove the search fields if needed
            // additionalFieldsDiv.removeChild(existingSearchField);
            // additionalFieldsDiv1.removeChild(existingSearchField1);
        
        } else {
            alert("Search field not found");
        }
        existingSearchField = document.getElementById('toggleSearchField')
        existingSearchField1 = document.getElementById('toggleSearchField1');
        additionalFieldsDiv.removeChild(existingSearchField);
        additionalFieldsDiv1.removeChild(existingSearchField1);
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
