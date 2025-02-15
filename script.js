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
    const url = "https://script.google.com/macros/s/AKfycbyAz36pesG4S8DRxz_pqmbWRBM7F92vmQh8VrX8wS1-fshnvRTVRraJqREw6-AIEium5g/exec";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("status").innerText = "Data updated successfully!";
        document.getElementById("updateForm").reset();
    })
    .catch(error => {
        document.getElementById("status").innerText = "Error updating data.";
        console.error("Error:", error);
    });
});
