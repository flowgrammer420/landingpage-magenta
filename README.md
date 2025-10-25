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

### Port-Konfiguration Update (November 2025)

**Wichtige Änderung zur Netzwerksicherheit:**

Die Port-Konfiguration wurde optimiert, um nur notwendige Ports nach außen zu exponieren:

#### Was wurde geändert?

- **n8n Service**: Der externe Port-Mapping `ports: - "8080:8080"` wurde entfernt
- **Nur nginx** exponiert jetzt Port 8080 nach außen (`ports: - "8080:80"`)
- **n8n** ist nur noch intern über das Docker-Netzwerk erreichbar (via `n8n:8080`)
- **nginx.conf**: `proxy_pass http://n8n:8080` bleibt unverändert

#### Warum diese Änderung?

✅ **Bessere Sicherheit**: n8n ist nicht direkt von außen erreichbar  
✅ **Saubere Architektur**: Nur der Reverse Proxy exponiert Ports  
✅ **Keine Funktionseinschränkung**: Alle Features funktionieren weiterhin über `/n8n/`

#### Nach dem Update

**Wichtig**: Nach einem `git pull` müssen die Container neu gestartet werden:

```bash
cd backend
docker compose down
docker compose up -d
```

---

### n8n Port-Konfiguration (Oktober 2025) - Archiviert

<details>
<summary>Frühere Konfiguration (nur zur Referenz)</summary>

Die folgenden Änderungen wurden vorgenommen, um Connection-Lost-Probleme zu beheben:

#### 1. docker-compose.yml

- n8n Service läuft jetzt mit **`ports: - "8080:8080"`**

```yaml
n8n:
  image: n8nio/n8n:latest
  ports:
    - "8080:8080" # NEU: Port 8080 wird exponiert (entfernt in November 2025)
  environment:
    - N8N_PORT=8080 # NEU: Angepasst auf 8080
    ...
```

#### 2. nginx.conf

- Proxy-Pass zeigt auf `http://n8n:8080` (Docker-interner Hostname)

```nginx
location /n8n/ {
    proxy_pass http://n8n:8080/; # Verwendet Docker Service Name
    ...
}
```

#### 3. index.html

- iframe src zeigt auf `/n8n/` (relativer Pfad über Nginx-Proxy)

```html
<iframe src="/n8n/" ...></iframe>
```

**Diese Konfiguration wurde in November 2025 überarbeitet (siehe oben).**

</details>

---

## 🔧 Konfiguration & Anpassung

### Umgebungsvariablen ändern

Bearbeite `backend/docker-compose.yml` für n8n-Einstellungen:

```yaml
environment:
  - N8N_BASIC_AUTH_ACTIVE=true
  - N8N_BASIC_AUTH_USER=admin
  - N8N_BASIC_AUTH_PASSWORD=secure_password
```

### Theme anpassen

Bearbeite `assets/css/style.css` für Farbschemas:

```css
:root {
  --neon-blue: #00f3ff;
  --neon-pink: #ff006e;
  /* Weitere Farben anpassen */
}
```

## 🐛 Troubleshooting

### Problem: Container startet nicht

```bash
# Logs überprüfen
docker compose logs -f

# Container neu bauen
docker compose down
docker compose up -d --build
```

### Problem: n8n nicht erreichbar

1. **Prüfe Container-Status**:
   ```bash
   docker compose ps
   ```
2. **Prüfe n8n Logs**:
   ```bash
   docker compose logs n8n
   ```
3. **Prüfe Nginx Logs**:
   ```bash
   docker compose logs nginx
   ```

### Problem: Port 8080 bereits belegt

Bearbeite `backend/docker-compose.yml`:

```yaml
nginx:
  ports:
    - "3000:80" # Ändere 8080 auf einen freien Port
```

### Problem: Disk Space Issues

```bash
# Nicht verwendete Docker-Ressourcen aufräumen
docker system prune -a

# Logs limitieren
```

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
