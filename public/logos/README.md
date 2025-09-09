# Logos Billio

Ce dossier contient les logos de l'application Billio.

## Structure recommandée

```
logos/
├── billio-logo.svg          # Logo principal (format vectoriel)
├── billio-logo.png          # Logo principal (format bitmap)
├── billio-logo-white.svg    # Logo blanc (pour fonds sombres)
├── billio-logo-white.png    # Logo blanc (pour fonds sombres)
├── billio-icon.svg          # Icône simplifiée
├── billio-icon.png          # Icône simplifiée
└── README.md               # Ce fichier
```

## Formats supportés

- **SVG** : Recommandé pour les logos (scalable, léger)
- **PNG** : Pour les cas où SVG n'est pas supporté
- **JPG** : Éviter pour les logos (perte de qualité)

## Tailles recommandées

- **Logo principal** : 200x60px minimum
- **Icône** : 32x32px, 64x64px, 128x128px
- **Favicon** : Voir dossier `../favicons/`

## Utilisation

```jsx
// Dans les composants React
import Logo from '/logos/billio-logo.svg'

<img src="/logos/billio-logo.svg" alt="Billio" />
```

## Notes

- Garder la cohérence des couleurs avec la charte graphique
- Tester sur différents fonds (clair/sombre)
- Optimiser les fichiers pour le web

