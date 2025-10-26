# 🌟 n8n Landingpage mit AI Starter Kit - Docker Edition

Eine vollständig containerisierte n8n Landing Page mit Docker Compose, Nginx Reverse Proxy, n8n AI Starter Kit Support und animiertem GIF-Hintergrund im Neon-Style!

## ✨ Features

### 🎨 Animierter GIF-Hintergrund
- **Dynamischer visueller Effekt**: Beweglicher GIF-Hintergrund aus Giphy für moderne Optik
- **Dark Overlay**: Halbtransparente dunkle Schicht (rgba(0, 0, 0, 0.7)) für optimale Lesbarkeit
- **Fixed Positioning**: Hintergrund bleibt beim Scrollen fixiert
- **Responsive**: Passt sich allen Bildschirmgrößen an (background-size: cover)
- **Performance-optimiert**: CSS-basiert, keine JavaScript-Animationen nötig

### 📋 Klassisches Menü
- **Responsive Navigation**: Flexibles Menü mit Home, Netzwerkeditor, n8n, Kontakt
- **Neon-Style**: Grüne (#39ff14) Buttons mit Hover-Effekten und Glow
- **Mobile-optimiert**: Vertikale Anordnung auf kleinen Bildschirmen
- **n8n-Link**: Direkter Zugriff auf n8n-Interface unter /n8n/
- **Kein Seitenwechsel nötig**: Kontakt-Formular direkt auf der Startseite

### 🐳 Docker Integration
- **Ein-Befehl-Deployment**: `docker compose up -d` startet alles
- **Nginx Reverse Proxy** auf Port 8080: Statische Landing Page und n8n unter `/n8n/`
- **n8n AI Starter Kit Ready**: Mit Postgres und Qdrant für AI-Workflows
- **Separate Ports für bessere Stabilität**:
  - nginx: Port 8080 (öffentlich)
  - n8n: Port 5680 (mapped von intern 5678)
  - qdrant: Port 6333 (für Vector DB)
- **Automatische Container-Orchestrierung**: Nginx wartet auf n8n
- **Persistent Storage**: n8n, Postgres und Qdrant Daten bleiben erhalten
- **Optimierte Nginx-Konfiguration**: Gzip, Caching, WebSocket Support

### 🎨 Design & UI
- **Neon-inspiriertes Design** mit leuchtenden #39ff14 Effekten
- **Animierter GIF-Hintergrund**: Moderner visueller Effekt mit optimaler Kontraststufe
- **Dark/Light Mode Toggle** mit persistenter Speicherung
- **Responsive Design** für alle Bildschirmgrößen
- **Optimierte Asset-Auslieferung** durch Nginx
- **Smooth Scrolling**: Sanfte Übergänge zwischen Sektionen

### 🔌 Netzwerk-Topologie Editor
- **Interaktiver Netzwerk-Editor** mit Drag & Drop (feature.html)
- **Konva.js** für leistungsstarke Canvas-basierte Visualisierung
- **Device Palette**: Router, Switch, Server, PC, Firewall per Klick hinzufügen
- **Echtzeit-Verbindungen**: Klick auf zwei Geräte erstellt automatisch Verbindungen
- **Neon-Design**: Grüne Borders und Glow-Effekte passend zur Landing Page
- **Responsive & Touch-optimiert**
- **Draggable Nodes**: Alle Netzwerkgeräte frei verschiebbar

### 📧 Kontaktformular
- **Direkt auf Startseite**: Kein extra Routing nötig
- **Validierung**: Name, E-Mail, Nachricht sind Pflichtfelder
- **n8n Webhook Integration**: Formulardaten werden an n8n gesendet
- **Feedback-Benachrichtigungen**: Erfolgs- und Fehlermeldungen

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Landing Page mit GIF-Hintergrund und klassischem Menü
├── feature.html            # Netzwerk-Topologie Editor mit Konva.js
├── README.md               # Diese Dokumentation
│
├── assets/
│   ├── css/
│   │   └── style.css       # Hauptstyles (Neon-Design, ohne Flip-Styles)
│   └── js/
│       ├── main.js         # Contact Form und Smooth Scroll
│       └── script.js       # Theme Toggle und weitere Features
│
└── backend/
    ├── docker-compose.yml  # Vollständige Container-Orchestrierung
    ├── nginx.conf          # Nginx Reverse Proxy Konfiguration
    └── .env.example        # Umgebungsvariablen Template
```

## 🚀 Quick Start

### Voraussetzungen
- Docker & Docker Compose installiert
- Ports 8080, 5680, 6333 verfügbar

### Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/flowgrammer420/landingpage-n8n.git
   cd landingpage-n8n
   ```

2. **Environment konfigurieren**:
   ```bash
   cd backend
   cp .env.example .env
   # .env nach Bedarf anpassen
   ```

3. **Container starten**:
   ```bash
   docker compose up -d
   ```

4. **Zugriff**:
   - Landing Page: `http://localhost:8080`
   - n8n Interface: `http://localhost:8080/n8n/`
   - Netzwerk-Editor: `http://localhost:8080/feature.html`

## 🎯 Verwendung

### Landing Page
- **Responsive Navigation**: Menü oben mit allen wichtigen Links
- **GIF-Hintergrund**: Automatisch geladen und animiert
- **n8n-Zugriff**: Klick auf "n8n" im Menü öffnet /n8n/
- **Kontaktformular**: Scroll zu "Kontakt" oder klick im Menü

### Netzwerk-Editor
- **Geräte hinzufügen**: Buttons in der Palette links klicken
- **Verbindungen erstellen**: Zwei Geräte nacheinander anklicken
- **Geräte verschieben**: Drag & Drop auf dem Canvas
- **Zurück**: "Home" im Menü oben

## 🔧 Konfiguration

### n8n Settings
- Webhook URL für Kontaktformular in `main.js` anpassen
- n8n Workflows können über das Admin-Interface erstellt werden

### Styling
- Neon-Farbe (#39ff14) in `style.css` änderbar
- GIF-URL in `index.html` und `feature.html` anpassbar
- Overlay-Transparenz (0.7) in beiden HTML-Dateien einstellbar

### Docker
- Ports in `docker-compose.yml` anpassbar
- Nginx Konfiguration in `nginx.conf`
- Umgebungsvariablen in `.env`

## 📝 Technologie-Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Canvas-Rendering**: Konva.js (Netzwerk-Editor)
- **Backend**: n8n (Workflow Automation)
- **Database**: PostgreSQL (n8n Daten)
- **Vector DB**: Qdrant (AI Embeddings)
- **Webserver**: Nginx (Reverse Proxy)
- **Container**: Docker & Docker Compose

## 🎨 Design-Prinzipien

- **Neon Dark Mode**: Grüne (#39ff14) Leuchteffekte auf dunklem Hintergrund
- **Animated Background**: GIF für dynamische, moderne Optik
- **Minimalistisch**: Fokus auf Funktionalität ohne Überladung
- **Responsive First**: Mobile-optimiert von Grund auf
- **Performance**: Leichtgewichtig, keine unnötigen Frameworks

## 📦 Container-Details

### nginx (Port 8080)
- Statische Files (index.html, assets)
- Reverse Proxy für n8n unter `/n8n/`
- Gzip Kompression
- Browser Caching Headers

### n8n (Port 5680)
- Workflow Automation Platform
- WebHook Endpoints
- AI Starter Kit Support

### postgres (intern)
- n8n Datenbank
- Persistent Storage

### qdrant (Port 6333)
- Vector Database
- AI Embeddings Storage

## 🤝 Contributing

Beiträge sind willkommen! Bitte:
1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📄 Lizenz

Dieses Projekt ist Open Source und verfügbar unter der MIT License.

## 🙏 Credits

- **n8n**: Workflow Automation Platform
- **Konva.js**: Canvas Library für Netzwerk-Editor
- **Giphy**: GIF-Hintergrund
- **Docker**: Containerisierung

---

**Happy Automating! 🚀**
