// Make an AJAX request to get the properties data
var xhr = new XMLHttpRequest()
const token = localStorage.getItem('token');
var loginForm;
window.onload = function () {

    loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'login.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    var token = response.token;

                    localStorage.setItem('token', token);
                    window.location.href = 'account.html';
                } else {
                    const errorDiv = document.createElement('div');
                    errorDiv.textContent = 'Invalid username or password.';
                    loginForm.appendChild(errorDiv);
                }
            } else {
                console.error(`Error checking login: ${xhr.status}`);
            }
        };
        xhr.send(`username=${username}&password=${password}`);
    });
}


xhr.open('POST', 'login.php');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
            window.location.href = '/realestate/account.html';
        } else {
        }
    } else {
        console.error(`Error checking login: ${xhr.status}`);
    }
};
xhr.send(`token=` + token);