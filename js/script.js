document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Zamknij menu po kliknięciu linku
        const navMenu = document.querySelector('nav ul');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelector('form[name="contact"]').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const successMessage = document.getElementById('successMessage');
    const submitButton = form.querySelector('.form-submit');

    // Zablokuj przycisk podczas wysyłania
    submitButton.disabled = true;
    submitButton.textContent = 'Wysyłanie...';

    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // Sukces
        form.classList.add('form-hidden');
        successMessage.classList.add('show');

        // Ukryj po 3 sekundach i zresetuj
        setTimeout(() => {
            successMessage.classList.remove('show');

            setTimeout(() => {
                form.classList.remove('form-hidden');
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Wyślij wiadomość';
            }, 400);
        }, 3000);
    })
    .catch((error) => {
        // Alert tylko dla błędu
        alert('Ups! Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na email: maciejniedzwiecki.01@gmail.com');

        // Odblokuj formularz
        submitButton.disabled = false;
        submitButton.textContent = 'Wyślij wiadomość';
    });
});