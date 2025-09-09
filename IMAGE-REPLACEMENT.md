# 🖼️ Image Hero - Billio

## 📍 Image Actuelle
L'image hero utilisée est : `public/images/hero/banner-1.png`

## ✨ Animation Préservée
L'animation de rotation (`transform rotate-3 hover:rotate-0`) est active et fonctionne parfaitement avec l'image banner-1.png.

## 🔄 Comment Remplacer l'Image

### Option 1 : Remplacer par une Nouvelle Image
1. **Renommez votre nouvelle image** en `banner-1.png`
2. **Remplacez** le fichier existant dans `public/images/hero/`
3. **Aucun changement de code** nécessaire

### Option 2 : Utiliser un Autre Nom
1. **Placez votre image** dans `public/images/hero/`
2. **Mettez à jour** le code dans `src/app/page.js` :
   ```javascript
   src="/images/hero/votre-image.jpg"  // au lieu de banner-1.png
   ```

## 📐 Spécifications Recommandées
- **Format** : JPG, PNG, ou WebP
- **Dimensions** : 400x300 pixels (ou ratio 4:3)
- **Taille** : < 2MB pour de bonnes performances
- **Contenu** : Entrepreneur africain avec ordinateur et factures

## 🚀 Test
L'image banner-1.png s'affiche automatiquement avec l'animation de rotation existante.

## 📁 Organisation des Images
Le projet utilise une structure organisée :
- `public/images/hero/` - Images de la section hero (banner-1.png)
- `public/images/features/` - Icônes des fonctionnalités
- `public/images/testimonials/` - Avatars des témoignages
- `public/images/demo/` - Images de démonstration
- `public/images/icons/` - Icônes et logos

Voir `public/images/README.md` pour plus de détails.
