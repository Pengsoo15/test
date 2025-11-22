// ============================================
// Theme Toggle Functionality
// ============================================

/**
 * Initialize theme on page load
 * Checks localStorage for saved theme preference
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleIcon('☀️');
    }

    // Initialize all event listeners
    initThemeToggle();
    initMobileNav();
    initFormValidation();
    initFadeInObserver();
});

/**
 * Theme toggle button handler
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                updateThemeToggleIcon('☀️');
            } else {
                localStorage.setItem('theme', 'light');
                updateThemeToggleIcon('🌙');
            }
        });
    }
}

/**
 * Update theme toggle button icon
 * @param {string} icon - The emoji icon to display
 */
function updateThemeToggleIcon(icon) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = icon;
    }
}

// ============================================
// Mobile Navigation Toggle
// ============================================

/**
 * Handle mobile navigation menu toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ============================================
// Form Validation & Submission
// ============================================

/**
 * Initialize form validation for submit-ai.html
 */
function initFormValidation() {
    const submitForm = document.getElementById('submitForm');
    
    if (submitForm) {
        submitForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Validate form
            if (validateForm()) {
                // Collect form data
                const formData = {
                    userName: document.getElementById('userName').value,
                    userEmail: document.getElementById('userEmail').value,
                    aiName: document.getElementById('aiName').value,
                    aiUrl: document.getElementById('aiUrl').value,
                    category: document.getElementById('category').value,
                    pricing: document.getElementById('pricing').value,
                    description: document.getElementById('description').value,
                    tags: document.getElementById('tags').value,
                    timestamp: new Date().toISOString()
                };

                // Log submission to console (simulates server submission)
                console.log('Form Submission:', formData);

                // Show success modal
                showSuccessModal();

                // Clear the form
                submitForm.reset();
            }
        });
    }
}

/**
 * Validate all required form fields
 * @returns {boolean} - True if form is valid
 */
function validateForm() {
    const requiredFields = [
        'userName',
        'userEmail',
        'aiName',
        'aiUrl',
        'category',
        'pricing',
        'description'
    ];

    let isValid = true;

    // Check all required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    // Check terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Please confirm the terms before submitting.');
        isValid = false;
    }

    return isValid;
}

/**
 * Display success modal after form submission
 */
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalBtn = document.getElementById('modalBtn');

    if (modal) {
        modal.classList.add('active');

        // Close modal handlers
        const closeModal = function() {
            modal.classList.remove('active');
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalBtn) {
            modalBtn.addEventListener('click', closeModal);
        }

        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// ============================================
// Fade-In Animation on Scroll
// ============================================

/**
 * Initialize Intersection Observer for fade-in animations
 */
function initFadeInObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start slightly before element enters viewport
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback: just make all elements visible
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}
// ============================================
// Dropdown Menu (Click-based)
// ============================================

function initDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    
    if (!dropdown || !dropbtn) return;

    // Toggle dropdown on button click
    dropbtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });

    // Close dropdown when clicking a menu item
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    });
}

// Update the DOMContentLoaded section in script.js
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleIcon('☀️');
    }

    // Initialize all event listeners
    initThemeToggle();
    initMobileNav();
    initFormValidation();
    initFadeInObserver();
    initDropdown(); // Add this line
});