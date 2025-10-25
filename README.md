# 🌟 n8n Landingpage - Neon Dark Mode

Eine moderne Landing Page mit **Neon Dark Mode Design** und n8n Automatisierungs-Integration.

## ✨ Design-Features

- **Neon Dark Mode** - Dunkler Hintergrund mit leuchtenden Neonfarben
- **Oldschool Neon-Look** - Neonblau (#00f0ff), Neongrün (#39ff14), Neonpink (#ff00de)
- **Moderne Animationen** - Pulsierende Neon-Effekte, glühende Ränder, Hover-Effekte
- **Orbitron Font** - Moderner Tech-Look mit Google Fonts Integration
- **Responsive Design** - Optimiert für alle Bildschirmgrößen

## 📁 Projektstruktur

```
landingpage-n8n/
├── assets/
│   ├── css/
│   │   └── style.css          # Neon Dark Mode Styling
│   └── js/
│       └── script.js           # Form-Handling & n8n Integration
├── index.html                  # Hauptseite mit Neon-Design
└── README.md                   # Diese Datei
```

## 🚀 Setup-Anleitung

### Voraussetzungen

- Webserver (Apache, Nginx, Python SimpleHTTPServer, oder GitHub Pages)
- n8n Instanz (selbst-gehostet oder Cloud)
- Moderner Webbrowser

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/flowgrammer420/landingpage-n8n.git
   cd landingpage-n8n
   ```

2. **Lokal testen**
   
   Mit Python (einfachste Methode):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Dann im Browser öffnen: `http://localhost:8000`

3. **n8n Webhook konfigurieren**
   
   - Erstelle einen neuen Workflow in n8n
   - Füge einen "Webhook" Node hinzu
   - Kopiere die Webhook-URL
   - Öffne `assets/js/script.js` und füge deine Webhook-URL ein:
   ```javascript
   const n8nWebhookUrl = 'https://deine-n8n-instanz.com/webhook/your-webhook-id';
   ```

## 🎨 Design-Anpassungen

### Farben ändern

Öffne `assets/css/style.css` und passe die Neonfarben an:

```css
/* Hauptfarben */
#39ff14  /* Neongrün */
#00f0ff  /* Neonblau */
#ff00de  /* Neonpink */
#00ffd0  /* Cyan */
```

### Animationen anpassen

Animationsgeschwindigkeit ändern:

```css
/* In style.css */
animation: bg-flicker 10s infinite alternate;  /* Hintergrund */
animation: neon-glow 2s infinite alternate;    /* Container */
animation: button-fade 2s infinite alternate;  /* Button */
```

## 🧪 Testen mit neuen Daten

### Methode 1: Direktes Testen im Browser

1. Öffne die `index.html` im Browser
2. Fülle das Formular mit Testdaten aus:
   - **Name:** Max Mustermann
   - **Email:** max@example.com
   - **Nachricht:** Dies ist eine Testnachricht
3. Klicke auf "Absenden"
4. Überprüfe die Antwort auf der Seite
5. Kontrolliere in n8n, ob der Webhook die Daten empfangen hat

### Methode 2: Mit verschiedenen Browsern testen

Teste die Landingpage in verschiedenen Browsern:

- **Chrome/Edge:** Vollständige Unterstützung aller Effekte
- **Firefox:** Gute Unterstützung
- **Safari:** Teste besonders die Animationen
- **Mobile Browsers:** Teste responsive Design

### Methode 3: n8n Workflow testen

1. **In n8n einen Test-Workflow erstellen:**
   ```
   Webhook → Function (Daten verarbeiten) → Email/Slack/Discord
   ```

2. **Webhook Node konfigurieren:**
   - Method: POST
   - Path: /contact-form
   - Response Mode: "When Last Node Finishes"

3. **Test-Daten senden:**
   
   Via cURL:
   ```bash
   curl -X POST https://deine-n8n-instanz.com/webhook/your-webhook-id \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "Dies ist eine Testnachricht"
     }'
   ```
   
   Via JavaScript (Browser Console):
   ```javascript
   fetch('https://deine-n8n-instanz.com/webhook/your-webhook-id', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       name: 'Test User',
       email: 'test@example.com',
       message: 'Dies ist eine Testnachricht'
     })
   })
   .then(response => response.json())
   .then(data => console.log('Erfolg:', data))
   .catch((error) => console.error('Fehler:', error));
   ```

### Methode 4: Formular mit verschiedenen Szenarien testen

Teste diese Szenarien:

| Test-Szenario | Name | Email | Nachricht | Erwartetes Ergebnis |
|--------------|------|-------|-----------|---------------------|
| ✅ Gültige Daten | Max Mustermann | max@test.de | Hallo! | Erfolgsmeldung |
| ❌ Leeres Feld | (leer) | test@test.de | Hallo | Validierungsfehler |
| ❌ Ungültige Email | Max | ungültig | Hallo | Validierungsfehler |
| ✅ Lange Nachricht | Test | test@test.de | 500+ Zeichen | Erfolgsmeldung |
| ✅ Sonderzeichen | Müller | test@example.com | Ä Ö Ü ß | Erfolgsmeldung |

## 📝 Checkliste für Änderungen

Wenn du das Design oder die Funktionalität anpasst:

- [ ] **HTML geändert?** → Teste alle Links und Formulare
- [ ] **CSS geändert?** → Teste in verschiedenen Browsern
- [ ] **JavaScript geändert?** → Teste Formular-Submission
- [ ] **n8n Webhook geändert?** → Teste Datenübermittlung
- [ ] **Responsive Design geprüft?** → Teste auf Mobile/Tablet

## 🔧 Fehlerbehebung

### Formular sendet keine Daten

1. Öffne Browser DevTools (F12)
2. Wechsle zum "Network" Tab
3. Sende das Formular ab
4. Überprüfe die POST-Anfrage
5. Kontrolliere die n8n Webhook-URL

### Animationen funktionieren nicht

1. Überprüfe, ob die CSS-Datei korrekt geladen wird
2. Teste in einem anderen Browser
3. Deaktiviere Browser-Erweiterungen (AdBlocker, etc.)

### Neon-Effekte werden nicht angezeigt

1. Stelle sicher, dass die Google Font (Orbitron) geladen wird
2. Überprüfe die CSS box-shadow und text-shadow Regeln
3. Teste mit aktivierter Hardware-Beschleunigung im Browser

## 📚 Weitere Ressourcen

- [n8n Dokumentation](https://docs.n8n.io/)
- [n8n Webhook Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Google Fonts - Orbitron](https://fonts.google.com/specimen/Orbitron)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz.

## 🤝 Beitragen

Fühle dich frei, Issues zu erstellen oder Pull Requests einzureichen!

---

© 2025 n8n Landing | Powered by n8n automation
