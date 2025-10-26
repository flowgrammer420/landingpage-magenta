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
### 🔌 Netzwerk-Topologie Editor (NEU!)
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
