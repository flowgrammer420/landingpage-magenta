# 🌟 n8n Landingpage mit AI Starter Kit - Docker Edition

Eine vollständig containerisierte n8n Landing Page mit Docker Compose, Nginx Reverse Proxy, n8n AI Starter Kit Support und 3D-Flip-Funktion!

## ✨ Features

### 🐳 Docker Integration
- **Ein-Befehl-Deployment**: `docker compose up -d` startet alles
- **Nginx Reverse Proxy** auf Port 8080: Statische Landing Page und n8n hinter `/n8n/`
- **n8n AI Starter Kit Ready**: Mit Postgres und Qdrant für AI-Workflows
- **Separate Ports für bessere Stabilität**:
  - nginx: Port 8080 (öffentlich)
  - n8n: Port 5680 (mapped von intern 5678)
  - qdrant: Port 6333 (für Vector DB)
- **Automatische Container-Orchestrierung**: Nginx wartet auf n8n
- **Persistent Storage**: n8n, Postgres und Qdrant Daten bleiben erhalten
- **Optimierte Nginx-Konfiguration**: Gzip, Caching, WebSocket Support

### 🎨 Design & UI
- **Neon-inspiriertes Design** mit leuchtenden Effekten
- **Dark/Light Mode Toggle** mit persistenter Speicherung
- **3D-Flip-Animation**: Smooth Übergang zwischen Landing Page und n8n
- **Responsive Design** für alle Bildschirmgrößen
- **Optimierte Asset-Auslieferung** durch Nginx
- **Animierter GIF-Hintergrund**: Dynamischer visueller Effekt mit dunklem Overlay für bessere Lesbarkeit

### 🔌 Netzwerk-Topologie Editor (NEU!)
- **Interaktiver Netzwerk-Editor** mit Drag & Drop
- **Konva.js Canvas** für leistungsstarke Visualisierung
- **4 vordefinierte Gerätetypen**: PC 💻, Server 🖥️, Switch 🔀, Router 📡
- **Echtzeit-Verbindungen** zwischen Geräten (Shift+Klick)
- **Individuelle Beschriftung** per Doppelklick
- **PNG Export** für Dokumentation
- **Neon-Design** passend zur Landing Page
- **Responsive & Touch-optimiert**

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Landing Page (iframe nutzt /n8n/)
├── feature.html            # Netzwerk-Topologie Editor (NEU!)
├── README.md               # Diese Dokumentation
├── assets/                 # Statische Assets
│   ├── css/style.css       # Styling inkl. 3D-Flip & Themes
│   └── js/script.js        # JavaScript für Flip & Theme Toggle
└── backend/                # Docker Infrastructure
    ├── docker-compose.yml  # Container-Orchestrierung (nginx, n8n, postgres, qdrant)
    └── nginx.conf          # Nginx Reverse Proxy Config (Port 8080 → n8n:5678)
```

## 🚀 Quick Start mit Docker Desktop

### Voraussetzungen
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installiert und gestartet

### Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/flowgrammer420/landingpage-n8n.git
   cd landingpage-n8n
   ```

2. **Docker Services starten**:
   ```bash
   cd backend
   docker compose up -d
   ```

3. **Landing Page öffnen**:
   ```
   http://localhost:8080
   ```

4. **n8n direkt aufrufen**:
   ```
   http://localhost:8080/n8n/
   ```

### 📊 Service Status
- 🌐 **Landing Page**: http://localhost:8080
- 🔧 **n8n Interface**: http://localhost:8080/n8n/
- 🔌 **Netzwerk-Editor**: http://localhost:8080/feature.html
- 📊 **Qdrant Dashboard**: http://localhost:6333/dashboard

## 🎬 Animierter GIF-Hintergrund anpassen

Beide HTML-Dateien (index.html und feature.html) verwenden ein animiertes GIF als Hintergrund für einen dynamischen visuellen Effekt.

### GIF-URL ändern

**In index.html:**
1. Öffne `index.html` in einem Editor
2. Suche nach der CSS-Regel `body::before`
3. Ändere die `background-image` URL:
   ```css
   background-image: url('DEINE_NEUE_GIF_URL_HIER');
   ```

