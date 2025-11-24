const MODAL_ID = 'enquire-modal'; // Matches HTML ID
const ARTWORK_TITLE_ID = 'modal-artwork-title'; // Matches HTML ID
const DURATION_SECONDS = 10; // Set to 10 seconds as per existing code/HTML text
const PROGRESS_BAR_CONTAINER_CLASS = 'modal-footer'; // Container for the bar

let countdownTimeout; // Use a single timeout for auto-close
let progressBarInterval; // Interval for animating the progress bar

// Get the main modal element
const modal = document.getElementById(MODAL_ID);
const modalArtworkTitleSpan = document.getElementById(ARTWORK_TITLE_ID);
const closeButton = modal.querySelector('.close-btn');

// Dynamically create the progress bar structure inside the footer to match the design
// and add the closing message element which contains the timer text and progress bar.
const modalFooter = modal.querySelector(`.${PROGRESS_BAR_CONTAINER_CLASS}`);
if (modalFooter) {
    // Check if the HTML text needs to be adjusted for '10 seconds'
    const closingTextP = modalFooter.querySelector('p');
    if (closingTextP) {
        // Update the closing text to include the timer span for animation
        closingTextP.innerHTML = 'This message will close automatically after <span id="countdown-timer">10</span> seconds.';
    }

    // Add the progress bar structure (assuming a class in CSS handles the appearance)
    const progressBarDiv = document.createElement('div');
    progressBarDiv.classList.add('progress-bar-container'); // You'll need CSS for this
    progressBarDiv.innerHTML = '<div id="progress-bar-fill" class="progress-bar-fill"></div>';
    modalFooter.appendChild(progressBarDiv);
}

const countdownTimerSpan = document.getElementById('countdown-timer');
const progressBar = document.getElementById('progress-bar-fill');


// Function to close the modal
function closeModal() {
    clearTimeout(countdownTimeout);
    clearInterval(progressBarInterval);
    modal.classList.remove('active'); // Assumes 'active' class controls visibility
    // Reset progress bar to full state immediately upon closing
    if (progressBar) {
        progressBar.style.width = '100%';
    }
}

// Function to handle the Inquire/Buy button click (used in HTML onclick)
function handleEnquire(event, artworkTitle) {
    // Prevent the default action if it were a form submit or link
    event.preventDefault(); 
    
    // Clear any previous countdown/interval before starting a new one
    clearTimeout(countdownTimeout);
    clearInterval(progressBarInterval);

    // 1. Set the artwork title
    modalArtworkTitleSpan.textContent = artworkTitle;

    // 2. Show the modal
    modal.classList.add('active'); 

    // 3. Initialize timer display (Start at 10)
    let timeRemaining = DURATION_SECONDS;
    if (countdownTimerSpan) {
        countdownTimerSpan.textContent = timeRemaining;
    }

    // 4. Reset progress bar for animation
    if (progressBar) {
        // Set initial state to 100% and remove transition for immediate reset
        progressBar.style.transition = 'none';
        progressBar.style.width = '100%';
        // Force reflow/repaint to ensure reset takes effect before adding transition back
        void progressBar.offsetWidth; 
        
        // Apply transition and start the animation to 0%
        progressBar.style.transition = `width ${DURATION_SECONDS}s linear`;
        progressBar.style.width = '0%';
    }

    // 5. Setup the timer to update the countdown text every second
    let lastTime = DURATION_SECONDS;
    progressBarInterval = setInterval(() => {
        timeRemaining--;
        if (countdownTimerSpan) {
            countdownTimerSpan.textContent = timeRemaining;
        }
        
        // This is a safety measure in case the width animation finishes early/late
        if (timeRemaining <= 0) {
            clearInterval(progressBarInterval);
        }
    }, 1000); // Update every 1 second

    // 6. Set the auto-close timeout
    countdownTimeout = setTimeout(closeModal, DURATION_SECONDS * 1000);
}

// Add event listener to the modal's close button (the 'x' button)
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

// Optional: Allow closing by clicking the overlay (outside the modal content)
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

/* * NOTE: The HTML already uses onclick="handleEnquire(event, 'Artwork Title')"
* on the buttons, so you don't need to add new event listeners 
* for the .enquire-btn class in the JS. The 'closeModal' is also exposed
* for the modal's close button.
*/