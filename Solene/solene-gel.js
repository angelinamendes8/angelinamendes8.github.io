
// --- DATA SETUP: Consolidated Artworks ---
const artworks = [
    // User's provided list is integrated here
    { id: 1, title: "Apollo Disguised As a Shepherd", artist: "Jean Valentin de Boulogne", price: "$13,330", description: "Apollo, punished by Jupiter, served as a shepherd under King Admetus.", imgUrl: "https://placehold.co/400x400/897863/FFFFFF?text=Apollo" },
    { id: 2, title: "Woman with a Parasol", artist: "Claude Monet", price: "$4,860", description: "Painted outdoors in one sitting, showing Camille and Jean Monet.", imgUrl: "https://placehold.co/400x400/6c7a89/FFFFFF?text=Monet" },
    { id: 3, title: "The Tower of Babel", artist: "Pieter Bruegel the Elder", price: "$15,800", description: "Based on the biblical story; tower design inspired by the Roman Colosseum.", imgUrl: "https://placehold.co/400x400/964B00/FFFFFF?text=Babel" },
    { id: 4, title: "The Concert", artist: "Gerrit van Honthorst", price: "$9,650", description: "Courtly music scene symbolizing harmony in society through leadership.", imgUrl: "https://placehold.co/400x400/5D768B/FFFFFF?text=Concert" },
    { id: 5, title: "The Death of Hyacinthos", artist: "Jean Broc", price: "$12,700", description: "Neoclassical piece showing Apollo mourning his beloved Hyacinthus.", imgUrl: "https://placehold.co/400x400/e6e2d3/000000?text=Hyacinthos" },
    { id: 6, title: "Ophelia", artist: "John Everett Millais", price: "$14,200", description: "Tragic yet serene Pre-Raphaelite portrait of Ophelia floating in water.", imgUrl: "https://placehold.co/400x400/528392/FFFFFF?text=Ophelia" },
    { id: 7, title: "Paris Street, Rainy Day", artist: "Gustave Caillebotte", price: "$9,850", description: "Realist-impressionist rainy Paris scene with calm tone and perspective.", imgUrl: "https://placehold.co/400x400/404040/FFFFFF?text=Paris" },
    { id: 8, title: "Tres Marias", artist: "Anita Magsaysay-Ho", price: "$580,000", description: "Three Filipina women shown in unity and grace using soft modern style.", imgUrl: "https://placehold.co/400x400/C8B39B/000000?text=Tres+Marias" },
    { id: 9, title: "Planting Rice", artist: "Fernando Amorsolo", price: "$153,051.84", description: "Sunlit rural scene praising Filipino countryside labor and beauty.", imgUrl: "https://placehold.co/400x400/ffbf00/000000?text=Planting+Rice" },
    { id: 10, title: "Fishermen", artist: "Ang Kiukok", price: "1.2 million USD", description: "Strong cubist-inspired composition reflecting struggle and movement.", imgUrl: "https://placehold.co/400x400/1f2937/FFFFFF?text=Fishermen" },
    { id: 11, title: "Sabel in Blue", artist: "Benedicto Cabrera (BenCab)", price: "$1,000,000", description: "Depicts a woman wrapped in cloth representing the marginalized sector.", imgUrl: "https://placehold.co/400x400/007bff/FFFFFF?text=Sabel" },
    { id: 12, title: "Madonna of the Slums", artist: "Vicente Manansala", price: "$516,464", description: "Cubist portrayal of a mother and child in an urban poor setting.", imgUrl: "https://placehold.co/400x400/808080/FFFFFF?text=Madonna" },
    { id: 13, title: "The Marriage of the Virgin", artist: "Raphael", price: "$500,000,000", description: "Depicts Mary and Joseph’s wedding with balanced composition.", imgUrl: "https://placehold.co/400x400/f0f0f0/000000?text=Marriage" },
    { id: 14, title: "The Virgin and Child with Saint Anne", artist: "Leonardo da Vinci", price: "$450,000,000", description: "Three-generation portrait showing deep emotional and spiritual bond.", imgUrl: "https://placehold.co/400x400/d3d3d3/000000?text=Virgin+Child" },
    { id: 15, title: "Ginevra de' Benci", artist: "Leonardo da Vinci", price: "$100,000,000", description: "Renaissance portrait known for realism and symbolic background.", imgUrl: "https://placehold.co/400x400/b0c4de/000000?text=Ginevra" },
    { id: 16, title: "Venus with Cupid the Honey Thief", artist: "Lucas Cranach the Elder", price: "$30,000,000", description: "Humorous scene of Cupid stealing honey and getting stung by bees.", imgUrl: "https://placehold.co/400x400/ffd700/000000?text=Venus+Cupid" },
];

// --- DATA SETUP: Staff Information ---
const staffData = [
    { role: "Gallerist Manager", name: "Mary Angelina V Pucio", email: "pucio.maryangelina@solene.com", contact: "09888888888" },
    { role: "Gallerist Appraiser", name: "Addriane Gwynette Bucud", email: "bucud.addrianegwynette@solene.com", contact: "09777777777" },
    { role: "Gallerist Curator", name: "Chloe Deniese Beltran", email: "beltran.chloedeniese@solene.com", contact: "09666666666" },
    { role: "Gallerist Specialist", name: "Ara Nicole Melendres", email: "melendres.aranicole@solene.com", contact: "09555555555" },
];
        
// --- CORE APPLICATION LOGIC (Page Switching) ---

/**
* Toggles the visibility of the main content sections.
 * @param {string} pageId - The ID of the section to show (e.g., 'home', 'gallery').
*/
    function showPage(pageId) {
     // Hide all content sections
    document.querySelectorAll('.page-content').forEach(section => {
        section.classList.add('hidden');
    });
    // Show the requested page
    const page = document.getElementById(`page-${pageId}`);
    if (page) {
    page.classList.remove('hidden');
    }
    // Ensure all modals are closed
    hideAllModals();
}

