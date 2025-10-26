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

#### 3. Warten bis alle Container ready sind (ca. 30-60 Sekunden)
```bash
docker compose logs -f
# Warte auf: "Editor is now accessible via: http://localhost:5678/"
# Strg+C zum Beenden der Logs
```

#### 4. Im Browser öffnen
Öffne: http://localhost:8080

**Das war's! 🎉**

### Was passiert im Hintergrund?

1. **Nginx Container** startet auf Port 8080 (öffentlich)
2. **n8n Container** startet intern auf Port 5678 (mapped zu Host-Port 5680)
3. **Postgres Container** startet intern (nur für n8n erreichbar)
4. **Qdrant Container** startet auf Port 6333 für AI Vector Storage
5. Alle Container sind im `demo` Netzwerk verbunden
6. Nginx proxied `/n8n/` → `http://n8n:5678/` (intern)

## 🔧 Konfiguration

### Port-Übersicht

| Service | Interner Port | Host Port | Zugriff |
|---------|---------------|-----------|----------|
| nginx   | 80            | 8080      | http://localhost:8080 (Landing Page) |
| n8n     | 5678          | 5680      | http://localhost:8080/n8n/ (via nginx) oder http://localhost:5680 (direkt) |
| postgres| 5432          | -         | Nur intern (n8n DB) |
| qdrant  | 6333          | 6333      | http://localhost:6333 (Vector DB API) |

### n8n Umgebungsvariablen

Die wichtigsten Variablen in `docker-compose.yml`:

```yaml
- N8N_PORT=5678          # Interner n8n Port
- N8N_PATH=/n8n/         # URL-Pfad für Nginx Proxy
- N8N_EDITOR_BASE_URL=http://localhost:8080/n8n/
- WEBHOOK_URL=http://localhost:8080/n8n/
```

### Nginx Proxy Konfiguration

In `nginx.conf`:

```nginx
location /n8n/ {
    proxy_pass http://n8n:5678/;  # Interner Container-Name und Port
    proxy_http_version 1.1;
    
    # WebSocket Support (wichtig für AI Features!)
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    
    # Lange Timeouts für AI-Workflows
    proxy_read_timeout 600s;
    
    # Kein Buffering gegen Connection Lost
    proxy_buffering off;
}
```

## 🛠️ Troubleshooting

### Problem: "Connection Lost" in n8n

**Lösung 1**: Überprüfe, dass alle Container laufen
```bash
cd backend
docker compose ps
# Alle sollten "Up" Status haben
```

**Lösung 2**: Prüfe nginx Logs
```bash
docker logs landingpage-nginx
```

**Lösung 3**: Prüfe n8n Logs
```bash
docker logs landingpage-n8n-ai
```

**Lösung 4**: Restart aller Services
```bash
docker compose restart
```

### Problem: n8n lädt nicht / 502 Bad Gateway

**Ursache**: n8n ist noch nicht vollständig gestartet

**Lösung**: Warte 30-60 Sekunden und lade die Seite neu. Prüfe:
```bash
docker logs landingpage-n8n-ai
# Warte auf: "Editor is now accessible via: http://localhost:5678/"
```

### Problem: Ports bereits belegt

**Fehlermeldung**: `bind: address already in use`

**Lösung 1**: Ändere Port in `docker-compose.yml`
```yaml
services:
  nginx:
    ports:
      - "8081:80"  # Statt 8080
  n8n:
    ports:
      - "5681:5678"  # Statt 5680
```

**Lösung 2**: Finde und stoppe den blockierenden Prozess
```bash
# Windows
netstat -ano | findstr :8080

# Mac/Linux
lsof -i :8080
```

### Problem: n8n Daten gehen verloren

**Ursache**: Docker Volumes wurden gelöscht

**Prüfung**:
```bash
docker volume ls | grep landingpage
```

**Volumes wiederherstellen**: Einmal `docker compose up -d` ausführen

### Problem: AI-Features funktionieren nicht

**Lösung 1**: Prüfe Qdrant Status
```bash
docker logs landingpage-qdrant
curl http://localhost:6333/health
```

**Lösung 2**: Prüfe Postgres Verbindung
```bash
docker exec landingpage-postgres psql -U n8n -d n8n -c "SELECT 1;"
```

**Lösung 3**: Konfiguriere n8n für Postgres
In n8n UI → Settings → Database → Postgres Connection:
- Host: `postgres`
- Port: `5432`
- Database: `n8n`
- User: `n8n`
- Password: `n8n_password_change_me`

## 🔄 Häufige Befehle

### Container starten
```bash
cd backend
docker compose up -d
```

### Container stoppen
```bash
docker compose down
```

### Container stoppen + Volumes löschen (⚠️ Datenverlust!)
```bash
docker compose down -v
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

---

**Viel Erfolg mit deinem n8n AI Starter Kit! 🚀**
