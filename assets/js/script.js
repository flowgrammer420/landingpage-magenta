// ======================================
// Theme Toggle Functionality
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        toggleIcon.textContent = '🌙';
        toggleText.textContent = 'Dark Mode';
    }

    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            toggleIcon.textContent = '🌙';
            toggleText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            toggleIcon.textContent = '☀️';
            toggleText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ======================================
    // Flip Box Functionality
    // ======================================
    const flipContainer = document.getElementById('flip-container');
    const adminLink = document.getElementById('admin-link');
    const backButton = document.getElementById('back-button');
    const n8nIframe = document.getElementById('n8n-iframe');

    // Admin link click event - flip to n8n iframe
    adminLink.addEventListener('click', function(e) {
        e.preventDefault();
        flipToAdmin();
    });

    // Back button click event - flip back to landing page
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        flipToLanding();
    });

    // Function to flip to admin panel
    function flipToAdmin() {
        flipContainer.classList.add('flipped');
        // Optionally reload iframe when flipping to admin
        // Uncomment the next line if you want to reload n8n on each flip
        // setTimeout(() => { n8nIframe.src = n8nIframe.src; }, 400);
    }

    // Function to flip back to landing page
    function flipToLanding() {
        flipContainer.classList.remove('flipped');
    }

    // Optional: Add keyboard shortcut (Escape key) to return to landing page
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && flipContainer.classList.contains('flipped')) {
            flipToLanding();
        }
    });

    // ======================================
    // Contact Form Handling
    // ======================================
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('response-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Display success message (replace with actual API call if needed)
        responseMessage.textContent = '✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'var(--neon-glow)';

        // Optional: Send to backend API
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     responseMessage.textContent = '✅ Message sent successfully!';
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     responseMessage.textContent = '❌ Error sending message. Please try again.';
        //     responseMessage.style.color = '#ff3333';
        // });

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    });

    // ======================================
    // Smooth Scroll for Navigation Links
    // ======================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]:not(#admin-link)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======================================
    // Console Log for Debugging
    // ======================================
    console.log('n8n Landing Page Loaded!');
    console.log('Theme:', currentTheme);
    console.log('Flip functionality initialized');
});