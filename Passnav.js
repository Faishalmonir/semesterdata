"use strict"; // Enable strict mode for improved code quality

document.addEventListener("DOMContentLoaded", function () {
    // This code runs after the page is fully loaded.

    function checkPassword() {
        const enteredPassword = document.getElementById("password").value;
        const validPasswords = ["22101235", "22101870"]; // Add your passwords here

        if (validPasswords.includes(enteredPassword)) {
            // Redirect to the protected page for both passwords
            window.location.href = "Navigator.html";
        } else {
            alert("Incorrect password. Please try again.");
        }
    }

    // Attach the checkPassword function to the button click event
    const submitButton = document.querySelector("button");
    submitButton.addEventListener("click", checkPassword);

    // Add an event listener for the "keydown" event on the password input field
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            submitButton.click(); // Trigger the submit button click
        }
    });
});
