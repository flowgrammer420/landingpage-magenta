ntwprten # 🌟 n8n Landingpage - Docker Desktop Edition

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
2. **n8n Container** startet intern auf Port 5678
3. **Nginx** liefert statische Dateien aus und proxied `/n8n/` zu n8n
4. **Landing Page** lädt mit funktionierendem iframe zu `/n8n/`

## 🔧 Container-Details

### Nginx Container
- **Image**: `nginx:alpine`
- **Port**: `8080:80`
- **Volumes**: 
  - Landing Page Dateien (`index.html`, `assets/`)
  - Nginx Konfiguration

### n8n Container
- **Image**: `n8nio/n8n:latest`
- **Umgebungsvariablen**:
  - `N8N_PATH=/n8n/` - Läuft unter Subpath
  - `WEBHOOK_URL=http://localhost:8080/n8n/`
- **Persistent Volume**: `n8n-data` für Workflow-Daten

## 📋 Wichtige Docker Desktop Befehle

### Container-Status prüfen
```bash
docker compose ps
```

### Logs anzeigen
```bash
# Alle Container
docker compose logs -f

# Nur n8n
docker compose logs -f n8n

# Nur Nginx
docker compose logs -f nginx
```

### Container stoppen
```bash
docker compose down
```

### Container stoppen + Volumes löschen (⚠️ Löscht n8n Daten!)
```bash
docker compose down -v
```

### Container neustarten
```bash
docker compose restart
```

### Images updaten
```bash
docker compose pull
docker compose up -d
```

## 🔧 Konfiguration anpassen

### Port ändern
In `backend/docker-compose.yml`:
```yaml
services:
  nginx:
    ports:
      - "3000:80"  # Ändere 8080 zu gewünschtem Port
```

### n8n Konfiguration
In `backend/docker-compose.yml` unter `n8n.environment`:
```yaml
environment:
  - N8N_HOST=localhost
  - N8N_BASIC_AUTH_ACTIVE=true  # Basis-Authentifizierung aktivieren
  - N8N_BASIC_AUTH_USER=admin
  - N8N_BASIC_AUTH_PASSWORD=password
```

## 🐛 Troubleshooting

### Landing Page lädt nicht
1. **Docker Desktop läuft?**
   ```bash
   docker --version
   ```

2. **Container Status prüfen**
   ```bash
   docker compose ps
   ```

3. **Port bereits belegt?**
   - Port in `docker-compose.yml` ändern
   - Oder anderen Service auf Port 8080 stoppen

### n8n iframe zeigt Fehler
1. **n8n Container läuft?**
   ```bash
   docker compose logs n8n
   ```

2. **Nginx Proxy Konfiguration prüfen**
   ```bash
   docker compose logs nginx
   ```

3. **Browser Cache leeren**: Strg+Shift+R

### Assets laden nicht
1. **Nginx Volumes prüfen**
   ```bash
   docker compose config
   ```

2. **File Permissions** (Linux/Mac):
   ```bash
   chmod -R 755 assets/
   ```

### Performance optimieren
1. **Docker Desktop Ressourcen erhöhen**
   - Settings > Resources > Advanced
   - RAM: minimum 4GB empfohlen
   - CPU: 2+ Cores

## 🔄 Development Workflow

### Änderungen an statischen Dateien
```bash
# Nach Änderungen an index.html oder assets/:
docker compose restart nginx
```

### Nginx Konfiguration ändern
```bash
# Nach Änderungen an nginx.conf:
docker compose restart nginx
```

### n8n Konfiguration ändern
```bash
# Nach Änderungen an docker-compose.yml (n8n section):
docker compose up -d n8n
```

## 🚨 Docker Desktop für Windows-Nutzer

### WSL2 Backend nutzen
- Docker Desktop > Settings > General > "Use WSL 2 based engine"
- Bessere Performance als Hyper-V

### File Watching Issues
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

Jetzt einfach `docker compose up -d` ausführen und loslegen!prte
