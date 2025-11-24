const modal = document.getElementById('enquiryModal');
        const modalArtworkTitleSpan = document.getElementById('modalArtworkTitle');
        const countdownTimerSpan = document.getElementById('countdownTimer');
        const progressBar = document.getElementById('progressBar');
        const enquireButtons = document.querySelectorAll('.enquire-btn');
        const DURATION_SECONDS = 10;
        let countdownInterval;
        let startTime;

        // Function to show the modal
        function showModal(artworkTitle) {
            // Set the artwork title in the modal
            modalArtworkTitleSpan.textContent = artworkTitle;
            
            // Activate the modal
            modal.classList.add('active');
            
            // Reset and start the countdown
            let timeRemaining = DURATION_SECONDS;
            countdownTimerSpan.textContent = timeRemaining;
            
            // Set up progress bar animation
            progressBar.style.transition = `width ${DURATION_SECONDS}s linear`;
            progressBar.style.width = '0%';
            
            // Start the countdown interval (updates every 100ms for smooth progress bar)
            startTime = Date.now();
            
            countdownInterval = setInterval(function() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / (DURATION_SECONDS * 1000); // 0 to 1
                
                // Update countdown text every second
                const newTimeRemaining = DURATION_SECONDS - Math.ceil(elapsed / 1000);
                if (newTimeRemaining >= 0 && newTimeRemaining < timeRemaining) {
                    timeRemaining = newTimeRemaining;
                    countdownTimerSpan.textContent = timeRemaining;
                }
                
                // Update progress bar width
                const widthPercentage = Math.max(0, 100 - (progress * 100));
                progressBar.style.width = `${widthPercentage}%`;

                if (progress >= 1) {
                    clearInterval(countdownInterval);
                    hideModal();
                }
            }, 100);
        }

        // Function to hide the modal
        function hideModal() {
            clearInterval(countdownInterval);
            modal.classList.remove('active');
            
            // Reset progress bar transition and width immediately after hiding
            progressBar.style.transition = 'none';
            progressBar.style.width = '100%';
        }

        // Add event listeners to all 'Enquire' buttons
        enquireButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                // Ensure any running interval is cleared before showing a new modal
                clearInterval(countdownInterval); 
                
                const artworkTitle = event.target.getAttribute('data-artwork-title');
                showModal(artworkTitle);
            });
        });
        
        // Optional: Allow closing by clicking the overlay (outside the modal content)
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                hideModal();
            }
        });
