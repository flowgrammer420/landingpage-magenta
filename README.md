# 🌟 n8n Landingpage mit AI Starter Kit - Docker Edition

Eine vollständig containerisierte n8n Landing Page mit Docker Compose, Nginx Reverse Proxy, n8n AI Starter Kit Support und 3D-Flip-Funktion!

## ✨ Features

### 🧭 Navigation (NEU!)

- **Konsistentes Navigationsmenü** auf allen Seiten
- **Drei Hauptmenüpunkte**:
  - **Home**: Führt zur Landing Page (index.html)
  - **🔌 Netzwerk Editor**: Öffnet den interaktiven Netzwerk-Topologie Editor (feature.html)
  - **Admin Bereich**: Öffnet n8n in neuem Tab (target="_blank" auf /n8n/)
- **Responsive Navigation**: Passt sich automatisch an Bildschirmgröße an
  - Desktop: Horizontale Menüleiste
  - Tablet/Mobile: Vertikales Menü mit voller Breite
- **Neon-Design**: Passend zum Gesamtdesign mit #39ff14 Farbe und Glow-Effekten
- **Echte Seitenverlinkung**: Keine Hash-Links mehr, saubere Navigation zwischen Seiten

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
- **Konva.js Canvas** für leistungsstarke Visualisierung
- **4 vordefinierte Gerätetypen**: PC 💻, Server 🖥️, Switch 🔀, Router 📡
- **Echtzeit-Verbindungen** zwischen Geräten per einfachem Linksklick (kein Shift nötig)
- **Individuelle Beschriftung** per Doppelklick
- **PNG Export** für Dokumentation
- **Neon-Design** passend zur Landing Page (Verbindungen in #39ff14 mit Glow)
- **Responsive & Touch-optimiert**

## 📁 Projektstruktur

```
landingpage-n8n/
│
├── index.html              # Landing Page mit Navigation
├── feature.html            # Netzwerk-Topologie Editor mit Navigation
├── README.md               # Diese Dokumentation
├── assets/                 # Statische Assets
│   ├── nav.html            # Modulare Navigation (NEU!)
│   ├── css/style.css       # Styling inkl. 3D-Flip & Themes
│   └── js/script.js        # JavaScript für Flip & Theme Toggle
└── backend/                # Docker Infrastructure
    ├── docker-compose.yml  # Container-Orchestrierung (nginx, n8n, postgres, qdrant)
    └── nginx/nginx.conf    # Nginx Reverse Proxy Konfiguration
```

## 🔄 Modulare Navigation - Pflege & Wartung

### Konzept

Die Navigation ist jetzt **modular** aufgebaut. Das bedeutet:
- Das HTML-Menü ist nur einmal in `assets/nav.html` definiert
- Alle Seiten laden dieses Menü **dynamisch per JavaScript**
- Änderungen am Menü müssen nur an **einer Stelle** vorgenommen werden

### Implementierung

In `index.html` und `feature.html` befindet sich direkt am Anfang von `<body>`:

```html
<body>
  <!-- Navigation Placeholder -->
  <div id="nav-placeholder"></div>
  <script>
    fetch('assets/nav.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
      });
  </script>
  
  <!-- Restlicher Seiteninhalt -->
```

### Navigation bearbeiten

Um das Menü zu ändern, editiere **nur** die Datei `assets/nav.html`:

```html
<nav id="main-navigation">
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="https://n8n.flowgrammer420.de" target="_blank">Netzwerk Editor</a></li>
    <li><a href="/admin" target="_blank">Admin Bereich</a></li>
  </ul>
</nav>
```

#### Neue Menüpunkte hinzufügen

Füge einfach weitere `<li><a>`-Elemente in die `<ul>` ein:

```html
<nav id="main-navigation">
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="feature.html">🔌 Netzwerk Editor</a></li>
    <li><a href="/n8n/" target="_blank">Admin Bereich</a></li>
    <!-- Neuer Menüpunkt -->
    <li><a href="docs.html">📚 Dokumentation</a></li>
  </ul>
</nav>
```

#### Externe Links

Für externe Links oder Links, die in neuem Tab öffnen sollen, verwende `target="_blank"`:

```html
<li><a href="https://docs.n8n.io" target="_blank">n8n Docs</a></li>
```

### Styling der Navigation

Das Styling wird über die `<style>`-Tags in `index.html` und `feature.html` gesteuert:

- **Responsive Design**: Automatische Anpassung für Mobile/Tablet/Desktop
- **Neon-Effekte**: Farbe #39ff14 mit Glow-Schatten
- **Hover-Effekte**: Grüner Hintergrund beim Überfahren

Änderungen am Styling sollten in beiden Dateien synchron gehalten werden.

### Vorteile der modularen Navigation

✅ **Zentrale Pflege**: Menü nur an einer Stelle ändern  
✅ **Konsistenz**: Alle Seiten haben identisches Menü  
✅ **Einfache Erweiterung**: Neue Seiten binden Navigation automatisch ein  
✅ **Wartbarkeit**: Kein Copy-Paste zwischen Seiten nötig  

### Neue Seiten hinzufügen

Wenn du eine neue Seite erstellst, füge einfach diese Zeilen am Anfang von `<body>` ein:

```html
<body>
  <!-- Navigation Placeholder -->
  <div id="nav-placeholder"></div>
  <script>
    fetch('assets/nav.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
      });
  </script>
  
  <!-- Dein Seiteninhalt -->
```

Damit ist die Navigation automatisch verfügbar!

## 🚀 Schnellstart

1. **Repository klonen**:
   ```bash
   git clone https://github.com/flowgrammer420/landingpage-n8n.git
   cd landingpage-n8n
   ```

2. **Docker Container starten**:
   ```bash
   cd backend
   docker compose up -d
   ```

3. **Fertig! Öffne im Browser**:
   - Landing Page: http://localhost:8080
   - Netzwerk Editor: http://localhost:8080/feature.html
   - n8n direkt: http://localhost:8080/n8n/

## 🧭 Navigation & Bedienung

### Hauptnavigation

Das Navigationsmenü ist auf allen Seiten (index.html und feature.html) verfügbar:

1. **Home** - Kehrt zur Startseite zurück
2. **🔌 Netzwerk Editor** - Wechselt zum interaktiven Netzwerk-Topologie Editor
3. **Admin Bereich** - Öffnet n8n in einem neuen Browser-Tab

### Landing Page (index.html)

- **Theme Toggle**: Wechsel zwischen Dark und Light Mode (oben rechts)
- **Kontaktformular**: Sende Anfragen direkt von der Landing Page
- Über das Navigationsmenü erreichbar: Netzwerk Editor und n8n Admin Bereich

### Netzwerk-Topologie Editor (feature.html)

- **Geräte hinzufügen**: Klicke auf Router, Switch, PC oder Server Buttons
- **Verbindungen erstellen**: Klicke nacheinander auf zwei Geräte (einfacher Linksklick)
- **Geräte verschieben**: Drag & Drop auf der Canvas
- **Export**: Klicke auf "Exportieren" um PNG zu speichern
- **Leeren**: "Leeren" Button entfernt alle Geräte und Verbindungen
- Navigation zum Home oder Admin Bereich über das Menü

### n8n Admin Bereich

- Öffnet sich in neuem Tab über das Navigationsmenü
- Vollständiger Zugriff auf n8n Workflow-Editor
- Läuft unter `/n8n/` via Nginx Reverse Proxy

## 🔧 Konfiguration

### Ports anpassen

In `backend/docker-compose.yml`:

```yaml
nginx:
  ports:
    - "8080:80"  # Ändere 8080 auf deinen Wunsch-Port
```

### n8n Umgebungsvariablen

In `backend/docker-compose.yml` unter `n8n` Service:

```yaml
N8N_HOST: localhost
N8N_PORT: 5678
N8N_PROTOCOL: http
WEBHOOK_URL: http://localhost:8080/
```

## 📝 Weitere Dokumentation

- [n8n Dokumentation](https://docs.n8n.io/)
- [Docker Compose Dokumentation](https://docs.docker.com/compose/)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle ein Issue oder Pull Request.

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details

---

**Viel Spaß mit deiner n8n Landing Page! 🚀**
