# DABO LOGISTIQUES - Application de Facturation

Application web statique pour la génération de factures professionnelles pour DABO LOGISTIQUES.

## 🚀 Fonctionnalités

- **Formulaire de facturation** complet avec saisie des informations client et expédition
- **Génération PDF côté client** sans serveur
- **Logo personnalisable** pour l'entreprise
- **Calculs automatiques** des totaux et sous-totaux
- **Conversion en lettres** des montants
- **Impression directe** depuis le navigateur
- **Interface responsive** et moderne
- **Application 100% statique** - fonctionne sans serveur

## 🛠️ Technologies

- **Next.js 15** (App Router)
- **React 18**
- **Tailwind CSS**
- **jsPDF** (génération PDF côté client)
- **html2canvas** (conversion HTML vers PDF)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation locale
```bash
# Cloner le projet
git clone <repository-url>
cd samatransit

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Build pour production

```bash
# Générer le build statique
npm run build

# Le dossier `out` contient l'application statique
```

## 🌐 Déploiement sur Netlify

### Méthode 1 : Déploiement automatique depuis GitHub

1. **Connectez votre repository GitHub à Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Choisissez GitHub et sélectionnez votre repository

2. **Configuration du build**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`

3. **Variables d'environnement** (optionnel)
   - Aucune variable d'environnement requise (application statique)

4. **Déployer**
   - Cliquez sur "Deploy site"
   - Netlify va automatiquement construire et déployer votre application

### Méthode 2 : Déploiement manuel

1. **Générer le build localement**
   ```bash
   npm run build
   ```

2. **Uploader le dossier `out`**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git" → "Deploy manually"
   - Glissez-déposez le dossier `out` dans la zone de drop

### Configuration Netlify

Le fichier `netlify.toml` est déjà configuré avec :
- Commande de build : `npm run build`
- Dossier de publication : `out`
- Redirections pour le SPA
- Version Node.js : 18

## 📱 Utilisation

### Création d'une facture

1. **Accédez à la page de création** de facture
2. **Remplissez les informations** :
   - Informations client
   - Détails de l'expédition
   - Débours (optionnel)
   - Interventions taxables (optionnel)
3. **Personnalisez le logo** (optionnel)
4. **Générez le PDF** avec les boutons :
   - **Télécharger PDF** : télécharge la facture
   - **Imprimer PDF** : lance l'impression

### Fonctionnalités avancées

- **Numérotation automatique** des factures
- **Calculs en temps réel** des totaux
- **Conversion automatique** des montants en lettres
- **Prévisualisation en temps réel** de la facture

## 🔧 Structure du projet

```
samatransit/
├── src/
│   ├── app/
│   │   ├── create-invoice/
│   │   │   ├── components/
│   │   │   │   ├── InvoiceForm.js
│   │   │   │   └── InvoicePreview.js
│   │   │   └── page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── utils/
│       └── pdfGenerator.js
├── netlify.toml
├── next.config.js
├── package.json
└── README.md
```

## 🎨 Personnalisation

### Logo de l'entreprise
- Cliquez sur "Changer le logo" dans la section Logo
- Sélectionnez une image (format recommandé : PNG, JPG)
- Le logo sera automatiquement redimensionné et affiché

### Informations légales
Les informations de DABO LOGISTIQUES sont pré-remplies et peuvent être modifiées dans le code source :
- Nom de l'entreprise
- Adresse et contact
- NINEA et RC

## 🚨 Résolution de problèmes

### Erreur de build
```bash
# Nettoyer le cache
rm -rf .next out node_modules
npm install
npm run build
```

### Problème de génération PDF
- Vérifiez que le navigateur supporte jsPDF
- Assurez-vous que les images du logo sont accessibles
- Vérifiez la console pour les erreurs JavaScript

### Problème d'impression
- Utilisez un navigateur moderne (Chrome, Firefox, Safari)
- Vérifiez les paramètres d'impression du navigateur
- Désactivez les en-têtes/pieds de page dans les options d'impression

## 📄 Licence

Ce projet est développé pour DABO LOGISTIQUES. Tous droits réservés.

## 🤝 Support

Pour toute question ou problème :
- Email : dabotrans@gmail.com
- Téléphone : +221 77 437 65 21

---

**DABO LOGISTIQUES** - Transport, Maritime, Fret Aérien, Conseils
*Zone Fret Aéroport International Blaise Diagne*
