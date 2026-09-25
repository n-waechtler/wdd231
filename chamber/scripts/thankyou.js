const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
}

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu")

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle("open");
        if (navMenu.classList.contains("open")) {
            menuButton.textContent = "x";
        } else {
            menuButton.textContent = "≡";
        }
    });
}

const urlParams = new URLSearchParams(window.location.search);

const detailsContainer = document.getElementById("submission-details");

const requiredFields = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Mobile Number",
    "organization": "Business Name",
    "timestamp": "Application Timestamp"
};

let output = "<ul>";
for (const [key, label] of Object.entries(requiredFields)) {
    let value = urlParams.get(key);
    if (value) {
        value = decodeURIComponent(value);
        output += `<li><strong>${label}:</strong> ${value}</li>`;
    }
}
output += "</ul>";

detailsContainer.innerHTML = output;