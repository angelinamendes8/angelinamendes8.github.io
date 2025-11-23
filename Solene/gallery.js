let autoCloseTimeout; 
        let countdownInterval;
        const MODAL_DURATION_MS = 10000; // 10 seconds
        const modal = document.getElementById('enquire-modal');
        const modalTitle = document.getElementById('modal-artwork-title');
        const progressBar = document.getElementById('progressBar');
        const countdownTimerSpan = document.getElementById('countdownTimer');

        /**
         * Starts the modal display process including transitions and auto-close timer.
         * @param {string} title - The title of the artwork.
         */
        function showModal(title) {
            // 1. Clear any existing timers
            clearTimeout(autoCloseTimeout);
            clearInterval(countdownInterval);

            if (!modal || !modalTitle) return;

            modalTitle.textContent = title;
            
            // 2. Set display to flex immediately (bypass display: none)
            modal.style.display = 'flex';
            
            // 3. Schedule the opacity transition after a brief delay for the CSS transition to work
            setTimeout(() => {
                modal.classList.add('active');
                modal.querySelector('.modal-content').style.transform = 'scale(1)'; // Ensure content scales up
            }, 10);
            
            // 4. Start auto-close timer
            autoCloseTimeout = setTimeout(closeModal, MODAL_DURATION_MS);
            
            // 5. Start progress bar/countdown animation
            if (progressBar) {
                // Reset progress bar visually
                progressBar.style.transition = 'none';
                progressBar.style.width = '100%'; 
                
                // Use a short timeout to re-enable transition after width reset
                setTimeout(() => {
                    progressBar.style.transition = `width ${MODAL_DURATION_MS / 1000}s linear`;
                    progressBar.style.width = '0%';
                }, 50);

                // Start countdown text update
                let timeRemaining = MODAL_DURATION_MS / 1000;
                countdownTimerSpan.textContent = timeRemaining;
                
                countdownInterval = setInterval(() => {
                    timeRemaining--;
                    if (timeRemaining >= 0) {
                        countdownTimerSpan.textContent = timeRemaining;
                    }
                    if (timeRemaining < 0) {
                         clearInterval(countdownInterval);
                    }
                }, 1000);
            }
        }

        /**
         * Closes the enquiry modal by hiding the overlay and clearing timers.
         */
        function closeModal() {
            clearTimeout(autoCloseTimeout);
            clearInterval(countdownInterval);

            if (!modal) return;

            // 1. Start fade-out transition
            modal.classList.remove('active');

            // 2. Hide modal after transition completes (0.3s)
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); 

            // Reset progress bar state
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = '100%'; 
            }
        }


        /**
         * Event handler attached to the enquire button's onclick.
         * @param {Event} event - The click event.
         * @param {string} title - The title of the artwork.
         */
        function handleEnquire(event, title) {
            // This is the crucial fix: stop propagation to prevent the parent card's click handler from firing
            event.stopPropagation(); 
            showModal(title);
        }
        
        // Expose functions globally since they are called from inline onclick attributes
        window.handleEnquire = handleEnquire;
        window.closeModal = closeModal;

        // --- Initialization and Event Listeners ---
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.artwork-card').forEach(card => {
                // Clicking the card body shows a console log message (existing logic)
                card.addEventListener('click', function() {
                    const title = this.getAttribute('data-title');
                    console.log(`Card clicked for detail view: ${title}`);
                });
            });

            // Close modal if user clicks the backdrop (overlay)
            document.getElementById('enquire-modal').addEventListener('click', function(e) {
                // Check if the click target is the overlay itself (not the content box)
                if (e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });

            console.log('Artwork gallery JS initialized. Enquire buttons are now active.');
        });