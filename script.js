 document.getElementById("updateForm").addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
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

      // Send the data to Google Apps Script using fetch
      const url = "https://script.google.com/macros/s/AKfycbxIDspQE2DAF0Jr4xAsiLDwgmcm4s0_8a6uPK5p2vnQK3jsAsHgQ-NoAYQSx4uQHMx2zw/exec";  // Replace with your web app URL

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === "Success") {
          document.getElementById("status").innerText = "Data updated successfully!";
          document.getElementById("updateForm").reset();
        } else {
          document.getElementById("status").innerText = `Error: ${data.message}`;
        }
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("status").innerText = "Error updating data.";
      });
    });
