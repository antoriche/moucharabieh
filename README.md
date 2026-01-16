# L'Atelier du Moucharabieh - Site Marketing

Site web marketing moderne pour L'Atelier du Moucharabieh, présentant l'art traditionnel du Mashrabiya à travers une expérience de scrollytelling immersive.

## Caractéristiques

- **Scrollytelling Immersif** : Une expérience de défilement où le contenu et la vidéo progressent ensemble
- **Design Mobile-First** : Optimisé pour tous les appareils, des smartphones aux grands écrans
- **Vue.js 3** : Framework moderne et performant avec Composition API
- **CSS Avancé** : Animations fluides, backdrop filters, et transitions optimisées
- **Contenu Français** : Entièrement en français pour le marché belge/francophone
- **Performance Optimisée** : Chargement lazy, throttling des événements scroll, et animations GPU-accélérées

## Structure du Projet

```
moucharabieh/
├── public/
│   └── assets/
│       └── video.mp4          # Vidéo de fond
├── src/
│   ├── components/
│   │   └── ScrollytellingView.vue  # Composant principal de scrollytelling
│   ├── App.vue                # Composant racine
│   ├── main.js                # Point d'entrée de l'application
│   └── style.css              # Styles globaux et variables CSS
├── index.html                 # Template HTML
├── vite.config.js             # Configuration Vite
└── package.json               # Dépendances
```

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## Développement

Le projet utilise Vite pour un développement rapide avec Hot Module Replacement (HMR).

### Personnalisation du Contenu

Pour modifier le contenu des sections, éditez le tableau `sections` dans `/src/components/ScrollytellingView.vue`:

```javascript
const sections = [
  {
    title: "Votre Titre",
    paragraphs: [
      "Votre premier paragraphe",
      "Votre deuxième paragraphe"
    ]
  },
  // Ajoutez d'autres sections...
]
```

### Personnalisation des Styles

Les variables CSS sont définies dans `/src/style.css`:

- **Couleurs** : Variables `--color-*` inspirées des tons du bois traditionnel
- **Espacement** : Variables `--spacing-*` pour un design cohérent
- **Typographie** : Variables `--font-*` avec police serif élégante
- **Animations** : Variables `--transition-*` pour des transitions fluides

### Optimisations Mobile

Le design utilise une approche mobile-first avec des breakpoints:
- Mobile: < 768px
- Tablette: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: ≥ 1440px

## Fonctionnalités Techniques

### Synchronisation Vidéo-Scroll

La vidéo progresse en fonction du défilement de la page grâce à l'API HTML5 Video et `requestAnimationFrame` pour des performances optimales.

### Animations de Sections

Les sections apparaissent et disparaissent avec des transitions fluides basées sur leur position dans le viewport. L'effet utilise:
- Opacity fade
- Transform scale et translateY
- Backdrop filter pour l'effet de verre dépoli

### Accessibilité

- Support de `prefers-reduced-motion` pour les utilisateurs sensibles aux animations
- Sémantique HTML appropriée
- Contraste de couleurs optimisé
- Navigation au clavier possible

## Performance

- Throttling des événements scroll avec `requestAnimationFrame`
- Chargement optimisé de la vidéo avec `preload="auto"`
- Transformations CSS GPU-accélérées
- Pas de dépendances lourdes

## Déploiement

Le site peut être déployé sur n'importe quelle plateforme d'hébergement statique:

- **Netlify**: Drag & drop du dossier `dist/`
- **Vercel**: Connexion du repo GitHub
- **GitHub Pages**: Utiliser GitHub Actions
- **Serveur classique**: Upload du contenu de `dist/` après `npm run build`

## Support Navigateurs

- Chrome/Edge: ✅ (dernier + 2 versions précédentes)
- Firefox: ✅ (dernier + 2 versions précédentes)  
- Safari: ✅ (dernier + 2 versions précédentes)
- Mobile Safari: ✅
- Chrome Mobile: ✅

## Licence

Projet propriétaire - L'Atelier du Moucharabieh © 2026

## Contact

Pour toute question concernant le site web, veuillez contacter l'équipe de développement.
