const DURATION_SECONDS = 10;
const modal = document.getElementById('enquire-modal');
const modalFooter = modal ? modal.querySelector('.modal-footer') : null;
const modalArtworkTitleSpan = document.getElementById('modal-artwork-title');
let countdownTimerSpan = null;
let progressBar = null;
let countdownTimeout;
let progressBarInterval;

if (modalFooter) {
    let pTag = modalFooter.querySelector('p');
    if (pTag) {
        pTag.innerHTML = `This modal will automatically close in <span id="countdown-timer">${DURATION_SECONDS}</span> seconds.`;
        countdownTimerSpan = document.getElementById('countdown-timer');
    }
    
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    progressBarContainer.innerHTML = '<div id="progress-bar-fill" class="progress-bar-fill"></div>';
    modalFooter.appendChild(progressBarContainer);
    progressBar = document.getElementById('progress-bar-fill');
}

function closeModal() {
    clearTimeout(countdownTimeout);
    clearInterval(progressBarInterval);
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleEnquire(event, artworkTitle) {
    event.preventDefault();
    clearTimeout(countdownTimeout);
    clearInterval(progressBarInterval);
    
    if (modalArtworkTitleSpan) {
        modalArtworkTitleSpan.textContent = artworkTitle;
    }
    if (modal) {
        modal.classList.add('active');
    }

    let timeRemaining = DURATION_SECONDS;
    if (countdownTimerSpan) {
        countdownTimerSpan.textContent = timeRemaining;
    }

    if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '100%';
        void progressBar.offsetWidth; 
        
        progressBar.style.transition = `width ${DURATION_SECONDS}s linear`;
        progressBar.style.width = '0%';
    }
    
    progressBarInterval = setInterval(() => {
        timeRemaining--;
        if (countdownTimerSpan) {
            countdownTimerSpan.textContent = timeRemaining;
        }
        
        if (timeRemaining <= 0) {
            clearInterval(progressBarInterval);
        }
    }, 1000); 

    countdownTimeout = setTimeout(closeModal, DURATION_SECONDS * 1000);
}