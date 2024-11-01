document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const alertMessage = document.getElementById('alertMessage');
        const emailField = event.target.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset alert display
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('alert-success', 'alert-danger');
        alertMessage.textContent = ''; 

        if (!emailRegex.test(emailField.value)) {
            alertMessage.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
            alertMessage.classList.remove('d-none');
            alertMessage.classList.add('alert-danger');
            emailField.focus();
        } else {
            alertMessage.textContent = "Form đã được gửi thành công!";
            alertMessage.classList.remove('d-none');
            alertMessage.classList.add('alert-success');
        }
    });
});