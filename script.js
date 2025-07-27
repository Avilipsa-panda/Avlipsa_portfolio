// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Skill Bar Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.getAttribute('data-width');
                skillFill.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Initialize skill bar animation when DOM is loaded
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

// Google Apps Script Web App URL - Replace with your actual URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLnLWOzkIlQPAoMFZT2VAk0t_ca_KG0t_cyMJjfrC7qLeGWcjiJsqA_TUGjhmSWP5N/exec';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
        // Send data to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Show success message
        showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        contactForm.reset();

    } catch (error) {
        console.error('Error:', error);
        showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or contact me directly via email.');
    } finally {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Show form status message
function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Form validation
const validateForm = () => {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e9ecef';
        }
    });

    // Email validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
        isValid = false;
    }

    return isValid;
};

// Real-time form validation
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', validateForm);
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = '#e9ecef';
        }
    });
});

// Typing Animation for Hero Section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item, .tech-icon');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Console message for developers
console.log(`
🚀 Portfolio Website
👨‍💻 Built with HTML, CSS & JavaScript
📧 Contact: your.email@example.com
🌐 GitHub: https://github.com/yourusername

Thanks for checking out the code! 
Feel free to reach out if you have any questions.
`);

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            this.alt = 'Image not found';
        });
    });
});