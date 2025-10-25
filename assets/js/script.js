// n8n Landing Page - Neon Dark/Light Mode - Form Handler & Theme Switcher
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
  timeout: 10000,
  
  // Theme-Einstellungen
  theme: {
    storageKey: 'n8n-landing-theme',
    darkMode: 'dark-mode',
    lightMode: 'light-mode'
  }
};

// DOM-Elemente
const contactForm = document.getElementById('contactForm');
const responseMessage = document.getElementById('response-message');
const themeToggleBtn = document.getElementById('theme-toggle');

// =====================
// THEME TOGGLE LOGIC
// =====================

// Theme initialisieren beim Laden der Seite
function initTheme() {
  // Prüfe ob Theme im localStorage gespeichert ist
  const savedTheme = localStorage.getItem(CONFIG.theme.storageKey);
  
  if (savedTheme) {
    // Verwende gespeichertes Theme
    setTheme(savedTheme);
  } else {
    // Default: Dark Mode
    setTheme(CONFIG.theme.darkMode);
  }
}

// Theme setzen
function setTheme(theme) {
  const body = document.body;
  
  if (theme === CONFIG.theme.darkMode) {
    body.classList.remove(CONFIG.theme.lightMode);
    body.classList.add(CONFIG.theme.darkMode);
    updateToggleButton('light'); // Zeige "Light Mode" als nächste Option
  } else {
    body.classList.remove(CONFIG.theme.darkMode);
    body.classList.add(CONFIG.theme.lightMode);
    updateToggleButton('dark'); // Zeige "Dark Mode" als nächste Option
  }
  
  // Speichere Theme im localStorage
  localStorage.setItem(CONFIG.theme.storageKey, theme);
}

// Toggle Button Text und Icon aktualisieren
function updateToggleButton(nextMode) {
  const toggleIcon = themeToggleBtn.querySelector('.toggle-icon');
  const toggleText = themeToggleBtn.querySelector('.toggle-text');
  
  if (nextMode === 'light') {
    toggleIcon.textContent = '☀️';
    toggleText.textContent = 'Light Mode';
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    toggleIcon.textContent = '🌙';
    toggleText.textContent = 'Dark Mode';
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Theme Toggle Event Listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.classList.contains(CONFIG.theme.darkMode) 
      ? CONFIG.theme.darkMode 
      : CONFIG.theme.lightMode;
    
    // Wechsle Theme
    const newTheme = currentTheme === CONFIG.theme.darkMode 
      ? CONFIG.theme.lightMode 
      : CONFIG.theme.darkMode;
    
    setTheme(newTheme);
  });
}

// =====================
// FORM HANDLING LOGIC
// =====================

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
  
  // Prüfe Mindestlänge für Name
  if (name.length < 2) {
    return { valid: false, error: 'Name muss mindestens 2 Zeichen lang sein.' };
  }
  
  // Prüfe Mindestlänge für Nachricht
  if (message.length < 10) {
    return { valid: false, error: 'Nachricht muss mindestens 10 Zeichen lang sein.' };
  }
  
  return { valid: true };
}

// Nachricht anzeigen
function showMessage(message, isError = false) {
  responseMessage.textContent = message;
  responseMessage.style.display = 'block';
  responseMessage.style.color = isError ? '#ff1493' : '#39ff14';
  
  // Nach 5 Sekunden ausblenden
  setTimeout(() => {
    responseMessage.style.display = 'none';
  }, 5000);
}

// Daten an n8n Webhook senden
async function sendToN8n(formData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);
  
  try {
    const response = await fetch(CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: CONFIG.messages.error };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      return { success: false, error: 'Zeitüberschreitung. Bitte versuche es erneut.' };
    }
    
    return { success: false, error: CONFIG.messages.networkError };
  }
}

// Form Submit Event
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Formular-Daten sammeln
    const formData = new FormData(contactForm);
    
    // Validierung
    const validation = validateForm(formData);
    if (!validation.valid) {
      showMessage(validation.error, true);
      return;
    }
    
    // Lade-Indikator (Button deaktivieren)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Sende...';
    
    // Daten senden
    const result = await sendToN8n(formData);
    
    // Button wieder aktivieren
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    
    // Ergebnis anzeigen
    if (result.success) {
      showMessage(CONFIG.messages.success, false);
      contactForm.reset();
    } else {
      showMessage(result.error, true);
    }
  });
}

// =====================
// INITIALIZATION
// =====================

// Initialisiere Theme beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  console.log('✨ n8n Landing Page geladen - Neon Dark/Light Mode aktiv!');
});
