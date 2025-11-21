# DroneVision - Landing Page

Une landing page moderne et interactive pour DroneVision, la plateforme d'inspection d'infrastructures par drones autonomes et intelligence artificielle.

## 🚀 Technologies

- **Vite** - Build tool rapide et moderne
- **React 18** - Bibliothèque UI
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides et performantes
- **Lucide React** - Icônes SVG modernes

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Build

Créer une version de production optimisée :

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`

## 👀 Prévisualisation

Prévisualiser la version de production en local :

```bash
npm run preview
```

## 🌐 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandée)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre dépôt Git (GitHub, GitLab, ou Bitbucket)
4. Vercel détectera automatiquement Vite
5. Cliquez sur "Deploy"

### Méthode 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

### Configuration Vercel

Aucune configuration spéciale n'est nécessaire. Vercel détecte automatiquement :
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 📁 Structure du Projet

```
dronevision-site/
├── public/              # Assets statiques
├── src/
│   ├── App.jsx         # Composant principal avec toutes les sections
│   ├── main.jsx        # Point d'entrée React
│   └── index.css       # Styles Tailwind
├── index.html          # Template HTML
├── package.json        # Dépendances
├── tailwind.config.js  # Configuration Tailwind
├── postcss.config.js   # Configuration PostCSS
└── vite.config.js      # Configuration Vite
```

## ✨ Fonctionnalités

- ✅ Design moderne avec animations Framer Motion
- ✅ Sections interactives (Dashboard, Télémétrie en temps réel)
- ✅ Navigation responsive avec menu mobile
- ✅ Animations au scroll optimisées
- ✅ Marquee de partenaires infinie
- ✅ Compteurs animés (CountUp)
- ✅ Thème sombre professionnel
- ✅ Optimisé pour la performance

## 📱 Responsive

Le site est entièrement responsive et optimisé pour :
- 📱 Mobile (320px+)
- 📲 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🎨 Personnalisation

### Modifier les couleurs

Les couleurs principales sont définies via les classes Tailwind dans `src/App.jsx` :
- `cyan-500` : Couleur primaire
- `slate-950` : Fond principal
- `slate-900` : Sections alternées

### Modifier le contenu

Toutes les données sont dans les constantes au début de `src/App.jsx` :
- `BRAND` : Nom et tagline
- `PARTNERS` : Liste des partenaires
- `METRICS` : Métriques clés
- `INDUSTRIES` : Secteurs d'activité

## 📄 License

© 2024 DroneVision Systems Inc. Tous droits réservés.

## 🤝 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Développé avec ❤️ par l'équipe DroneVision**
