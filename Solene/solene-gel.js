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
            
            const homeHtml = artworks.slice(0, 6).map(createArtworkCard).join('');
            homeGallery.innerHTML = homeHtml;
            
            const fullHtml = artworks.map(createArtworkCard).join('');
            fullGallery.innerHTML = fullHtml;
        }

        // --- MODAL LOGIC ---

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
        
        // --- FORM & AUTH MOCK LOGIC ---

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
            // Show the initial Welcome modal to start the user flow
            showModal('welcomeModal'); 
        };