document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as the default value for the 'date' field
    var today = new Date();
    var dateInput = document.getElementById('date');
    var formattedDate = today.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    dateInput.value = formattedDate; // Set today's date in the input

    // Set default value for 'stock-out'
    var stockOutInput = document.getElementById('stock-out');
    stockOutInput.value = '1'; // Default value for stock-out

    var form = document.getElementById('website-form');
    var submitButton = document.getElementById('submit-button');
    var loadingIndicator = document.getElementById('loading-indicator');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the submit button and change its color
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ccc'; // Change button color
        submitButton.style.cursor = 'not-allowed'; // Change cursor to indicate it's disabled

        // Show loading indicator
        loadingIndicator.style.display = 'block';

        // Collect form data
        var formData = new FormData(form);

        // Send the form data to the Apps Script URL using fetch
        fetch('https://script.google.com/macros/s/AKfycbx2XFIj8XUpFSJ8yYP3t1iuXXwZCcp08G0xLyt61Q_Qha55BcK2z3em63rJZA-vR4tukQ/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Hide loading indicator after the request completes
            loadingIndicator.style.display = 'none';

            // Provide feedback to the user
            alert('Form submitted successfully!');

            // Reset form after submission
            form.reset();

            // Enable the submit button again
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#4CAF50'; // Reset button color
            submitButton.style.cursor = 'pointer'; // Reset cursor
        })
        .catch(error => {
            // Hide loading indicator and provide feedback on error
            loadingIndicator.style.display = 'none';
            alert('Error: ' + error);

            // Enable the submit button again in case of an error
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '#4CAF50';
            submitButton.style.cursor = 'pointer';
        });
    });
});

// Event listeners to switch between sections
document.getElementById('stock-in-link').addEventListener('click', function() {
    showSection('stock-in-content');
});
document.getElementById('stock-dashboard-link').addEventListener('click', function() {
    showSection('stock-dashboard-content');
});
document.getElementById('stock-out-link').addEventListener('click', function() {
    showSection('stock-out-content');
});
document.getElementById('claim-details-link').addEventListener('click', function() {
    showSection('claim-details-content');
});

// Show the selected content and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

// Stock In Form Submission
document.getElementById('stock-in-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const stockInData = {
        item: document.getElementById('stock-in-item').value,
        quantity: document.getElementById('stock-in-quantity').value
    };

    // Call Google Apps Script to save to Sheet2
    google.script.run.saveStockInData(stockInData);
    alert('Stock In Data Submitted!');
});

// Stock Out Form Submission
document.getElementById('stock-out-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const stockOutData = {
        item: document.getElementById('stock-out-item').value,
        quantity: document.getElementById('stock-out-quantity').value
    };

    // Call Google Apps Script to save to Sheet3
    google.script.run.saveStockOutData(stockOutData);
    alert('Stock Out Data Submitted!');
});

  // Function to show the correct content based on the clicked link
        function showContent(contentId) {
            // Hide all content sections
            const contentSections = document.querySelectorAll('.content');
            contentSections.forEach(function(section) {
                section.style.display = 'none';
            });

            // Show the clicked content section
            const contentToShow = document.getElementById(contentId);
            contentToShow.style.display = 'block';
        }

        // Event listeners for navbar links
        document.getElementById('stock-in-link').addEventListener('click', function() {
            showContent('stock-in-content');
        });
        document.getElementById('stock-dashboard-link').addEventListener('click', function() {
            showContent('stock-dashboard-content');
        });
        document.getElementById('stock-out-link').addEventListener('click', function() {
            showContent('stock-out-content');
        });
        document.getElementById('claim-details-link').addEventListener('click', function() {
            showContent('claim-details-content');
        });
