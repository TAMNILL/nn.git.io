// Wait for the DOM to load completely before attaching the event listener
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the form element exists before adding the event listener
    var form = document.getElementById('website-form');
    
    // Only proceed if the form is found
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get the form values
            var date = document.getElementById('date').value;
            var pattern = document.getElementById('pattern').value;
            var stockOut = document.getElementById('stock-out').value;
            var customerName = document.getElementById('customer-name').value;
            var vehicleNo = document.getElementById('vehicle-no').value;
            var mobile = document.getElementById('mobile').value;
            var tyreSerialNo = document.getElementById('tyre-serial-no').value;
            var price = document.getElementById('price').value;
            var remarks = document.getElementById('remarks').value;
            var salesValue = document.getElementById('sales-value').value;

            // Prepare the form data to send
            var formData = new FormData();
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
            fetch('https://script.google.com/macros/s/AKfycbyWFULMW0L0OZdPOrMZkPp8vgLSaNlbjnfNSHlsZQ751cymuTKRxqdbZpoenUUmpJp-7w/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert('Thank you for your submission!');
                form.reset(); // Reset form after submission
            })
            .catch(error => {
                alert('Error: ' + error);
            });
        });
    } else {
        console.error("Form not found!");
    }
});
