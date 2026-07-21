// Contact page animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeFormHandling();
    initializeCharacterCounter();
});

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.contact-animate');

    // Initial check for elements already in view
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');
        }
    });

    // Setup Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        // Form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Get form data
            const formData = new FormData(this);

            // Show success message (since form is disabled for now)
            showFormMessage('success', 'Thanks for reaching out! We\'ll get back to you soon. For now, please use our email or phone contact information.');

            // Reset form
            this.classList.remove('was-validated');
            this.reset();
            document.getElementById('charCount').textContent = '0';
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('change', function() {
                validateField(this);
            });
        });
    }
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (field.value.trim() !== '') {
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    } else {
        field.classList.remove('is-valid', 'is-invalid');
    }
}

function showFormMessage(type, message) {
    const formStatus = document.getElementById('formStatus');
    
    let alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    let icon = type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle';
    
    formStatus.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show d-flex align-items-center" role="alert">
            <i class="bi ${icon} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            const alert = formStatus.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    }
}

function initializeCharacterCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            charCount.textContent = this.value.length;

            // Prevent exceeding 500 characters
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = '500';
            }
        });
    }
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
