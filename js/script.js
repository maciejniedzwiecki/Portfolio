// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking
        navMenu.classList.remove('active');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Smooth scrolling for logo
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#home');
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Close mobile menu if open
    navMenu.classList.remove('active');

    // Clear all active nav links (we're on home section)
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
    });
});

// CTA button smooth scroll
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#contact');
    const offsetTop = targetSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form validation - only on blur (no submission logic)
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
    if (subjectInput) {
        subjectInput.addEventListener('blur', validateSubject);
    }
    if (messageInput) {
        messageInput.addEventListener('blur', validateMessage);
    }

    // Simple form submit handler (no actual sending)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            if (isEmailValid && isSubjectValid && isMessageValid) {
                alert('Dzięuję za chęć kontaktu i przetesotwanie formularza! Strona aktulanie jest w trakcie tworzenia, skontaktuj się ze mną bezpośrednio za pomocą widocznego obok adresu email.');
            }
        });
    }
});

function validateEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return false;

    const email = emailInput.value.trim();
    clearFieldError('email');

    if (!email) {
        showFieldError('email', 'Email jest wymagany');
        return false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Nieprawidłowy format email');
        return false;
    }
    return true;
}

function validateSubject() {
    const subjectInput = document.getElementById('subject');
    if (!subjectInput) return false;

    const subject = subjectInput.value;
    clearFieldError('subject');

    if (!subject) {
        showFieldError('subject', 'Wybierz temat wiadomości');
        return false;
    }
    return true;
}

function validateMessage() {
    const messageInput = document.getElementById('message');
    if (!messageInput) return false;

    const message = messageInput.value.trim();
    clearFieldError('message');

    if (!message) {
        showFieldError('message', 'Wiadomość jest wymagana');
        return false;
    } else if (message.length < 10) {
        showFieldError('message', 'Wiadomość powinna mieć co najmniej 10 znaków');
        return false;
    }
    return true;
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');

    if (field && errorElement) {
        const formGroup = field.closest('.form-group');
        field.classList.remove('error');
        errorElement.textContent = '';
        if (formGroup) {
            formGroup.classList.remove('has-error');
        }
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');

    if (field && errorElement) {
        const formGroup = field.closest('.form-group');
        field.classList.add('error');
        errorElement.textContent = message;
        if (formGroup) {
            formGroup.classList.add('has-error');
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Copy email to clipboard function
function copyEmail() {
    const email = 'maciejniedzwiecki.01@gmail.com';
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            const emailLink = event.target.closest('.contact-item');
            if (emailLink) {
                emailLink.classList.add('email-copied');

                const textSpan = emailLink.querySelector('span:last-child');
                if (textSpan) {
                    const originalText = textSpan.textContent;
                    textSpan.textContent = 'Email skopiowany!';

                    setTimeout(() => {
                        emailLink.classList.remove('email-copied');
                        textSpan.textContent = originalText;
                    }, 2000);
                }
            }
        }).catch(() => {
            alert('Email: maciejniedzwiecki.01@gmail.com');
        });
    } else {
        alert('Email: maciejniedzwiecki.01@gmail.com');
    }
}

// Add some interactive hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px)';
    });
});

document.querySelectorAll('.experience-highlight').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px)';
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        }, index * 100);
    });
});