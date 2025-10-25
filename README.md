# 🌟 n8n Landingpage - Neon Dark/Light Mode mit 3D-Flip Funktion

Eine moderne, responsive Landing Page für n8n mit Dark/Light Mode und innovativer **3D-Flip-Funktion** zum Admin-Bereich!

## ✨ Features

### 🎨 Design & Styling
- **Neon-inspiriertes Design** mit leuchtenden Effekten
- **Dark/Light Mode Toggle** mit persistenter Speicherung (localStorage)
- **Responsive Design** für alle Bildschirmgrößen (Desktop, Tablet, Mobile)
- **CSS Variables** für einfache Theme-Anpassung
- **Smooth Animations** und Übergänge

### 🔄 3D-Flip-Box-Funktion
- **CSS 3D-Transformation**: Flip-Effekt zwischen Landing Page und Admin Panel
- **Intuitive Navigation**: Klick auf "Admin Bereich" flippt zur n8n-Oberfläche
- **Zurück-Button**: Einfache Rückkehr zur Landing Page
- **Escape-Taste**: Keyboard-Shortcut zum Zurückkehren
- **Smooth Animation**: 0.8s cubic-bezier Übergang für flüssige Bewegung

### 🛠️ Technische Features
- **iframe Integration**: n8n läuft in vollständigem iframe auf der Rückseite
- **Backface-Visibility**: Verhindert Sichtbarkeit der Rückseite während der Animation
- **Transform-Style Preserve-3D**: Echte 3D-Transformation
- **Kontaktformular** mit Validierung und Erfolgsanzeige
- **Smooth Scroll** für Navigationslinks

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Haupt-HTML mit Flip-Container
├── README.md               # Diese Dokumentation
│
└── assets/
    ├── css/
    │   └── style.css       # Styling inkl. 3D-Flip & Theme
    └── js/
        └── script.js       # JavaScript für Flip & Theme Toggle
```

## 🚀 Installation & Setup

### 1. Repository klonen
```bash
git clone https://github.com/flowgrammer420/landingpage-n8n.git
cd landingpage-n8n
```

### 2. n8n lokal starten
```bash
# Mit Docker
docker run -d \
  --name n8n \
  -p 8080:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Oder mit npm
npm install n8n -g
n8n start
```

### 3. Landing Page öffnen
```bash
# Mit Python Simple HTTP Server
python3 -m http.server 8000

# Oder mit Node.js http-server
npx http-server -p 8000
```

Öffne im Browser: `http://localhost:8000`

## 🔧 nginx Reverse Proxy Konfiguration

Für produktive Umgebungen empfehlen wir einen nginx Reverse Proxy:

### nginx Config für Landing Page + n8n iframe

```nginx
server {
    listen 80;
    server_name ihre-domain.de;

    # Landing Page
    location / {
        root /var/www/landingpage-n8n;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # n8n Reverse Proxy für iframe
    location /n8n/ {
        proxy_pass http://localhost:5678/;
        proxy_http_version 1.1;
        
        # WebSocket Support für n8n
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Standard Proxy Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # iframe Header (wichtig!)
        proxy_hide_header X-Frame-Options;
        add_header X-Frame-Options "SAMEORIGIN";
        
        # Timeouts für n8n Workflows
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
    }

    # Optional: Static Assets Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### SSL/HTTPS Konfiguration (empfohlen)

```nginx
server {
    listen 443 ssl http2;
    server_name ihre-domain.de;

    # SSL Zertifikate (z.B. Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/ihre-domain.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ihre-domain.de/privkey.pem;

    # Rest der Konfiguration wie oben...
}

# HTTP zu HTTPS Redirect
server {
    listen 80;
    server_name ihre-domain.de;
    return 301 https://$server_name$request_uri;
}
```

### nginx Installation & Start

```bash
# nginx installieren
sudo apt update
sudo apt install nginx

# Config testen
sudo nginx -t

# nginx neu laden
sudo systemctl reload nginx

