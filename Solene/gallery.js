    function handleEnquire(event, title) {
            // Prevent the click event from triggering the parent card's click handler
            event.stopPropagation(); 
            
            document.getElementById('modal-artwork-title').textContent = title;
            document.getElementById('enquire-modal').style.display = 'flex';
        }

        /**
         * Closes the enquiry modal by hiding the overlay.
         */
        function closeModal() {
            document.getElementById('enquire-modal').style.display = 'none';
        }

        /**
         * Initialization and event listener for card clicks.
         */
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.artwork-card').forEach(card => {
                // Clicking the card body shows a console log message
                card.addEventListener('click', function() {
                    const title = this.getAttribute('data-title');
                    console.log(`Card clicked for detail view: ${title}`);
                });
            });

            // Close modal if user clicks the backdrop (overlay)
            document.getElementById('enquire-modal').addEventListener('click', function(e) {
                if (e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });

            console.log('Artwork gallery internal CSS and JS initialized.');
        });