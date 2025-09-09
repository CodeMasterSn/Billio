# Favicons Billio

Ce dossier contient les favicons de l'application Billio.

## Structure recommandée

```
favicons/
├── favicon.ico              # Favicon classique (16x16, 32x32)
├── favicon-16x16.png        # Favicon 16x16px
├── favicon-32x32.png        # Favicon 32x32px
├── favicon-96x96.png        # Favicon 96x96px
├── favicon-192x192.png      # Favicon Android
├── favicon-512x512.png      # Favicon Android
├── apple-touch-icon.png     # Icône Apple (180x180px)
├── android-chrome-192x192.png  # Chrome Android
├── android-chrome-512x512.png  # Chrome Android
├── manifest.json            # Manifest PWA
└── README.md               # Ce fichier
```

## Formats et tailles

### Favicons standards
- **favicon.ico** : 16x16, 32x32px (format ICO)
- **favicon-16x16.png** : 16x16px
- **favicon-32x32.png** : 32x32px
- **favicon-96x96.png** : 96x96px

### Favicons mobiles
- **favicon-192x192.png** : Android, Chrome
- **favicon-512x512.png** : Android, Chrome
- **apple-touch-icon.png** : iOS Safari (180x180px)

## Utilisation dans Next.js

### Dans `pages/_document.js`
```jsx
<Head>
  <link rel="icon" href="/favicons/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
  <link rel="manifest" href="/favicons/manifest.json" />
</Head>
```

### Dans `public/manifest.json`
```json
{
  "name": "Billio",
  "short_name": "Billio",
  "icons": [
    {
      "src": "/favicons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## Outils recommandés

- **Génération** : [Favicon.io](https://favicon.io/)
- **Test** : [RealFaviconGenerator](https://realfavicongenerator.net/)
- **Optimisation** : [TinyPNG](https://tinypng.com/)

## Notes

- Utiliser des couleurs contrastées pour la visibilité
- Tester sur différents navigateurs et appareils
- Garder la cohérence avec le logo principal
- Optimiser les fichiers pour réduire la taille