**In feature.html:**
1. Öffne `feature.html` in einem Editor
2. Suche nach der CSS-Regel `body::before`
3. Ändere die `background-image` URL:
   ```css
   background-image: url('DEINE_NEUE_GIF_URL_HIER');
   ```

### GIF-Quellen
- **Giphy**: Kopiere die direkte GIF-URL (endet auf .gif)
- **Tenor**: Verwende die direkte Medien-URL
- **Eigene Dateien**: Lege das GIF in den `assets/` Ordner und verwende einen relativen Pfad

### Overlay-Einstellungen anpassen
Um die Lesbarkeit zu verbessern, wird ein dunkles Overlay über das GIF gelegt:

```css
/* Overlay-Transparenz ändern (0.0 = transparent, 1.0 = vollständig undurchsichtig) */
body::after {
    background: rgba(0, 0, 0, 0.7); /* 70% Dunkelheit */
}
```

### GIF-Darstellung anpassen

```css
body::before {
    background-size: cover;     /* Vollständige Abdeckung */
    background-size: contain;   /* Vollständiges GIF sichtbar */
    background-size: 50%;       /* Feste Größe */
    
    background-position: center;     /* Zentriert */
    background-position: top left;   /* Links oben */
    
    background-repeat: no-repeat;    /* Nicht wiederholen */
    background-repeat: repeat;       /* Kacheln */
}
```

## 🐳 Docker Commands

### Container verwalten
```bash
# Stoppen
docker compose down

# Neustarten
docker compose restart

# Logs anzeigen
docker compose logs -f

# Status prüfen
docker compose ps
```

### Troubleshooting

#### Port bereits belegt
```bash
# Prüfe welcher Prozess Port 8080 nutzt
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Ändere Port in docker-compose.yml
ports:
  - "8081:80"  # Nutze Port 8081 statt 8080
```

#### Container Logs prüfen
```bash
# Alle Services
docker compose logs -f
# Nur nginx
docker compose logs -f nginx
# Nur n8n
docker compose logs -f n8n
```

### Container neu starten
```bash
docker compose restart
```

### Container neu bauen
```bash
docker compose up -d --force-recreate
```

### Status prüfen
```bash
docker compose ps
```

## 🎯 n8n AI Starter Kit Setup

Nach dem ersten Start:
1. Öffne http://localhost:8080 und klicke auf "Open n8n"
2. Erstelle einen Admin-Account in n8n
3. Gehe zu **Settings** → **Community Nodes**
4. Installiere AI-relevante Nodes (optional):
   - `@n8n/n8n-nodes-langchain`
   - Vector Store Nodes
5. Konfiguriere Qdrant in deinen Workflows:
   - Host: `qdrant`
   - Port: `6333`
   - No Authentication (intern)

## 📦 Production Deployment

⚠️ **Wichtig**: Dieses Setup ist für lokale Entwicklung optimiert!

Für Production:
1. **Ändere alle Passwörter** in `docker-compose.yml`:
   ```yaml
   POSTGRES_PASSWORD=STRONG_PASSWORD_HERE
   ```
2. **Aktiviere HTTPS** (z.B. mit Caddy oder Let's Encrypt)
3. **Setze N8N_BASIC_AUTH**:
   ```yaml
   - N8N_BASIC_AUTH_ACTIVE=true
   - N8N_BASIC_AUTH_USER=admin
   - N8N_BASIC_AUTH_PASSWORD=SECURE_PASSWORD
   ```
4. **Nutze externe Datenbank** statt lokaler Postgres
5. **Backup-Strategie** für Docker Volumes

## 🤝 Contributing

Issues und Pull Requests sind willkommen!

## 📄 Lizenz

MIT License - siehe Details im Repository

## 🙏 Credits

- [n8n.io](https://n8n.io) - Workflow Automation
- [Nginx](https://nginx.org) - Reverse Proxy
- [Docker](https://docker.com) - Containerization
- [Qdrant](https://qdrant.tech) - Vector Database für AI
- [Konva.js](https://konvajs.org) - Canvas-Bibliothek für Netzwerk-Editor
- [Giphy](https://giphy.com) - GIF-Hintergrund Quelle

---
**Viel Erfolg mit deinem n8n AI Starter Kit! 🚀**
