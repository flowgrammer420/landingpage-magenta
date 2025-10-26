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

### 🔌 Netzwerk-Topologie Editor
- **Interaktiver Netzwerk-Editor** mit Drag & Drop
- **Cytoscape.js** für leistungsstarke Visualisierung
- **Echtzeit-Verbindungen** zwischen Nodes per einfachem Linksklick
- **Neon-Design** passend zur Landing Page (Verbindungen in #39ff14 mit Glow)
- **Responsive & Touch-optimiert**
- **JSON Export/Import** für Topologie-Speicherung

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Landing Page
├── feature.html            # Netzwerk-Topologie Editor  
├── README.md               # Diese Dokumentation
│
├── assets/
│   ├── css/
│   │   └── style.css       # Hauptstyles
│   └── js/
│       └── script.js       # Hauptskript (Contact Form, Theme Toggle)
│
└── backend/
    ├── docker-compose.yml  # Vollständige Container-Orchestrierung
    └── nginx.conf          # Reverse Proxy Konfiguration
```

## 🚀 Installation & Start

### Voraussetzungen
- Docker & Docker Compose installiert
- Port 8080, 5680 und 6333 verfügbar

### Schnellstart

```bash
# Repository klonen
git clone <repo-url>
cd landingpage-n8n/backend

# Container starten
docker compose up -d

# Logs anschauen (optional)
docker compose logs -f
```

### Zugriff

- **Landing Page**: http://localhost:8080
- **n8n**: http://localhost:8080/n8n/ (oder direkt http://localhost:5680)
- **Qdrant Dashboard**: http://localhost:6333/dashboard

## 🔧 Konfiguration

### Umgebungsvariablen (docker-compose.yml)

Wichtige n8n Variablen:
```yaml
N8N_HOST: localhost
N8N_PORT: 5678
N8N_PATH: /n8n/
WEBHOOK_URL: http://localhost:8080/n8n/
N8N_EDITOR_BASE_URL: http://localhost:8080/n8n/
```

### Nginx Konfiguration

- **Root**: `/usr/share/nginx/html` (Volume: `../:/usr/share/nginx/html:ro`)
- **n8n Proxy**: `/n8n/` → `http://n8n:5678`
- **Gzip**: Aktiviert für bessere Performance
- **WebSocket**: Unterstützung für n8n Live-Updates

## 📊 Container-Übersicht

| Container | Port(s) | Beschreibung |
|-----------|---------|-------------|
| nginx | 8080 | Reverse Proxy & Statische Dateien |
| n8n | 5680 | Workflow Automation |
| postgres | 5432 | Datenbank für n8n |
| qdrant | 6333 | Vector Database für AI |

## 🛠️ Entwicklung

### Lokale Änderungen testen

Da das Root-Verzeichnis als Volume gemountet ist, werden Änderungen sofort wirksam:

```bash
# HTML/CSS/JS bearbeiten
vim index.html

# Browser neu laden - Änderungen sind sofort sichtbar!
```

### Container neu starten

```bash
cd backend
docker compose restart
```

### Container stoppen

```bash
cd backend
docker compose down

# Mit Volumen löschen (ACHTUNG: Alle Daten gehen verloren!)
docker compose down -v
```

## 🎯 n8n AI Starter Kit

Dieses Setup ist vollständig kompatibel mit dem [n8n AI Starter Kit](https://github.com/n8n-io/n8n-ai-starter-kit):

- ✅ Postgres als Datenbank
- ✅ Qdrant für Vector Embeddings
- ✅ Optimierte Umgebungsvariablen

### AI Workflow Beispiel

1. n8n öffnen: http://localhost:8080/n8n/
2. Neuen Workflow erstellen
3. Qdrant Node hinzufügen
   - Host: `qdrant`
   - Port: `6333`
4. AI Agent Node mit deinem LLM konfigurieren

## 📝 Wichtige Hinweise

### Production Deployment

Für Produktion solltest du:

1. **Sichere Passwörter** in `docker-compose.yml` setzen
2. **HTTPS** mit Let's Encrypt einrichten
3. **N8N_HOST** auf deine Domain ändern
4. **WEBHOOK_URL** und **N8N_EDITOR_BASE_URL** entsprechend anpassen

### Troubleshooting

**Problem**: n8n lädt nicht
- Überprüfe ob alle Container laufen: `docker compose ps`
- Checke n8n Logs: `docker compose logs n8n`
- Stelle sicher dass Port 5680 nicht belegt ist

**Problem**: Reverse Proxy Fehler
- Nginx Logs prüfen: `docker compose logs nginx`
- Stelle sicher dass n8n vor nginx startet (depends_on in docker-compose.yml)

**Problem**: Qdrant verbindet nicht
- Checke ob Container läuft: `docker compose ps qdrant`
- Prüfe Port 6333: `curl http://localhost:6333`

## 🤝 Contributing

Pull Requests sind willkommen! Für größere Änderungen bitte zuerst ein Issue erstellen.

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details

## 🙏 Credits

- [n8n](https://n8n.io/) - Workflow Automation
- [Qdrant](https://qdrant.tech/) - Vector Database
- [Nginx](https://nginx.org/) - Reverse Proxy
- [Cytoscape.js](https://js.cytoscape.org/) - Network Topology Visualization

---

**Made with ❤️ and ⚡ by the n8n Community**
