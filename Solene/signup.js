document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const passInput = form.querySelector('input[type="password"]');
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

    const nameErr = getErrors(nameInput);
    const emailErr = getErrors(emailInput);
    const passErr = getErrors(passInput);

    const nameInvalid = !nameInput || nameInput.value.trim().length < 3;
    const emailInvalid = !emailInput || !validEmail(emailInput.value.trim());
    const passInvalid = !passInput || passInput.value.length < 5;

    if (show) {
      if (nameInvalid) {
        if (nameErr) nameErr.textContent = 'Enter your full name (3+ characters).';
      } else if (nameErr) nameErr.textContent = '';

      if (emailInvalid) {
        if (emailErr) emailErr.textContent = 'Enter a valid email address.';
      } else if (emailErr) emailErr.textContent = '';

      if (passInvalid) {
        if (passErr) passErr.textContent = 'Password must be at least 5 characters.';
      } else if (passErr) passErr.textContent = '';
    } else {

      if (nameErr) nameErr.textContent = '';
      if (emailErr) emailErr.textContent = '';
      if (passErr) passErr.textContent = '';
    }

    return !(nameInvalid || emailInvalid || passInvalid);
}

[nameInput, emailInput, passInput].forEach((inp) => {
    if (!inp) return;
    inp.addEventListener('input', () => {
        check(showErrors);});
});

function interactiveBtn(button, duration = 1200) {
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = 'Signing Up...';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, duration);
  }

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const ok = check(showErrors);
    if (!ok) {

        const firstErr = form.querySelector('.error-message:not(:empty)');
        if (firstErr && firstErr.previousElementSibling) {
        firstErr.previousElementSibling.focus();
    }

    return;
}

    const btnDuration = 1200;
    interactiveBtn(submitBtn, btnDuration);

    setTimeout(() => {
    const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.style.color = '#0b6623';
        successMsg.style.marginTop = '10px';
        successMsg.textContent = 'Signed up successfully.';

    const prevMsg = form.querySelector('.success-message');
        if (prevMsg) prevMsg.remove();
        form.appendChild(successMsg);

    showErrors = false;

    setTimeout(() => {
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (passInput) passInput.value = '';

        check(showErrors);
        setTimeout(() => successMsg.remove(), 1800);}, 800);
    }, btnDuration);

function enableErrors() {
    if (!showErrors) {
        showErrors = true;
    }
}

    form.addEventListener('click', enableErrors, { once: false });
    form.addEventListener('focusin', enableErrors, { once: false });
    });
});