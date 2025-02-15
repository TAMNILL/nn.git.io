document.getElementById('website-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Prepare data to send
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    // Send the data to Apps Script using fetch
    fetch('https://script.google.com/macros/s/AKfycbzsjL1Gy8wzS4bqmzERzRE_z-h_1gjThJECvgK-VO3uhOfrQSKVZAWHyL1YU4zysK2UUQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Thank you for your submission!');
        document.getElementById('website-form').reset();
    })
    .catch(error => {
        alert('Error: ' + error);
    });
});
