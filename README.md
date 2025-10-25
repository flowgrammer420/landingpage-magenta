# 🌟 n8n Landingpage - Neon Dark/Light Mode

Eine moderne Landing Page mit **Neon Dark/Light Mode Design** und n8n Automatisierungs-Integration.

## ✨ Design-Features

- **🌓 Dark/Light Mode Toggle** - Umschaltbar zwischen tiefschwarzen Darkmode und hellem Lightmode
- **🎨 Tiefschwarz Darkmode (Default)** - Hintergrund #000 (tiefschwarz) mit kräftigen Neonfarben
- **☀️ Light Mode** - Heller Hintergrund mit leuchtenden Farben
- **💾 Theme-Persistenz** - Speichert die Auswahl im LocalStorage
- **🎭 Oldschool Neon-Look** - Neonblau (#00f0ff), Neongrün (#39ff14), Neonpink (#ff1493)
- **✨ Moderne Animationen** - Pulsierende Neon-Effekte, glühende Ränder, Hover-Effekte
- **🔤 Orbitron Font** - Moderner Tech-Look mit Google Fonts Integration
- **📱 Responsive Design** - Optimiert für alle Bildschirmgrößen

## 🎯 Dark/Light Mode

Der User kann oben rechts zwischen zwei Modi umschalten:

### 🌙 Dark Mode (Standard)
- Hintergrund: Tiefschwarz (#000)
- Akzentfarben: Neongrün (#39ff14), Cyan (#00ffd0)
- Maximale Neon-Wirkung auf schwarzem Grund
- Animierte Background-Flicker-Effekte

### ☀️ Light Mode
- Hintergrund: Weiß (#ffffff)
- Akzentfarben: Pink (#ff1493), Hot Pink (#ff69b4)
- Helle, freundliche Atmosphäre
- Angepasste Schatten und Effekte

Der Toggle-Button passt sich automatisch an den aktiven Modus an und zeigt immer die nächste Option an.

## 📁 Projektstruktur

```
landingpage-n8n/
├── assets/
│   ├── css/
│   │   └── style.css          # Neon Dark/Light Mode Styling
│   └── js/
│       └── script.js           # Form-Handling, n8n Integration & Theme Toggle
├── index.html                  # Hauptseite mit Theme-Toggle
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
   - Öffne `assets/js/script.js`
   - Ersetze die URL in der CONFIG:
     ```javascript
     const CONFIG = {
       n8nWebhookUrl: 'DEINE-N8N-WEBHOOK-URL-HIER'
     };
     ```

4. **Deployment**
   
   - **GitHub Pages**: Aktiviere GitHub Pages in den Repository-Settings
   - **Eigener Server**: Kopiere alle Dateien in dein Webserver-Verzeichnis
   - **Netlify/Vercel**: Verbinde dein Repository für automatisches Deployment

## 🎨 Anpassungen

### Farben ändern

Bearbeite `assets/css/style.css`:

**Dark Mode Farben:**
```css
body.dark-mode {
  background: #000;  /* Tiefschwarz */
}

h1, h2, h3 {
  color: #39ff14;    /* Neongrün */
  text-shadow: ... #00ffd0;  /* Cyan Glow */
}
```

**Light Mode Farben:**
```css
body.light-mode h1,
body.light-mode h2,
body.light-mode h3 {
  color: #ff1493;    /* Deep Pink */
  text-shadow: ... #ff69b4;  /* Hot Pink Glow */
}
```

### Texte ändern

Bearbeite `index.html`:
```html
<h1>Dein Titel</h1>
<h2>Dein Untertitel</h2>
```

### Theme Toggle anpassen

Bearbeite `assets/js/script.js`:
```javascript
const CONFIG = {
  theme: {
    storageKey: 'dein-storage-key',
    darkMode: 'dark-mode',
    lightMode: 'light-mode'
  }
};
```

## 🔧 Technische Details

### Theme Toggle Funktionalität

- **LocalStorage-Persistenz**: Das gewählte Theme bleibt gespeichert
- **Smooth Transitions**: Sanfte Übergänge zwischen den Modi (0.3s)
- **Icon-Wechsel**: Toggle-Button zeigt ☀️ für Light Mode, 🌙 für Dark Mode
- **Dynamische Farbwechsel**: Alle Elemente passen sich automatisch an

### Browser-Kompatibilität

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅
- Mobile Browser: ✅

### Performance

- Keine externen Bibliotheken (außer Google Fonts)
- Vanilla JavaScript (keine jQuery)
- CSS Transitions für GPU-Beschleunigung
- LocalStorage für schnelles Theme-Loading

## 📝 n8n Workflow Beispiel

Ein einfacher n8n Workflow zum Empfangen der Formulardaten:

1. **Webhook Node**
   - Method: POST
   - Response Mode: Immediately

2. **Function Node** (optional - Datenverarbeitung)
   ```javascript
   return {
     name: $json.body.name,
     email: $json.body.email,
     message: $json.body.message,
     timestamp: $json.body.timestamp
   };
   ```

3. **Email Node** oder andere Aktionen
   - Sende Benachrichtigung
   - Speichere in Datenbank
   - Trigger weitere Workflows

## 🎯 Features

✅ Responsive Design
✅ Neon-Animationen
✅ Dark/Light Mode mit Toggle
✅ Theme-Persistenz (LocalStorage)
✅ Form-Validierung
✅ n8n Integration
✅ Fehlerbehandlung
✅ Loading-States
✅ Accessibility (ARIA-Labels)
✅ SEO-optimiert

## 📜 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🤝 Beitragen

Pull Requests sind willkommen! Bei größeren Änderungen öffne bitte zuerst ein Issue.

## 📞 Support

Bei Fragen oder Problemen erstelle ein [Issue](https://github.com/flowgrammer420/landingpage-n8n/issues).

---

**Erstellt mit 💚 und ⚡ Neon-Power**

*Powered by n8n Automation*
