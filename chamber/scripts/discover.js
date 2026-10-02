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

import { itemsOfInterest } from "../data/data/discover.mjs";

const gridContainer = document.querySelector('.discover-grid');

itemsOfInterest.forEach(item => {
    const card = document.createElement('section');
    card.classname = 'discover-card';

    card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button type="button">Learn More</button>
    `;
    gridContainer.appendChild(card);
});

const messageBox = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastChamberVisit');
const now = Date.now();

if (!lastVisit) {
    messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msBetween = now - parseInt(lastVisit);
    const daysBetween = Math.floor(msBetween / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
        messageBox.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageBox.textContent = "You last visited 1 day ago";
    } else {
        messageBox.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem('lastChamberVisit', now);