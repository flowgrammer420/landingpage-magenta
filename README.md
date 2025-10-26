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
- Git installiert
- Mindestens 4GB RAM für alle Container

### Step-by-Step Anleitung

#### 1. Repository klonen
```bash
git clone https://github.com/flowgrammer420/landingpage-n8n.git
cd landingpage-n8n
```

#### 2. Docker Compose starten
```bash
cd backend
docker compose up -d
```

#### 3. Zugriff
- **Landing Page**: http://localhost:8080
- **Netzwerk Editor**: http://localhost:8080/feature.html
- **n8n Admin**: Klicke auf "Admin Bereich" oder navigiere direkt zu http://localhost:8080/n8n/

#### 4. Container stoppen
```bash
docker compose down
```

## 🔌 Netzwerk-Topologie Editor - Bedienung

Der interaktive Netzwerk-Editor ist über die Navigation erreichbar: **🔌 Netzwerk Editor**

### Grundfunktionen
1. **Gerät hinzufügen**: Klicke auf ein Gerät in der Palette (links)
   - 💻 PC (türkis)
   - 🖥️ Server (neongrün)
   - 🔀 Switch (gelb)
   - 📡 Router (magenta)

2. **Geräte verschieben**: Ziehe Geräte mit der Maus auf der Arbeitsfläche

3. **Geräte verbinden**:
   - Klicke auf das erste Gerät mit **gedrückter Shift-Taste**
   - Das Gerät wird rot markiert
   - Klicke auf das zweite Gerät (ebenfalls mit Shift)
   - Eine animierte Verbindungslinie erscheint

4. **Gerät beschriften**: Doppelklicke auf ein Gerät und gib einen Namen ein

5. **Als PNG exportieren**: Klicke auf "Als PNG exportieren" in der oberen Leiste
   - Die Datei `netzwerk-topologie.png` wird heruntergeladen

6. **Zurücksetzen**: Klicke auf "Leeren" um alle Geräte zu entfernen

### Beispiel-Topologie

Beim Start wird automatisch eine Beispiel-Netzwerktopologie geladen:

```
        [Router]
         /    \
    [Switch]  [Switch]
      /  |        |
   [PC][PC]  [Server]
```

### Screenshots

![Netzwerk-Topologie Editor](https://via.placeholder.com/800x450/0f0f1e/39ff14?text=Netzwerk-Topologie+Editor)

*Hinweis: Screenshot-Pfad kann später mit echtem Bild ersetzt werden*

## 🔧 Docker Management

### Services neustarten
```bash
cd backend
docker compose restart
```

### Logs anzeigen
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

---

**Viel Erfolg mit deinem n8n AI Starter Kit! 🚀**
