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
    });
}

const jsonUrl = "data/members.json";
const directoryContainer = document.getElementById("directoryContainer");

async function fetchMembers() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const membersArray = await response.json();
        buildMemberCards(membersArray);
    } catch (error) {
        console.error("Failed to load business data directory:", error);
        if (directoryContainer) {
            directoryContainer.innerHTML = `<p class="error">Unable to load business listings right now.</p>`;
        }
    }
}

function buildMemberCards(members) {
    if (!directoryContainer) return;
    directoryContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        let tierLabel = "General Member";
        if (member.membershipLevel === 2) tierLabel = "Silver Partner"; 
        if (member.membershipLevel === 3) tierLabel = "Gold Partner";

        card.innerHTML = `
            <div class="card-image-wrap">
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            </div>
            <h3>${member.name}</h3>
            <p class="tagline">"${member.tagline}"</p>
            <hr>
            <p class="contact-info">📍 ${member.address}</p>
            <p class="contact-info">📞 ${member.phone}</p>
            <p class="membership-badge tier-${member.membershipLevel}">${tierLabel}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Directory Website</a>
        `;
        
        directoryContainer.appendChild(card);
    });
}

const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
        directoryContainer.className = "grid-mode";
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.className = "list-mode";
    });
}

fetchMembers();