/**
* Generates the HTML card for an individual artwork.
*/
    function createArtworkCard(artwork) {
        return `
        <div onclick="showArtworkDetail(${artwork.id})" class="art-card">
                <img src="${artwork.imgUrl}" onerror="this.onerror=null; this.src='https://placehold.co/400x400/e6e2d3/000000?text=Image+Error'" 
                    alt="${artwork.title}">
            <div class="art-card-info">
                <h5 style="font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem;">${artwork.title}</h5>
                <p style="font-size: 0.875rem; color: #4b5563;">${artwork.artist}</p>
                <p style="font-size: 1rem; font-weight: bold; color: #1f2937; margin-top: 0.5rem;">${artwork.price}</p>
            /div>
        </div>
    `;
}
        
/**
* Renders the artwork cards into the home and full gallery sections.
*/
    function renderArtworks() {
        const homeGallery = document.getElementById('home-gallery-preview');
        const fullGallery = document.getElementById('full-gallery');
            
    // Home preview shows the first 6
        const homeHtml = artworks.slice(0, 6).map(createArtworkCard).join('');
        homeGallery.innerHTML = homeHtml;
            
    // Full gallery shows all of them
        const fullHtml = artworks.map(createArtworkCard).join('');
        fullGallery.innerHTML = fullHtml;
}

/**
* Renders the staff details on the About page.
*/
    function renderAboutPage() {
        const container = document.getElementById('staff-details-container');
        const staffHtml = staffData.map(staff => `
            <div class="staff-card">
                <h4 style="margin-bottom: 0;">${staff.role}</h4>
                <p style="font-weight: bold;">${staff.name}</p>
                <ul>
                    <li>Email: ${staff.email}</li>
                    <li>Contact: ${staff.contact}</li>
                </ul>
            </div>
        `).join('');
        container.innerHTML = staffHtml;
}

// --- MODAL LOGIC (Copied from previous solution) ---

const TRANSITION_DURATION = 300; // Matches the CSS transition duration

/**
* Displays a modal (Login, Signup, or Artwork Detail).
*/
function showModal(modalId) {
    // Hide all pages (ensures only modal is visible)
    document.querySelectorAll('.page-content').forEach(section => {
    section.classList.add('hidden');
    });

    const modal = document.getElementById(modalId);
    if (modal) {
    modal.classList.remove('hidden');
                
// Add class to trigger CSS transition
    setTimeout(() => {
    modal.classList.add('opacity-100'); 
        }, 10); 
    }
}

/**
* Hides a specific modal.
*/
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
    // Remove opacity to start fade-out
     modal.classList.remove('opacity-100');
                
    // Add 'hidden' class only after the transition completes
    setTimeout(() => {
    modal.classList.add('hidden');
    }, TRANSITION_DURATION); 
}
}
        
/**
* Hides all modals.
*/
function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('opacity-100');
    setTimeout(() => {
    modal.classList.add('hidden');
    }, TRANSITION_DURATION);
});
}

/**
* Handles the display of the Artwork Detail Modal.
*/
function showArtworkDetail(id) {
    const artwork = artworks.find(a => a.id === id);
    if (!artwork) return;

    document.getElementById('detail-img').src = artwork.imgUrl;
    document.getElementById('detail-title').innerText = artwork.title;
    document.getElementById('detail-artist').innerText = `Artist: ${artwork.artist}`;
    document.getElementById('detail-description').innerText = artwork.description;
    document.getElementById('detail-price').innerText = `Price: ${artwork.price}`;

    showModal('artworkDetailModal');
}
        
// --- FORM & AUTH MOCK LOGIC (Copied from previous solution) ---

function handleAuth(type) {
    const modalId = `${type}Modal`;
    const messageElement = document.getElementById(`${type}-message`);
    const emailInput = document.getElementById(`${type}-email`);
     const passwordInput = document.getElementById(`${type}-password`);

if (!emailInput.value || !passwordInput.value) {
    messageElement.innerText = "Please enter both email and password.";
    messageElement.style.color = 'red';
    messageElement.classList.remove('hidden');
    return;
}

    messageElement.innerText = `${type === 'login' ? 'Welcome back' : 'Successfully signed up'}! Redirecting to Home...`;
    messageElement.style.color = 'green';
    messageElement.classList.remove('hidden');

    setTimeout(() => {
    hideModal(modalId);
    showPage('home'); 
    messageElement.classList.add('hidden'); 
    }, 2000);
}

function submitContactForm(form) {
    const messageEl = document.getElementById('contact-message');
            
    messageEl.classList.remove('hidden');
    form.reset();
            
    setTimeout(() => {
        messageEl.classList.add('hidden');
        showPage('home');
    }, 3000);
}

/**
* Custom alert replacement for Buy button.
*/
function alertMessage(message) {
    const body = document.body;
    let notification = document.getElementById('app-notification');
    if (!notification) {
    notification = document.createElement('div');
    notification.id = 'app-notification';
    notification.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; 
    background-color: #1f2937; color: white; 
    padding: 16px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: opacity 0.3s ease; opacity: 0; z-index: 100;
    `;
    body.appendChild(notification);
    }
    notification.innerText = message;
            
    notification.style.opacity = '1';

    setTimeout(() => {
    notification.style.opacity = '0';
    }, 4000);
}


// --- INITIALIZATION ---
window.onload = function() {
    renderArtworks();
    renderAboutPage(); // Render staff details on load
// Show the initial Welcome modal to start the user flow
    showModal('welcomeModal'); 
};
   