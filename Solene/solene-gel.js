
    // --- DATA SETUP: Consolidated Artworks ---
    const artworks = [
        { id: 1, title: "Abstract Serenity", artist: "J. Doe", price: "$1,200", description: "A calming study in blue and beige.", imgUrl: "https://placehold.co/400x400/897863/FFFFFF?text=Serenity" },
        { id: 2, title: "The City's Pulse", artist: "A. Smith", price: "$850", description: "Vibrant city lights captured in a dynamic composition.", imgUrl: "https://placehold.co/400x400/6c7a89/FFFFFF?text=City+Pulse" },
        { id: 3, title: "Morning Mist", artist: "M. Chen", price: "$2,100", description: "A landscape painting evoking a foggy sunrise.", imgUrl: "https://placehold.co/400x400/e6e2d3/000000?text=Morning+Mist" },
        { id: 4, title: "The Red Dress", artist: "R. Garcia", price: "$1,500", description: "A striking portrait focusing on color contrast.", imgUrl: "https://placehold.co/400x400/9e2a2b/FFFFFF?text=Red+Dress" },
        { id: 5, title: "Geometric Flow", artist: "S. Lee", price: "$900", description: "Modern, minimalist composition.", imgUrl: "https://placehold.co/400x400/1e40af/FFFFFF?text=Geometric+Flow" },
        { id: 6, title: "Sunset over Dune", artist: "D. King", price: "$1,800", description: "Warm colors depicting a desert sunset.", imgUrl: "https://placehold.co/400x400/f59e0b/000000?text=Desert+Sunset" },
        { id: 7, title: "Apollo Disguised As a Shepherd", artist: "Jean Valentin de Boulogne", price: "$13,330", description: "Apollo, punished by Jupiter, served as a shepherd under King Admetus.", imgUrl: "https://placehold.co/400x400/404040/FFFFFF?text=Apollo+Shepherd" },
        { id: 8, title: "Woman with a Parasol", artist: "Claude Monet", price: "$4,860", description: "Painted outdoors in one sitting, showing Camille and Jean Monet.", imgUrl: "https://placehold.co/400x400/7a93a8/FFFFFF?text=Monet+Parasol" },
        { id: 9, title: "The Tower of Babel", artist: "Pieter Bruegel the Elder", price: "$15,800", description: "Based on the biblical story; tower design inspired by the Roman Colosseum.", imgUrl: "https://placehold.co/400x400/964B00/FFFFFF?text=Tower+of+Babel" },
        { id: 10, title: "The Concert", artist: "Gerrit van Honthorst", price: "$9,650", description: "Courtly music scene symbolizing harmony in society through leadership.", imgUrl: "https://placehold.co/400x400/5D768B/FFFFFF?text=The+Concert" },
        { id: 11, title: "Ophelia", artist: "John Everett Millais", price: "$14,200", description: "Tragic yet serene Pre-Raphaelite portrait of Ophelia floating in water.", imgUrl: "https://placehold.co/400x400/528392/FFFFFF?text=Ophelia" },
        { id: 12, title: "Tres Marias", artist: "Anita Magsaysay-Ho", price: "$580,000", description: "Three Filipina women shown in unity and grace using soft modern style.", imgUrl: "https://placehold.co/400x400/C8B39B/000000?text=Tres+Marias" },
    ];
    
    // Duration for modal transitions (must match CSS)
    const TRANSITION_DURATION = 300; 

    // --- CORE APPLICATION LOGIC (Page Switching) ---

    /**
     * Toggles the visibility of the main content sections and updates active button state.
     * @param {string} pageId - The ID of the section to show (e.g., 'home', 'gallery').
     */
    function showPage(pageId) {
        // Hide all content sections
        document.querySelectorAll('.page-content').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Remove active class from all navigation buttons
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the requested page
        const page = document.getElementById(`page-${pageId}`);
        if (page) {
            page.classList.remove('hidden');
            // Set the corresponding navigation button as active
            const navButton = document.getElementById(`nav-${pageId}`);
            if(navButton) {
                navButton.classList.add('active');
            }
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
                      alt="${artwork.title}" loading="lazy">
                <div class="art-card-info">
                    <h5 class="text-lg font-semibold text-gray-800 mb-1">${artwork.title}</h5>
                    <p class="text-sm text-gray-500">${artwork.artist}</p>
                    <p class="text-md font-bold text-gray-900 mt-2">${artwork.price}</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Renders the artwork cards into the home and full gallery sections.
     */
    function renderArtworks() {
        const homeGallery = document.getElementById('home-gallery-preview');
        const fullGallery = document.getElementById('full-gallery');
        
        // Render a subset for the Home page preview (e.g., the first 6)
        const homeHtml = artworks.slice(0, 6).map(createArtworkCard).join('');
        if (homeGallery) homeGallery.innerHTML = homeHtml;
        
        // Render all for the Full Gallery page
        const fullHtml = artworks.map(createArtworkCard).join('');
        if (fullGallery) fullGallery.innerHTML = fullHtml;
        
        // Set the initial page to 'home' only if no modal is forced to open
        if (document.getElementById('welcomeModal') && document.getElementById('welcomeModal').classList.contains('hidden')) {
             showPage('home');
        }
    }

    // --- MODAL LOGIC ---

    /**
     * Displays a modal (Login, Signup, or Artwork Detail) with a transition effect.
     */
    function showModal(modalId) {
        // Hide all main pages to keep focus on the modal
        document.querySelectorAll('.page-content').forEach(section => {
             section.classList.add('hidden');
        });

        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            
            // Add class to trigger CSS fade-in transition
            setTimeout(() => {
                modal.classList.add('opacity-100'); 
            }, 10); // Small delay ensures CSS transition registers
        }
    }

    /**
     * Hides a specific modal with a transition effect.
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
     * Hides all modals instantly.
     */
    function hideAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('opacity-100');
            modal.classList.add('hidden');
        });
    }

    /**
     * Handles the display of the Artwork Detail Modal.
     */
    function showArtworkDetail(id) {
        const artwork = artworks.find(a => a.id === id);
        if (!artwork) return;

        // Populate detail modal content
        document.getElementById('detail-img').src = artwork.imgUrl;
        document.getElementById('detail-img').onerror = function() { this.src='https://placehold.co/400x400/e6e2d3/000000?text=Image+Error'; };
        document.getElementById('detail-title').innerText = artwork.title;
        document.getElementById('detail-artist').innerText = `Artist: ${artwork.artist}`;
        document.getElementById('detail-description').innerText = artwork.description;
        document.getElementById('detail-price').innerText = `Price: ${artwork.price}`;

        showModal('artworkDetailModal');
    }
    
    // --- FORM & AUTH MOCK LOGIC ---

    function handleAuth(type) {
        const modalId = `${type}Modal`;
        const messageElement = document.getElementById(`${type}-message`);
        const emailInput = document.getElementById(`${type}-email`);
        const passwordInput = document.getElementById(`${type}-password`);

        // Simple validation
        if (!emailInput.value || !passwordInput.value) {
            messageElement.innerText = "Please enter both email and password.";
            messageElement.style.backgroundColor = '#fee2e2'; // red-100
            messageElement.style.color = '#dc2626'; // red-600
            messageElement.classList.remove('hidden');
            return;
        }

        // Mock authentication success
        messageElement.innerText = `${type === 'login' ? 'Welcome back' : 'Successfully signed up'}! Redirecting to Home...`;
        messageElement.style.backgroundColor = '#d1fae5'; // green-100
        messageElement.style.color = '#059669'; // green-700
        messageElement.classList.remove('hidden');

        // Close modal and show main page after a delay
        setTimeout(() => {
            hideModal(modalId);
            showPage('home'); 
            emailInput.value = ''; // Clear inputs
            passwordInput.value = '';
            messageElement.classList.add('hidden'); 
        }, 2000);
    }

    function submitContactForm(form) {
        const messageEl = document.getElementById('contact-message-success');
        
        messageEl.classList.remove('hidden');
        
        // Mock form submission process (e.g., sending data)
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
            form.reset();
            // Optional: Redirect back to home after successful submission
            // showPage('home');
        }, 3000);
    }

    /**
     * Custom notification box replacement for alert().
     */
    function alertMessage(message) {
        let notification = document.getElementById('app-notification');
        
        notification.innerText = message;
        notification.style.opacity = '1';
        notification.style.pointerEvents = 'auto'; // Make it clickable/visible

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.pointerEvents = 'none'; // Make it non-clickable when hidden
        }, 4000);
    }


    // --- INITIALIZATION ---
    window.onload = function() {
        renderArtworks();
        // Show the initial Welcome modal to start the user flow
        showModal('welcomeModal'); 
    };
