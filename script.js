// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as the default value for date inputs
    const today = new Date().toISOString().split('T')[0];

    // Apply today's date to all date inputs in the Stock-In and Claim-Tyres forms
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.value = today;
    });

    // Handle navbar item clicks to show the corresponding form section
    handleNavbarClicks();

    // Set default to show Stock-In form section on page load
    document.querySelector('.nav-item[data-target="stock-in"]').click();

    // Initialize the form submission handler
    handleFormSubmission();
});

// Navbar Item Click Handling
function handleNavbarClicks() {
    const navItems = document.querySelectorAll('.nav-item');
    const formSections = document.querySelectorAll('.form-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-target');

            // Hide all form sections
            formSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected form section
            document.getElementById(targetSection).style.display = 'block';

            // Add active class to the clicked navbar item
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Form Submission Handler
// Form Submission Handler
function handleFormSubmission() {
    const dataForm = document.getElementById("data-form");

    dataForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Show loading indicator
        document.getElementById("loading").style.display = "flex";

        // Collect form data
        var formData = new FormData(this);
        var data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add the form type based on the active navbar item
        const activeNavItem = document.querySelector('.nav-item.active');
        const formType = activeNavItem ? activeNavItem.getAttribute('data-target') : '';
        data['type'] = formType; // 'stock-in', 'stock-out', or 'claim-tyre'



        
        // Send data to the backend using fetch
        fetch("https://script.google.com/macros/s/AKfycbw4JJ1kIbbLqq7QaMEUoajfCCta7zakV-k4yuFprMBRBJySczUNjty3XD5F4JmYRIBy/exec", {
            method: "POST",
            body: new URLSearchParams(data),
        })
        .then(response => {
            console.log("Response:", response);
            return response.text();
        })
        .then(responseText => {
            console.log("Response Text:", responseText);
            document.getElementById("response").textContent = responseText;
        
            // Hide loading indicator
            document.getElementById("loading").style.display = "none";
        
            // Reset the form after successful submission
            dataForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("response").textContent = "Error submitting data!";
            document.getElementById("loading").style.display = "none";
        });
        
    });
}


// Function to Format Date to dd/mm/yyyy
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();
    
    return ${day} -${month} -${year};
}

// Dashboard Data Fetching Function
function fetchGoogleSheetData() {
    const sheetUrl = "https://script.google.com/macros/s/AKfycbyr4zgPO-14_I1CnKo7PB37qonI9V-e26WkIkaYA3kryP0t9AtRmh-oOuC2K8wEPa8/exec";

    // Fetch data from Google Sheets
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            const entries = data.feed.entry;
            let tableHTML = '<table class="dashboard-table"><thead><tr>';

            // Extract headers from the first entry
            for (let key in entries[0]) {
                if (key.startsWith('gsx$')) { // Fields from Google Sheets start with "gsx$"
                    tableHTML += <th>${key.replace('gsx$', '').toUpperCase()}</th>;
                }
            }
            tableHTML += '</tr></thead><tbody>';

            // Loop through the entries and create table rows
            entries.forEach(entry => {
                tableHTML += '<tr>';
                for (let key in entry) {
                    if (key.startsWith('gsx$')) {
                        tableHTML += <td>${entry[key]['$t']}</td>;
                    }
                }
                tableHTML += '</tr>';
            });

            tableHTML += '</tbody></table>';

            // Insert the table into the dashboard content area
            document.getElementById('dashboard-content').innerHTML = tableHTML;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('dashboard-content').innerHTML = '<p>Unable to load data. Please try again later.</p>';
        });
}
