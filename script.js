// Select the theme toggle button
const themeToggleButton = document.getElementById('themeToggle');

// Add event listener for button click
themeToggleButton.addEventListener('click', () => {
    // Toggle the "dark-mode" class on the body element
    document.body.classList.toggle('dark-mode');

    // Optional: Save the current theme in localStorage to persist it across sessions
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Automatically apply the saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    startClock(); // Start the clock
});

// Function to start the interactive clock
function startClock() {
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date(); // Get current date and time
        const hours = String(now.getHours()).padStart(2, '0'); // Format hours as 2 digits
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Format minutes as 2 digits
        const seconds = String(now.getSeconds()).padStart(2, '0'); // Format seconds as 2 digits
        clockElement.textContent = `${hours}:${minutes}:${seconds}`; // Update clock text
    }

    updateClock(); // Update clock immediately on load
    setInterval(updateClock, 1000); // Update clock every second
}
document.getElementById('submitForm').addEventListener('click', () => {
    // Collect input values
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const num3 = parseFloat(document.getElementById('num3').value);
    const num4 = parseFloat(document.getElementById('num4').value);
    const num5 = parseFloat(document.getElementById('num5').value);

    // Input validation
    if (!validateEmail(email)) {
        alert("Klaida: Neteisingas el. pašto adresas!");
        return;
    }
    if (!validatePhone(phone)) {
        alert("Klaida: Neteisingas telefono numeris!");
        return;
    }
    if (address === "") {
        alert("Klaida: Adreso laukas negali būti tuščias!");
        return;
    }

    // Combine address fields into one line
    const combinedAddress = `Adresas: ${address}, Telefonas: ${phone}, El. paštas: ${email}`;

    // Calculate average
    const average = ((num1 + num2 + num3 + num4 + num5) / 5).toFixed(2);

    // Output data to the page
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <p><strong>Vardas Pavardė:</strong> ${name} ${surname}</p>
        <p><strong>Adresas ir kontaktai:</strong> ${combinedAddress}</p>
        <h3>Požymiai:</h3>
        <ul>
            <li>Požymis 1: ${num1}</li>
            <li>Požymis 2: ${num2}</li>
            <li>Požymis 3: ${num3}</li>
            <li>Požymis 4: ${num4}</li>
            <li>Požymis 5: ${num5}</li>
        </ul>
    `;

    // Display average with color based on value
    const avgOutputDiv = document.getElementById('averageOutput');
    avgOutputDiv.innerHTML = `<p><strong>Vidurkis:</strong> <span id="averageText">${average}</span></p>`;

    // Apply color based on average value
    const averageText = document.getElementById('averageText');
    if (average < 5) {
        averageText.style.color = "red";
    } else if (average >= 5 && average <= 7) {
        averageText.style.color = "orange";
    } else {
        averageText.style.color = "green";
    }
});

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate phone
function validatePhone(phone) {
    const phonePattern = /^[0-9\-\+\s\(\)]{7,15}$/; // Accepts digits, dashes, spaces, plus, and parentheses
    return phonePattern.test(phone);
}

