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
        fetch('https://script.google.com/macros/s/AKfycbyWFULMW0L0OZdPOrMZkPp8vgLSaNlbjnfNSHlsZQ751cymuTKRxqdbZpoenUUmpJp-7w/exec', {
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
