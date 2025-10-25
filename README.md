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
# Mit Docker (direkt auf Port 5678)
docker run -d \
  --name n8n \
  -p 5678:5678 \
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

## ⚙️ iframe Konfiguration

Das iframe im Admin-Bereich kann auf zwei Arten konfiguriert werden:

### Option 1: Direkter Zugriff (Standard)

**Aktuell aktiv** - Das iframe zeigt direkt auf die n8n-Instanz:

```html
<iframe src="http://localhost:5678/" ...>
```

**Vorteile:**
- Einfachste Konfiguration
- Keine zusätzlichen Proxy-Server notwendig
- Direkte Verbindung zu n8n

**Setup:**
- n8n muss auf Port 5678 laufen (Standardport)
- Keine weiteren Konfigurationen notwendig

### Option 2: Via nginx Reverse Proxy

Für produktive Umgebungen oder komplexere Setups:

```html
<iframe src="http://localhost:8080/n8n/" ...>
```

**Vorteile:**
- Mehrere Services über einen Port
- SSL/TLS-Terminierung möglich
- Zusätzliche Sicherheitsfeatures
- URL-Pfad-basiertes Routing

**Anpassung in index.html:**

Ändere die iframe-URL in der Datei `index.html` (Zeile ~63):

```html
<!-- Für nginx Proxy: -->
<iframe src="http://localhost:8080/n8n/" 
        title="n8n Workflow Automation" 
        id="n8n-iframe"
        frameborder="0" 
        allowfullscreen>
</iframe>
```

## 🔧 nginx Reverse Proxy Konfiguration

Für produktive Umgebungen empfehlen wir einen nginx Reverse Proxy:

```nginx
server {
    listen 8080;
    server_name localhost;

    # Landing Page
    location / {
        root /pfad/zu/landingpage-n8n;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # n8n Proxy
    location /n8n/ {
        proxy_pass http://localhost:5678/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Wichtig für iframe Integration
        proxy_hide_header X-Frame-Options;
        add_header X-Frame-Options "SAMEORIGIN";
    }
}
```

**nginx starten:**

```bash
# Konfiguration testen
nginx -t

# nginx starten/neuladen
sudo systemctl restart nginx
```

## 🎯 Anwendungsfälle

### Entwicklungsumgebung
- **Empfehlung:** Option 1 (Direkter Zugriff)
- Schnelles Setup ohne zusätzliche Konfiguration
- n8n läuft direkt auf Port 5678

### Produktionsumgebung
- **Empfehlung:** Option 2 (nginx Proxy)
- Professionelles Setup mit SSL
- Mehrere Services über einen Port
- Bessere Kontrolle und Sicherheit

## 🎨 Anpassungen

### Theme-Farben ändern

Bearbeite `assets/css/style.css` und passe die CSS-Variablen an:

```css
:root {
    --primary-color: #39ff14;      /* Neon-Grün */
    --secondary-color: #ff073a;    /* Neon-Rot */
    --accent-color: #00d4ff;       /* Neon-Blau */
    /* ... weitere Variablen */
}
```

### Flip-Animation anpassen

```css
.flip-container.flipped {
    transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
    /* Ändere Dauer und Easing nach Bedarf */
}
```

## 🐛 Troubleshooting

### iframe zeigt n8n nicht an

- **Prüfe n8n Status**: Ist n8n unter `http://localhost:5678/` (oder `http://localhost:8080/n8n/` bei nginx) erreichbar?
- **Prüfe iframe URL**: Stimmt die URL im `index.html` mit deinem Setup überein?
- **Prüfe X-Frame-Options**: Konsole öffnen (F12) und nach Fehlern suchen
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
