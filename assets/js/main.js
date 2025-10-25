// Landingpage n8n - Main JavaScript

// Configuration
const CONFIG = {
  n8nWebhookUrl: 'https://your-n8n-instance.com/webhook/contact', // Update this with your actual webhook URL
  formId: 'contactForm',
  successMessage: 'Thank you! Your message has been sent successfully.',
  errorMessage: 'Oops! Something went wrong. Please try again later.'
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
  initSmoothScroll();
});

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById(CONFIG.formId);
  
  if (!form) {
    console.warn('Contact form not found');
    return;
  }
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value,
      timestamp: new Date().toISOString()
    };
    
    // Validate form data
    if (!validateFormData(formData)) {
      return;
    }
    
    // Send data to n8n
    await sendToN8n(formData);
  });
}

// Form Validation
function validateFormData(data) {
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    showNotification('Please enter a valid name', 'error');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showNotification('Please enter a valid email address', 'error');
    return false;
  }
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    showNotification('Please enter a message (at least 10 characters)', 'error');
    return false;
  }
  
  return true;
}

// Send data to n8n webhook
async function sendToN8n(data) {
  const submitButton = document.querySelector('button[type="submit"]');
  
  try {
    // Disable button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    const response = await fetch(CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showNotification(CONFIG.successMessage, 'success');
      document.getElementById(CONFIG.formId).reset();
    } else {
      throw new Error('Server responded with an error');
    }
  } catch (error) {
    console.error('Error sending form data:', error);
    showNotification(CONFIG.errorMessage, 'error');
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Fade in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateFormData,
    showNotification
  };
}
