# 🌟 n8n Landingpage mit AI Starter Kit - Docker Edition
Eine vollständig containerisierte n8n Landing Page mit Docker Compose, Nginx Reverse Proxy, n8n AI Starter Kit Support und spektakulärer 3D-Flip-Animation!

## ✨ Features

### 🎨 3D Flip-Box Animation (Highlight!)
- **Interaktive 3D-Animation**: Klick auf "Admin Bereich" dreht die gesamte Seite um 180° (CSS 3D Transform)
- **Embedded n8n iframe**: Auf der Rückseite wird das n8n Admin-Interface direkt eingebettet angezeigt
- **Nahtlose Integration**: Kein Seitenwechsel, keine neue URL - alles auf einer Seite
- **Zurück-Button**: "← Zurück zur Landing Page" flippt die Seite wieder zurück zur Vorderseite
- **Smooth Transitions**: 0.8s CSS-Animationen mit `transform-style: preserve-3d`
- **Optimiert für Performance**: Hardware-beschleunigte Transformationen

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
- **Dark/Light Mode Toggle** mit persistenter Speicherung
- **3D-Flip-Animation**: Kernfeature für nahtlosen Übergang zum n8n Interface
- **Responsive Design** für alle Bildschirmgrößen
- **Optimierte Asset-Auslieferung** durch Nginx
- **Animierter GIF-Hintergrund**: Dynamischer visueller Effekt mit dunklem Overlay für bessere Lesbarkeit

### 🔌 Netzwerk-Topologie Editor
- **Interaktiver Netzwerk-Editor** mit Drag & Drop (feature.html)
- **Cytoscape.js** für leistungsstarke Visualisierung
- **Echtzeit-Verbindungen** zwischen Nodes per einfachem Linksklick
- **Neon-Design** passend zur Landing Page (Verbindungen in #39ff14 mit Glow)
- **Responsive & Touch-optimiert**
- **JSON Export/Import** für Topologie-Speicherung

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Landing Page mit 3D Flip-Box
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
git clone https://github.com/flowgrammer420/landingpage-n8n.git
cd landingpage-n8n/backend

# Docker Container starten
docker compose up -d

# Warten bis alle Services bereit sind (ca. 30 Sekunden)
docker compose logs -f n8n
```

### Zugriff

1. **Landing Page**: http://localhost:8080/
   - Klicke auf "Admin Bereich" im Menü → Die Seite flippt um
   - Auf der Rückseite siehst du das eingebettete n8n Interface
   - Klicke "← Zurück zur Landing Page" → Die Seite flippt zurück

2. **Direkt n8n**: http://localhost:8080/n8n/ (falls du die Flip-Animation überspringen möchtest)

3. **Qdrant Dashboard**: http://localhost:6333/dashboard

4. **Netzwerk-Topologie Editor**: http://localhost:8080/feature.html

### Container verwalten

```bash
# Status prüfen
docker compose ps

# Logs ansehen
docker compose logs -f

# Stoppen
docker compose stop

# Neustarten
docker compose restart

# Komplett entfernen
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

1. n8n öffnen: Klick auf "Admin Bereich" für 3D-Flip oder direkt http://localhost:8080/n8n/
2. Neuen Workflow erstellen
3. Qdrant Node hinzufügen
   - Host: `qdrant`
   - Port: `6333`
4. AI Agent Node mit deinem LLM konfigurieren

## 🎨 3D Flip-Box Technische Details

Die 3D-Flip-Animation nutzt moderne CSS3-Features:

```css
.flip-container {
    perspective: 1000px;  /* 3D-Perspektive */
}

.flipper {
    transition: transform 0.8s;
    transform-style: preserve-3d;  /* Kinder in 3D rendern */
}

.flip-container.flipped .flipper {
    transform: rotateY(180deg);  /* Um Y-Achse drehen */
}

.front, .back {
    backface-visibility: hidden;  /* Rückseite unsichtbar */
}

.back {
    transform: rotateY(180deg);  /* Rückseite vorgedreht */
}
```

### iframe Integration

Das n8n Interface wird direkt eingebettet:

```html
<iframe src="http://localhost:5678/" 
        allow="clipboard-read; clipboard-write" 
        title="n8n Workflow Automation">
</iframe>
```

**Wichtig**: Der iframe nutzt `http://localhost:5678/` (interner n8n Port), da der Browser vom gleichen Host aus zugreift.

## 📝 Wichtige Hinweise

### iframe URL Konfiguration

Die iframe URL in `index.html` zeigt standardmäßig auf `http://localhost:5678/`:

- **Lokale Entwicklung**: `http://localhost:5678/` funktioniert perfekt
- **Production mit Domain**: Ändere zu `https://yourdomain.com/n8n/`
- **Docker interne Kommunikation**: Nginx nutzt `http://n8n:5678` (siehe nginx.conf)

### Production Deployment

Für Produktion solltest du:

1. **Sichere Passwörter** in `docker-compose.yml` setzen
2. **HTTPS** mit Let's Encrypt einrichten
3. **N8N_HOST** auf deine Domain ändern
4. **WEBHOOK_URL** und **N8N_EDITOR_BASE_URL** entsprechend anpassen
5. **iframe src** in index.html auf `https://yourdomain.com/n8n/` ändern

### Troubleshooting

**Problem**: n8n lädt nicht im iframe
- Überprüfe ob alle Container laufen: `docker compose ps`
- Checke n8n Logs: `docker compose logs n8n`
- Stelle sicher dass Port 5680 nicht belegt ist
- Prüfe Browser Console auf CORS/CSP Fehler

**Problem**: Flip-Animation funktioniert nicht
- Öffne Browser DevTools und checke Console auf JavaScript-Fehler
- Stelle sicher dass das `#flipContainer` Element existiert
- Prüfe ob die CSS-Klasse `flipped` korrekt hinzugefügt wird

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
