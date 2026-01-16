# Guide de Démarrage Rapide

## Installation et Lancement (5 minutes)

### 1. Vérifier les prérequis
```bash
node --version  # v18.x ou v19.x requis
npm --version   # v8.x ou v9.x requis
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

### 4. Build pour la production
```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## Personnalisation Rapide

### Modifier le contenu

Ouvrez `src/components/ScrollytellingView.vue` et modifiez l'array `sections`:

```javascript
const sections = [
  {
    title: "Votre Titre",
    paragraphs: [
      "Votre texte ici"
    ]
  }
]
```

### Changer les couleurs

Ouvrez `src/style.css` et modifiez les variables CSS:

```css
:root {
  --color-primary: #8B4513;    /* Couleur principale */
  --color-secondary: #D2691E;  /* Couleur secondaire */
}
```

### Remplacer la vidéo

Placez votre vidéo dans `public/assets/video.mp4` (format MP4, H.264)

## Structure des Fichiers

```
moucharabieh/
├── src/
│   ├── components/
│   │   └── ScrollytellingView.vue  ← Composant principal
│   ├── App.vue                      ← Application racine
│   ├── main.js                      ← Point d'entrée
│   └── style.css                    ← Styles globaux
├── public/
│   └── assets/
│       └── video.mp4                ← Votre vidéo
└── index.html                       ← Template HTML
```

## Fonctionnalités Clés

1. **Scrollytelling** : La vidéo progresse avec le défilement
2. **Mobile-First** : Optimisé pour tous les appareils
3. **Animations** : Fade in/out fluide des sections
4. **Performance** : Throttling du scroll, animations GPU

## Problèmes Courants

### La vidéo ne se charge pas
- Vérifiez que `public/assets/video.mp4` existe
- Vérifiez le format (MP4 H.264 recommandé)

### Les animations sont saccadées
- Compressez la vidéo pour réduire sa taille
- Augmentez le threshold de mise à jour dans ScrollytellingView.vue

### Le serveur ne démarre pas
- Vérifiez votre version de Node.js (18.x ou 19.x)
- Supprimez `node_modules/` et relancez `npm install`

## Support

Pour plus de détails, consultez:
- `README.md` - Documentation complète
- `CONFIGURATION.md` - Guide de configuration avancée

## Déploiement

### Netlify
```bash
npm run build
# Déposez le dossier dist/ sur netlify.com
```

### Autre hébergeur
```bash
npm run build
# Uploadez le contenu de dist/ sur votre serveur
```
