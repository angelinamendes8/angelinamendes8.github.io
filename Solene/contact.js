document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    let showErrors = true;

    function getErrors(input) {
        if (!input) return null;
        let next = input.nextElementSibling;
        if (next && next.classList.contains('error-message')) return next;

        const el = document.createElement('div');
        el.className = 'error-message';
        el.style.color = '#b00020';
        el.style.fontSize = '0.9em';
        el.style.marginTop = '4px';
        input.parentNode.insertBefore(el, input.nextSibling);
        return el;}

function validEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);}

function check(show = true) {

    const emailErr = getErrors(emailInput);

    const emailInvalid = !emailInput || !validEmail(emailInput.value.trim());

    if (show) {
      if (emailInvalid) {
        if (emailErr) emailErr.textContent = 'Enter a valid email address.';
      } else if (emailErr) emailErr.textContent = '';
    } else {

      if (emailErr) emailErr.textContent = '';
    }

    return !emailInvalid;
}

[emailInput].forEach((inp) => {
    if (!inp) return;
    inp.addEventListener('input', () => {
        check(showErrors);});
});

function interactiveBtn(button, duration = 1200) {
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, duration);
  }

const DURATION_SECONDS = 10;
const modal = document.getElementById('enquire-modal');
const modalFooter = modal ? modal.querySelector('.modal-footer') : null;
const modalMessageSpan = document.getElementById('modal-artwork-title');
let countdownTimerSpan = null;
let progressBar = null;
let countdownTimeout;
let progressBarInterval;

if (modalFooter) {
    const pTag = modalFooter.querySelector('p');
    if (pTag) {
        pTag.innerHTML = `This message will close automatically after <span id="countdown-timer">${DURATION_SECONDS}</span> seconds.`;
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
        if (modal) modal.classList.remove('active');
    }

    window.closeModal = closeModal;

        function openModal(text) {
        if (modalMessageSpan) modalMessageSpan.textContent = text || '';
        if (modal) modal.classList.add('active');

    clearTimeout(countdownTimeout);
    clearInterval(progressBarInterval);

    let timeRemaining = DURATION_SECONDS;
    if (countdownTimerSpan) countdownTimerSpan.textContent = timeRemaining;

    if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '100%';
        void progressBar.offsetWidth;
        progressBar.style.transition = `width ${DURATION_SECONDS}s linear`;
        progressBar.style.width = '0%';
    }

    progressBarInterval = setInterval(() => {
    timeRemaining--;
        if (countdownTimerSpan) countdownTimerSpan.textContent = timeRemaining;
        if (timeRemaining <= 0) clearInterval(progressBarInterval);
    }, 1000);

    countdownTimeout = setTimeout(closeModal, DURATION_SECONDS * 1000);
    }

    form.addEventListener('submit', function (e) {
    e.preventDefault();

    const ok = check(showErrors);
        if (!ok) {
            const firstErr = form.querySelector('.error-message:not(:empty)');
            if (firstErr && firstErr.previousElementSibling) firstErr.previousElementSibling.focus();
            return;
        }

        const btnDuration = 1200;
        interactiveBtn(submitBtn, btnDuration);

        setTimeout(() => {
                const fullMessage = (messageInput && messageInput.value.trim()) || '';
                const modalText = fullMessage || ((nameInput && nameInput.value.trim()) ? `${nameInput.value.trim()} sent a message.` : 'Visitor sent a message.');
                openModal(modalText);
            showErrors = false;

            setTimeout(() => {
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';
                if (messageInput) messageInput.value = '';
                check(showErrors);
            }, 800);
        }, btnDuration);
    });

    function enableErrors() {
        if (!showErrors) showErrors = true;
    }

    form.addEventListener('click', enableErrors, { once: false });
    form.addEventListener('focusin', enableErrors, { once: false });
});