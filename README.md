# 🌟 n8n Landingpage - Docker Desktop Edition

Eine vollständig containerisierte n8n Landing Page mit Docker Compose, Nginx Reverse Proxy und 3D-Flip-Funktion!

## ✨ Features

### 🐳 Docker Integration
- **Ein-Befehl-Deployment**: `docker compose up -d` startet alles
- **Nginx Reverse Proxy**: Statische Landing Page und n8n hinter `/n8n/`
- **Automatische Container-Orchestrierung**: Nginx wartet auf n8n
- **Persistent Storage**: n8n Daten bleiben bei Container-Neustarts erhalten
- **Optimierte Nginx-Konfiguration**: Gzip, Caching und Proxy-Settings

### 🎨 Design & UI
- **Neon-inspiriertes Design** mit leuchtenden Effekten
- **Dark/Light Mode Toggle** mit persistenter Speicherung
- **3D-Flip-Animation**: Smooth Übergang zwischen Landing Page und n8n
- **Responsive Design** für alle Bildschirmgrößen
- **Optimierte Asset-Auslieferung** durch Nginx

## 📁 Projektstruktur
```
landingpage-n8n/
│
├── index.html              # Landing Page (iframe nutzt /n8n/)
├── README.md               # Diese Dokumentation
├── assets/                 # Statische Assets
│   ├── css/style.css       # Styling inkl. 3D-Flip & Themes
│   └── js/script.js        # JavaScript für Flip & Theme Toggle
└── backend/                # Docker Infrastructure
    ├── docker-compose.yml  # Container-Orchestrierung
    └── nginx.conf          # Nginx Reverse Proxy Config
```

## 🚀 Quick Start mit Docker Desktop

### Voraussetzungen
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installiert und gestartet
- Git installiert

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

#### 3. Im Browser öffnen
Öffne: http://localhost:8080

**Das war's! 🎉**

### Was passiert im Hintergrund?
1. **Nginx Container** startet auf Port 8080
2. **n8n Container** startet intern auf Port 8080 (wurde von 5678 angepasst)
3. **Nginx** liefert statische Dateien aus und proxied `/n8n/` zu n8n
4. **Landing Page** lädt mit funktionierendem iframe zu `/n8n/`

## ⚙️ Aktuelle Konfigurationsänderungen

### n8n Umgebungsvariablen (Oktober 2025)

Die folgenden Umgebungsvariablen wurden in `backend/docker-compose.yml` angepasst:

```yaml
environment:
  - N8N_HOST=localhost
  - N8N_PORT=8080                                    # Geändert von 5678 zu 8080
  - N8N_PROTOCOL=http
  - WEBHOOK_URL=http://localhost:8080/n8n/
  - VUE_APP_URL_BASE_API=http://localhost:8080/n8n/ # Neu hinzugefügt
  - N8N_PATH=/n8n/
  - N8N_EDITOR_BASE_URL=http://localhost:8080/n8n/
```

**Wichtige Änderungen:**
- `N8N_PORT` wurde von `5678` auf `8080` geändert
- `VUE_APP_URL_BASE_API` wurde hinzugefügt für bessere API-Integration
- `N8N_HOST` bleibt `localhost`
- Alle anderen Konfigurationen (nginx.conf, etc.) bleiben unverändert

### ⚠️ Neustart nach Updates erforderlich

Nach einem `git pull` oder Konfigurationsänderungen **MUSS** das System neu gestartet werden:

```bash
cd backend
docker compose down
docker compose up -d
```

Oder für ein komplettes Rebuild:

```bash
docker compose down
docker compose pull
docker compose up -d --force-recreate
```

**Hinweis:** Ein einfacher `docker compose restart` reicht NICHT aus, da Umgebungsvariablen nur beim Container-Start geladen werden!

## 🔧 Container-Details

### Nginx Container
- **Image**: `nginx:alpine`
- **Port**: `8080:80`
- **Volumes**: 
  - Landing Page Dateien (`index.html`, `assets/`)
  - Nginx Konfiguration (`nginx.conf`)

### n8n Container
- **Image**: `n8nio/n8n:latest`
- **Interner Port**: `8080`
- **Volume**: `n8n-data` für persistente Workflows
- **Network**: `landingpage-network` (shared mit nginx)

## 📋 Nützliche Docker Compose Befehle

### Container Management
```bash
# Alle Container starten
docker compose up -d

# Container stoppen
docker compose down

# Container neu starten (ohne Umgebungsvariablen-Neuladung)
docker compose restart

# Container neu erstellen (mit Umgebungsvariablen-Neuladung)
docker compose down && docker compose up -d

# Logs anzeigen
docker compose logs -f

# Logs nur von n8n
docker compose logs -f n8n

# Container Status
docker compose ps
```

### Volumes & Daten
```bash
# Volumes anzeigen
docker volume ls

# n8n Volume inspizieren
docker volume inspect backend_n8n-data

# Container mit allen Volumes löschen
docker compose down -v
```

### Updates & Wartung
```bash
# Images aktualisieren
docker compose pull

# Mit neuen Images neu starten
docker compose up -d --force-recreate

# Nicht verwendete Images aufräumen
docker image prune
```

## 🐛 Troubleshooting

### Container startet nicht
```bash
# Logs prüfen
docker compose logs

# Container Status
docker compose ps

# Komplett neu aufbauen
docker compose down -v
docker compose up -d
```

### n8n nicht erreichbar
1. Prüfe ob Container läuft: `docker compose ps`
2. Prüfe nginx logs: `docker compose logs nginx`
3. Prüfe n8n logs: `docker compose logs n8n`
4. Teste direkten Zugriff: `curl http://localhost:8080/n8n/`

### Windows-spezifische Probleme
```bash
# In WSL2 Terminal, falls Änderungen nicht erkannt werden:
echo "export DOCKER_BUILDKIT=1" >> ~/.bashrc
source ~/.bashrc
```

### Port Konflikte
```bash
# Alle verwendeten Ports anzeigen:
netstat -an | findstr :8080
```

## 📊 Monitoring & Logs

### Docker Desktop Dashboard nutzen
1. Docker Desktop öffnen
2. Containers > landingpage-n8n
3. Logs und Stats in Echtzeit anzeigen

### Erweiterte Log-Konfiguration
In `docker-compose.yml` hinzufügen:
```yaml
services:
  nginx:
    logging:
      options:
        max-size: "10m"
        max-file: "3"
```

## 🎯 Best Practices

1. **Regelmäßige Updates**
   ```bash
   docker compose pull
   docker compose up -d
   ```

2. **Backup der n8n Daten**
   ```bash
   docker run --rm -v landingpage-n8n_n8n-data:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz -C /data .
   ```

3. **Restore n8n Daten**
   ```bash
   docker run --rm -v landingpage-n8n_n8n-data:/data -v $(pwd):/backup alpine tar xzf /backup/n8n-backup.tar.gz -C /data
   ```

## 🌐 Produktions-Deployment

Für Produktionsumgebungen:
```yaml
# SSL/TLS mit Traefik oder nginx-proxy
# Umgebungsvariablen für Secrets
# Resource Limits setzen
# Health Checks aktivieren
```

## 🤝 Beitragen

1. Fork das Repository
2. Feature Branch erstellen
3. Änderungen testen mit Docker Compose
4. Pull Request öffnen

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

---

**Mit Docker Desktop wird's einfach! 🐳✨**

Jetzt einfach `docker compose up -d` ausführen und loslegen!
