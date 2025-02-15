document.getElementById("updateForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const formData = {
        date: document.getElementById("date").value,
        pattern: document.getElementById("pattern").value,
        stockOut: document.getElementById("stockOut").value,
        customerName: document.getElementById("customerName").value,
        vehicleNo: document.getElementById("vehicleNo").value,
        mobile: document.getElementById("mobile").value,
        tyreSerialNo: document.getElementById("tyreSerialNo").value,
        price: document.getElementById("price").value,
        remarks: document.getElementById("remarks").value,
        salesValue: document.getElementById("salesValue").value
    };

    // Prepare data to send via POST request
    const url = "https://script.google.com/macros/s/AKfycbzJ0Tl8mvK7vgNlzVF8JBO0jIRCzMWNwmh9T5YpyF8RZh7bI5s2VW89KsqCSelb5m9ikw/exec";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        console.log("Response from server:", data); // Log the response
        if (data.result === "Success") {
            document.getElementById("status").innerText = "Data updated successfully!";
            document.getElementById("updateForm").reset();
        } else {
            document.getElementById("status").innerText = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        console.error("Error:", error);  // Log any error to the console
        document.getElementById("status").innerText = "Error updating data.";
    });
});
