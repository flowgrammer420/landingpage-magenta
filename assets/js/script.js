// n8n Landing Page - Neon Dark Mode - Form Handler
// © 2025 n8n Landing

// Konfiguration
const CONFIG = {
  // WICHTIG: Ersetze diese URL mit deiner n8n Webhook-URL
  n8nWebhookUrl: 'https://deine-n8n-instanz.com/webhook/your-webhook-id',
  
  // Antwort-Nachrichten
  messages: {
    success: '✅ Erfolgreich gesendet! Wir melden uns bald bei dir.',
    error: '❌ Fehler beim Senden. Bitte versuche es später erneut.',
    validationError: '⚠️ Bitte fülle alle Felder korrekt aus.',
    networkError: '🚫 Netzwerkfehler. Bitte überprüfe deine Internetverbindung.'
  },
  
  // Timeout für API-Anfragen (in Millisekunden)
  timeout: 10000
};

// DOM-Elemente
const contactForm = document.getElementById('contactForm');
const responseMessage = document.getElementById('response-message');

// Formular-Validierung
function validateForm(formData) {
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  
  // Prüfe ob alle Felder ausgefüllt sind
  if (!name || !email || !message) {
    return { valid: false, error: 'Alle Felder müssen ausgefüllt werden.' };
  }
  
  // Prüfe Email-Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Bitte gib eine gültige E-Mail-Adresse ein.' };
  }
  
  // Prüfe Mindestlänge der Nachricht
  if (message.length < 10) {
    return { valid: false, error: 'Die Nachricht muss mindestens 10 Zeichen lang sein.' };
  }
  
  return { valid: true };
}

// Anzeige der Response-Nachricht
function showMessage(message, isSuccess = true) {
  responseMessage.textContent = message;
  responseMessage.style.display = 'block';
  responseMessage.style.color = isSuccess ? '#39ff14' : '#ff00de';
  responseMessage.style.textShadow = isSuccess 
    ? '0 0 10px #39ff14, 0 0 20px #39ff14'
    : '0 0 10px #ff00de, 0 0 20px #ff00de';
  
  // Verstecke die Nachricht nach 5 Sekunden
  setTimeout(() => {
    responseMessage.style.display = 'none';
  }, 5000);
}

// Formular-Submission Handler
async function handleFormSubmit(event) {
  event.preventDefault();
  
  // Hole Formular-Daten
  const formData = new FormData(contactForm);
  
  // Validiere Formular
  const validation = validateForm(formData);
  if (!validation.valid) {
    showMessage(validation.error, false);
    return;
  }
  
  // Erstelle JSON-Objekt
  const data = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    message: formData.get('message').trim(),
    timestamp: new Date().toISOString(),
    source: 'Neon Landing Page'
  };
  
  // Deaktiviere Submit-Button während der Anfrage
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Wird gesendet...';
  
  try {
    // Sende Daten an n8n Webhook mit Timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);
    
    const response = await fetch(CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Prüfe Response
    if (response.ok) {
      showMessage(CONFIG.messages.success, true);
      contactForm.reset(); // Formular zurücksetzen
    } else {
      console.error('Server Error:', response.status, response.statusText);
      showMessage(CONFIG.messages.error, false);
    }
    
  } catch (error) {
    console.error('Fetch Error:', error);
    
    if (error.name === 'AbortError') {
      showMessage('Zeitlimit überschritten. Bitte versuche es erneut.', false);
    } else {
      showMessage(CONFIG.messages.networkError, false);
    }
  } finally {
    // Aktiviere Submit-Button wieder
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

// Event-Listener hinzufügen
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Optionale Echtzeit-Validierung für bessere UX
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.style.borderColor = '#ff00de';
        this.style.boxShadow = '0 0 20px #ff00de80';
      } else {
        this.style.borderColor = '#39ff14';
        this.style.boxShadow = '0 0 10px #39ff1480';
      }
    });
    
    input.addEventListener('focus', function() {
      this.style.borderColor = '#00ffd0';
      this.style.boxShadow = '0 0 20px #00ffd080';
    });
  });
} else {
  console.error('Formular mit ID "contactForm" nicht gefunden.');
}

// Console-Log für Debugging
console.log('%c🌟 n8n Landing Page - Neon Dark Mode', 'color: #39ff14; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #39ff14;');
console.log('%cForm Handler initialisiert', 'color: #00f0ff; font-size: 14px;');
console.log('%cBitte konfiguriere die n8n Webhook-URL in script.js', 'color: #ff00de; font-size: 12px;');