# Status prüfen
sudo systemctl status nginx
```

## 💡 Verwendung der Flip-Funktion

### Zur Admin-Ansicht wechseln
1. **Klick auf "Admin Bereich"** in der Navigation
2. Die Seite flippt mit 3D-Animation zur Rückseite
3. n8n iframe wird angezeigt

### Zurück zur Landing Page
- **Klick auf "← Zurück"** Button (oben links)
- **Escape-Taste** drücken (Keyboard-Shortcut)

### Technische Details
```javascript
// Flip zu Admin
flipContainer.classList.add('flipped');

// Flip zurück zu Landing
flipContainer.classList.remove('flipped');
```

## 🎨 Theme Anpassung

### CSS Variables in `style.css`

```css
/* Dark Mode (Standard) */
:root {
  --bg-color: #0a0e27;
  --text-color: #39ff14;
  --neon-glow: #39ff14;
  --nav-bg: rgba(57, 255, 20, 0.1);
  /* ... weitere Variablen */
}

/* Light Mode */
body.light-mode {
  --bg-color: #f0f4f8;
  --text-color: #1a1a2e;
  --neon-glow: #0066ff;
  /* ... weitere Variablen */
}
```

### Theme Toggle im Code
```javascript
// Theme wechseln
themeToggleBtn.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', /* ... */);
});
```

## 🔐 n8n Sicherheit & iframe Considerations

### Wichtige Sicherheitshinweise

1. **X-Frame-Options**: Stelle sicher, dass n8n iframe-fähig ist
   ```nginx
   proxy_hide_header X-Frame-Options;
   add_header X-Frame-Options "SAMEORIGIN";
   ```

2. **Authentication**: n8n sollte mit Passwort geschützt sein
   ```bash
   # In n8n .env oder docker-compose.yml
   N8N_BASIC_AUTH_ACTIVE=true
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=secure_password
   ```

3. **CORS Headers**: Bei Bedarf CORS konfigurieren

4. **HTTPS verwenden**: Besonders wichtig für Produktivumgebungen

## 🐛 Troubleshooting

### iframe zeigt nichts an
- **Prüfe X-Frame-Options**: Konsole öffnen (F12) und nach Fehlern suchen
- **Prüfe n8n URL**: Ist n8n unter `http://localhost:8080/n8n/` erreichbar?
- **Browser Cache leeren**: Strg+Shift+R

### Flip-Animation funktioniert nicht
- **JavaScript Fehler?**: Konsole prüfen (F12)
- **CSS geladen?**: Netzwerk-Tab in DevTools prüfen
- **Browser-Support**: Moderne Browser erforderlich (Chrome, Firefox, Safari, Edge)

### Theme wechselt nicht
- **localStorage aktiviert?**: Private Browsing kann localStorage deaktivieren
- **JavaScript aktiv?**: script.js korrekt eingebunden?

## 📱 Responsive Breakpoints

```css
/* Tablet & Mobile */
@media (max-width: 768px) {
  /* Anpassungen für Tablets */
}

/* Mobile nur */
@media (max-width: 480px) {
  /* Anpassungen für Smartphones */
}
```

## 🚧 Geplante Features

- [ ] **Multi-Page Flip**: Mehrere Admin-Panels (n8n, Grafana, etc.)
- [ ] **Animation Options**: Verschiedene Flip-Animationen wählbar
- [ ] **Progressive Web App**: Offline-Funktionalität
- [ ] **API Integration**: Kontaktformular an Backend anbinden
- [ ] **Analytics**: Nutzungsstatistiken

## 🤝 Beitragen

Pull Requests sind willkommen! Für größere Änderungen bitte zuerst ein Issue öffnen.

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🙏 Credits

- **n8n**: [https://n8n.io](https://n8n.io)
- **Fonts**: Google Fonts (Orbitron, Roboto)
- **Icons**: Emoji Icons

## 📧 Kontakt

Bei Fragen oder Problemen:
- **GitHub Issues**: [https://github.com/flowgrammer420/landingpage-n8n/issues](https://github.com/flowgrammer420/landingpage-n8n/issues)
- **Email**: Über Kontaktformular auf der Landing Page

---

**Viel Spaß mit der n8n Landing Page! 🚀✨**