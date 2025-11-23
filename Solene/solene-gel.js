// --- DATA SETUP: Consolidated Artworks ---
const artworks = [
    // This data structure allows us to dynamically render the gallery
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
 * Toggles the visibility of the main content sections to achieve SPA functionality.
 * The function finds all elements with the class 'page-content' and hides them,
 * then shows the one that matches the requested pageId.
 * @param {string} pageId - The ID of the section to show (e.g., 'home', 'gallery', 'about', 'contact').
 */
function showPage(pageId) {
    // 1. Hide all content sections
    document.querySelectorAll('.page-content').forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Show the requested page
    const page = document.getElementById(`page-${pageId}`);
    if (page) {
        page.classList.remove('hidden');
        
        // Optional: Remove static content from the Gallery and About pages on switch
        // to prevent duplicate or conflicting display issues caused by the static HTML
        if (pageId === 'gallery') {
             // Clear the <article> containing static art-boxes
            const staticArtContainer = page.querySelector('.art-list');
            if (staticArtContainer) staticArtContainer.innerHTML = ''; 
        } else if (pageId === 'about') {
            // Clear the <article class="people"> containing static staff details
            const staticStaffContainer = page.querySelector('.people');
            if (staticStaffContainer) staticStaffContainer.innerHTML = '';
            // Re-render dynamic staff data
            renderAboutPage();
        }
        
        // Optional: Ensure all modals are closed if a page is navigated to
        hideAllModals();
    } else if (pageId === 'contact') {
        // Mock a placeholder for the missing 'contact' page
        const mainContent = document.getElementById('main-body').querySelector('.container.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <section id="page-contact" class="page-content">
                    <h2>Contact Us</h2>
                    <p>Thank you for your interest! Our contact form functionality will be added soon.</p>
                    <p>For now, please reach out to our staff listed on the About page.</p>
                </section>
            `;
            // Show the mock page
            document.getElementById('page-contact').classList.remove('hidden');
        }
        hideAllModals();
    }
}

/**
 * Generates the HTML card for an individual artwork.
 */
function createArtworkCard(artwork) {
    // Basic styling is expected to be handled by the 'art-card' and internal styles in CSS
    return `
        <div onclick="showArtworkDetail(${artwork.id})" class="art-card">
            <!-- Used generic placeholder as image source is just 'solenename.png' in HTML -->
            <img src="${artwork.imgUrl}" onerror="this.onerror=null; this.src='https://placehold.co/400x400/e6e2d3/000000?text=Image+Error'" 
                  alt="${artwork.title}" style="width:100%; height:auto; border-radius: 8px;">
            <div class="art-card-info" style="padding: 1rem;">
                <h5 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 0.25rem;">${artwork.title}</h5>
                <p style="font-size: 0.875rem; color: #555;">${artwork.artist}</p>
                <p style="font-size: 1rem; font-weight: bold; color: #000; margin-top: 0.5rem;">${artwork.price}</p>
            </div>
        </div>
    `;
}

/**
 * Renders the artwork cards into the home and full gallery sections.
 */
function renderArtworks() {
    // Note: The HTML has static content which this JS will overwrite/supplement.
    const fullGallery = document.getElementById('full-gallery');
    
    // Full gallery shows all of them
    const fullHtml = artworks.map(createArtworkCard).join('');
    if(fullGallery) {
        // Inject dynamic content into the #full-gallery grid
        fullGallery.innerHTML = fullHtml;
    }
    
    // Since the home gallery preview container is not clearly defined with a unique ID 
    // in the current HTML, we will rely only on the full gallery view working.
    // If you add <div id="home-gallery-preview" class="gallery-grid"></div> 
    // to the home page, you can uncomment this:
    /*
    const homeGallery = document.getElementById('home-gallery-preview'); 
    const homeHtml = artworks.slice(0, 6).map(createArtworkCard).join('');
    if(homeGallery) homeGallery.innerHTML = homeHtml;
    */
}

/**
 * Renders the staff details on the About page by replacing the static content.
 */
function renderAboutPage() {
    // Target the article element containing the static staff details
    const container = document.getElementById('page-about').querySelector('.people');
    if (!container) return;
    
    // Generate new, dynamic staff cards. (Assuming a 'staff-card' class exists in CSS)
    const staffHtml = staffData.map(staff => `
        <div class="staff-card" style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
            <p style="font-size: 1.1em; font-weight: bold;">${staff.role}: ${staff.name}</p>
            <ul style="list-style: none; padding: 0;">
                <li style="font-size: 0.9em;">Email: ${staff.email}</li>
                <li style="font-size: 0.9em;">Contact: ${staff.contact}</li>
            </ul>
        </div>
    `).join('');

    // Overwrite the existing static content within the <article class="people">
    container.innerHTML = staffHtml;
}


// --- MODAL & ALERT MOCK LOGIC (Required because the HTML calls these functions) ---

/**
 * Mocks the showModal function to display a custom notification 
 * since the modal HTML elements are not defined in the provided code.
 */
function showModal(modalId) {
    let message = '';
    if (modalId === 'signupModal') {
        message = "Sign Up feature will be available soon!";
    } else if (modalId === 'loginModal') {
        message = "Log In functionality pending. Continuing as Guest.";
    } else {
        message = `Opening modal: ${modalId}`;
    }
    alertMessage(message, true);
    // Automatically switch to home after showing the mock message
    if (modalId === 'signupModal' || modalId === 'loginModal') {
        setTimeout(() => showPage('home'), 1500);
    }
}

/**
 * Mocks the hideModal function.
 */
function hideModal(modalId) {
    // Since we are using an inline custom alert, hideModal doesn't need to do anything.
}

/**
 * Mocks the hideAllModals function.
 */
function hideAllModals() {
    // Since we are using an inline custom alert, hideAllModals doesn't need to do anything.
}


/**
 * Mocks the showArtworkDetail function, displaying a temporary notification 
 * because the artworkDetailModal is not in the provided HTML.
 */
function showArtworkDetail(id) {
    const artwork = artworks.find(a => a.id === id);
    if (artwork) {
        alertMessage(`Viewing Details for: ${artwork.title}`, true);
    }
}

/**
 * Custom alert replacement to display messages without blocking the browser (no window.alert).
 */
function alertMessage(message, isTemporary = false) {
    const body = document.body;
    let notification = document.getElementById('app-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'app-notification';
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            background-color: #A0522D; color: white; 
            padding: 16px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            font-family: sans-serif; transition: opacity 0.3s ease; opacity: 0; z-index: 1000;
        `;
        body.appendChild(notification);
    }
    
    notification.innerText = message;
    notification.style.opacity = '1';

    if (isTemporary) {
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 2000);
    }
}


// --- INITIALIZATION ---
window.onload = function() {
    renderArtworks();
    renderAboutPage(); 
    
    // Set 'home' as the initial page view
    showPage('home'); 

    // Optional: Hide the static gallery content on load since JS will manage the dynamic grid
    const staticGalleryArticle = document.getElementById('page-gallery').querySelector('article');
    if(staticGalleryArticle) {
         // This is done to remove the static, unformatted list below the dynamic grid
         staticGalleryArticle.style.display = 'none';
    }
};