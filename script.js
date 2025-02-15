// Ensure that the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('website-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        let date = document.getElementById('date').value;
        let pattern = document.getElementById('pattern').value;
        let stockOut = document.getElementById('stock-out').value;
        let customerName = document.getElementById('customer-name').value;
        let vehicleNo = document.getElementById('vehicle-no').value;
        let mobile = document.getElementById('mobile').value;
        let tyreSerialNo = document.getElementById('tyre-serial-no').value;
        let price = document.getElementById('price').value;
        let remarks = document.getElementById('remarks').value;
        let salesValue = document.getElementById('sales-value').value;

        // Prepare data to send
        let formData = new FormData();
        formData.append("date", date);
        formData.append("pattern", pattern);
        formData.append("stock_out", stockOut);
        formData.append("customer_name", customerName);
        formData.append("vehicle_no", vehicleNo);
        formData.append("mobile", mobile);
        formData.append("tyre_serial_no", tyreSerialNo);
        formData.append("price", price);
        formData.append("remarks", remarks);
        formData.append("sales_value", salesValue);

        // Send the data to Apps Script using fetch
        fetch('https://script.google.com/macros/s/AKfycbyUgEZCL3f3G6lel6KkVOKgclbmLNmUj8wWp5DaZqo6ZiiqnhyTQo8Wp9rf1foYxKfeFA/exec', {
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
});
