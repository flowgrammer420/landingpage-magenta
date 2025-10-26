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
  - ollama: Port 11434 (lokaler LLM-Server)
- **Automatische Container-Orchestrierung**: Nginx wartet auf n8n
- **Persistent Storage**: n8n, Postgres, Qdrant und Ollama Daten bleiben erhalten
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

---

## 🧩 Neu: Lokales LLM mit Ollama integriert
Die docker-compose.yml wurde erweitert um:
- Service `ollama` (Port 11434, persistentes Volume `ollama_storage`)
- Init-Service `ollama-pull-llama` (zieht automatisch `llama3.1` beim Start)
- Zusätzliche Volumes: `n8n_storage`, `postgres_storage`, `qdrant_storage`, `ollama_storage`
- Netzwerk `demo` für alle Services
- n8n erhält `OLLAMA_HOST=ollama:11434`

### Starten
```bash
docker compose -f backend/docker-compose.yml up -d
```

### Verfügbare Dienste
- Landingpage: http://localhost:8080/
- n8n Editor: http://localhost:8080/n8n/
- Qdrant API: http://localhost:6333/
- Ollama API: http://localhost:11434/

### Datenpersistenz
- n8n: Volume `n8n_storage`
- Postgres: Volume `postgres_storage`
- Qdrant: Volume `qdrant_storage`
- Ollama: Volume `ollama_storage` (Modelldateien)

### Health/Kompatibilität
- Bestehende Komponenten bleiben erhalten: nginx, n8n, Postgres, Qdrant, Netzwerkeditor
- Alle Services sind im Netzwerk `demo` verbunden

### n8n + Ollama: Schnelleinstieg
- In n8n kann über die Ollama-Nodes bzw. den LLM Agent der Host `ollama:11434` verwendet werden (internes Docker-Netzwerk).
- Für HTTP Requests (falls kein Ollama-Node verwendet wird):
  - Methode: POST
  - URL: `http://ollama:11434/api/generate`
  - Body (JSON): `{ "model": "llama3.1", "prompt": "Hello" }`
  - Header: `Content-Type: application/json`

Tipp: Falls das Modell noch nicht vorhanden ist, wartet n8n automatisch bis `ollama-pull-llama` das Modell geladen hat. Alternativ manuell laden:
```bash
docker compose -f backend/docker-compose.yml run --rm ollama ollama pull llama3.1
```

### Häufige Probleme
- Portkonflikte: Passe Ports in `backend/docker-compose.yml` an.
- Proxy/Firewall: Stelle sicher, dass `http://localhost:11434` erreichbar ist, falls du außerhalb von Docker testen möchtest.
- Modellgröße: `ollama_storage` benötigt ausreichend Speicherplatz.

---

## Entwicklung
- Änderungen an `index.html`/`feature.html` werden sofort von nginx serviert
- Compose-Datei liegt unter `backend/docker-compose.yml`

## Lizenz
MIT
