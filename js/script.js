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

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dziękuję za chęć kontaktu i przetestowanie formularza! Strona jest aktualnie w trakcie tworzenia – skontaktuj się ze mną bezpośrednio za pomocą email lub LinkedIn.');
    //alert('Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.');
    this.reset();
});