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

const memberSource = "data/members.json";
const cardWrapper = document.querySelector('#spotlight-cards');

async function fetchSpotlightMembers() {
    try {
        const response = await fetch(memberSource);
        if (!response.ok) {
            throw new Error("Could not load the membership data registry.");
        }
        const memberList = await response.json();

        const premiumMembers = memberList.filter(company => company.membershipLevel === "3" || company.membershipLevel === "2");

        const shuffledOrder = premiumMembers.sort(() => 0.5 - Math.random());

        const chosenSpotlights = shuffledOrder.slice(0, 3);

        generateSpotlightCards(chosenSpotlights);
    } catch (error) {
        console.error("Spotlight Generation Failed:", error);
    }
}

function generateSpotlightCards(selectedCompanies) {
    cardWrapper.innerHTML = "";

    selectedCompanies.forEach(company => {
        const itemCard = document.createElement('section');
        itemCard.className = 'spotlight-cards';

        itemCard.innerHTML = `
            <h3>${company.name}</h3>
            <div class="spotlight-logo-box">
                <img src="${company.image}" alt="${company.name} branding logo" loading="lazy">
            </div>
            <hr>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Website:</strong> <a href="${company.website}" target="_blank" rel="noopener">${company.website}</a></p>
            <div class="tier-tag tier-${company.membershipLevel}">${company.membershipLevel === "3" ? 'Gold Partner' : 'Silver Partner'}</div>
        `;

        cardWrapper.appendChild(itemCard)
    });
}

fetchSpotlightMembers();