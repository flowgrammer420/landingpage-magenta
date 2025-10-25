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

### n8n Port-Konfiguration (Oktober 2025)

Die folgenden Änderungen wurden vorgenommen, um Connection-Lost-Probleme zu beheben:

#### 1. docker-compose.yml
- n8n Service läuft jetzt mit **`ports: - "8080:8080"`**
- Umgebungsvariable **`N8N_PORT=8080`** ist gesetzt (geändert von 5678)

```yaml
services:
  n8n:
    ports:
      - "8080:8080"          # NEU: Port 8080 wird exponiert
    environment:
      - N8N_PORT=8080        # Geändert von 5678 zu 8080
```

#### 2. nginx.conf
- Proxy-Pass angepasst: **`proxy_pass http://n8n:8080/;`** (vorher: 5678)

```nginx
location /n8n/ {
    proxy_pass http://n8n:8080/;  # Geändert von 5678 zu 8080
    # ... weitere Proxy-Einstellungen
}
```

### ⚠️ WICHTIG: Neustart nach Konfigurationsänderungen erforderlich!

Nach dem Aktualisieren der Konfigurationsdateien (docker-compose.yml oder nginx.conf) muss ein **kompletter Neustart** durchgeführt werden:

```bash
cd backend
docker compose down
docker compose up -d
```

**Warum `docker compose down` und nicht nur `restart`?**
- `down` entfernt die Container komplett und erstellt sie neu
- Dadurch werden alle Konfigurationsänderungen garantiert übernommen
- Port-Änderungen und Volume-Mappings werden korrekt angewendet

**Alternative für Docker Desktop Nutzer:**
1. Docker Desktop öffnen
2. Container stoppen und löschen
3. `docker compose up -d` im Terminal ausführen

## 🔧 Verwaltung der Container

### Container starten
```bash
cd backend
docker compose up -d
```

### Container stoppen
```bash
docker compose stop
```

### Container neu starten (bei kleineren Änderungen)
```bash
docker compose restart
```

### Container komplett neu aufbauen (bei Konfigurationsänderungen)
```bash
docker compose down
docker compose up -d
```

### Logs anzeigen
```bash
# Alle Container
docker compose logs

# Nur n8n
docker compose logs n8n

# Nur Nginx
docker compose logs nginx

# Live-Logs verfolgen
docker compose logs -f
```

### Status prüfen
```bash
docker compose ps
```

## 🐛 Troubleshooting

### n8n lädt nicht / Connection Lost

1. Container-Status prüfen: `docker compose ps`
2. Prüfe nginx logs: `docker compose logs nginx`
3. Prüfe n8n logs: `docker compose logs n8n`
4. Teste direkten Zugriff: `curl http://localhost:8080/n8n/`
5. **Falls Port-Konfiguration geändert wurde: Vollständigen Neustart durchführen!**
   ```bash
   docker compose down && docker compose up -d
   ```

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
