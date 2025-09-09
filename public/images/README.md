# 📁 Organisation des Images - Projet Billio

## 🗂️ Structure des Dossiers

```
public/
├── images/
│   ├── hero/           # Images de la section hero
│   ├── features/       # Images des fonctionnalités
│   ├── testimonials/   # Avatars et photos des témoignages
│   ├── demo/          # Images de démonstration produit
│   └── icons/         # Icônes et logos
```

## 📸 Types d'Images par Dossier

### 🎯 `/images/hero/`
- **Image principale** : `hero-image.jpg` (1820x1024px)
- **Format** : JPG, PNG, WebP
- **Usage** : Section hero de la landing page
- **Animation** : Rotation préservée

### ⭐ `/images/features/`
- **Icônes de fonctionnalités** : `feature-1.svg`, `feature-2.svg`, etc.
- **Format** : SVG recommandé pour les icônes
- **Usage** : Points forts de l'application

### 👥 `/images/testimonials/`
- **Avatars clients** : `avatar-1.jpg`, `avatar-2.jpg`, etc.
- **Format** : JPG, PNG (carré 200x200px)
- **Usage** : Témoignages clients

### 🖥️ `/images/demo/`
- **Screenshots** : `dashboard.png`, `invoice-example.png`
- **Format** : PNG pour les captures d'écran
- **Usage** : Section démo produit

### 🎨 `/images/icons/`
- **Logo Billio** : `logo.svg`
- **Icônes diverses** : `check.svg`, `arrow.svg`, etc.
- **Format** : SVG pour la scalabilité

## 🔧 Utilisation dans le Code

### Import Next.js Image
```javascript
import Image from 'next/image'

<Image
  src="/images/hero/hero-image.jpg"
  alt="Description de l'image"
  width={400}
  height={300}
  className="object-cover rounded-lg"
/>
```

### Chemins Recommandés
- Hero : `/images/hero/hero-image.jpg`
- Features : `/images/features/feature-1.svg`
- Testimonials : `/images/testimonials/avatar-1.jpg`
- Demo : `/images/demo/dashboard.png`
- Icons : `/images/icons/logo.svg`

## 📐 Spécifications Techniques

### Formats Recommandés
- **Photos** : JPG (qualité 85-90%)
- **Icônes** : SVG
- **Screenshots** : PNG
- **Logos** : SVG ou PNG transparent

### Tailles Optimisées
- **Hero** : 1820x1024px (16:9)
- **Avatars** : 200x200px (carré)
- **Features** : 64x64px (SVG scalable)
- **Demo** : 800x600px (4:3)

### Performance
- **Compression** : Optimisez avant upload
- **Lazy loading** : Automatique avec Next.js Image
- **WebP** : Format moderne recommandé

## 🚀 Déploiement

Toutes les images dans `/public/images/` seront automatiquement disponibles sur :
- **Développement** : `http://localhost:3000/images/...`
- **Production** : `https://votre-domaine.com/images/...`

## 📝 Notes Importantes

1. **Nommage** : Utilisez des noms descriptifs et cohérents
2. **Alt text** : Toujours inclure pour l'accessibilité
3. **Responsive** : Testez sur mobile et desktop
4. **SEO** : Optimisez les noms de fichiers
5. **Cache** : Les images sont mises en cache automatiquement


