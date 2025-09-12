'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CentreAidePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFAQs, setFilteredFAQs] = useState([])
  const [openSection, setOpenSection] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)

  // Base de données FAQ complète
  const allFAQs = [
    // DÉMARRAGE
    {
      id: 'start-1',
      category: 'Démarrage',
      question: 'Comment créer ma première facture ?',
      answer: `C'est très simple ! Suivez ces étapes :
1. Cliquez sur 'Créer une facture' dans le menu principal
2. Remplissez les informations de votre entreprise (nom, adresse, téléphone)
3. Ajoutez les détails de votre client (nom, adresse, téléphone)
4. Listez vos produits ou services avec quantités et prix
5. Choisissez le mode de paiement (Wave, Orange Money, virement, espèces)
6. Ajoutez des notes si nécessaire
7. Cliquez sur 'Télécharger' pour récupérer votre facture PDF

Temps estimé : 2-3 minutes. Votre facture sera automatiquement sauvegardée dans votre historique.`
    },
    {
      id: 'start-2',
      category: 'Démarrage',
      question: 'Billio est-il vraiment gratuit ?',
      answer: `Oui, Billio propose un plan gratuit qui vous permet de :
• Créer jusqu'à 10 factures par mois
• Télécharger vos factures en PDF
• Imprimer directement vos factures
• Accéder à votre historique
• Utiliser toutes les fonctionnalités de base

Le plan gratuit est parfait pour débuter et tester notre solution. Pour plus de factures, découvrez nos plans payants sur la page Tarifs.`
    },
    {
      id: 'start-3',
      category: 'Démarrage',
      question: 'Ai-je besoin de créer un compte ?',
      answer: `Non, vous n'avez pas besoin de créer de compte ! Billio fonctionne directement dans votre navigateur. Vos factures sont sauvegardées localement sur votre appareil.

Avantages du fonctionnement sans compte :
• Démarrage immédiat
• Aucune donnée personnelle requise
• Confidentialité maximale
• Pas de risque de perte de données

Vos factures restent accessibles tant que vous utilisez le même navigateur.`
    },
    {
      id: 'start-4',
      category: 'Démarrage',
      question: 'Comment télécharger ma facture ?',
      answer: `Pour télécharger votre facture :
1. Une fois votre facture créée, cliquez sur le bouton 'Télécharger PDF'
2. Votre facture sera générée automatiquement
3. Le fichier PDF se téléchargera dans votre dossier de téléchargements
4. Vous pouvez également cliquer sur 'Imprimer' pour imprimer directement

Format : PDF professionnel avec votre logo et toutes vos informations. Compatible avec tous les appareils.`
    },

    // FONCTIONNALITÉS
    {
      id: 'features-1',
      category: 'Fonctionnalités',
      question: 'Comment ajouter mon logo d\'entreprise ?',
      answer: `Pour ajouter votre logo :
1. Dans la section 'Informations entreprise', cliquez sur 'Choisir un fichier'
2. Sélectionnez votre logo (formats acceptés : JPG, PNG, GIF)
3. Votre logo apparaîtra automatiquement sur la facture
4. Le logo sera redimensionné automatiquement pour s'adapter

Conseil : Utilisez un logo de bonne qualité (minimum 200x200 pixels) pour un rendu optimal.`
    },
    {
      id: 'features-2',
      category: 'Fonctionnalités',
      question: 'Puis-je modifier une facture créée ?',
      answer: `Oui, vous pouvez modifier vos factures :
1. Allez dans votre 'Historique'
2. Cliquez sur 'Voir la facture' pour la facture souhaitée
3. Modifiez les informations nécessaires
4. Téléchargez la nouvelle version

Note : Chaque modification crée une nouvelle version. L'historique conserve toutes les versions pour votre traçabilité.`
    },
    {
      id: 'features-3',
      category: 'Fonctionnalités',
      question: 'Comment accéder à mon historique ?',
      answer: `Votre historique est accessible :
1. Cliquez sur 'Historique' dans le menu principal
2. Vous verrez toutes vos factures créées
3. Utilisez la barre de recherche pour trouver une facture spécifique
4. Triez par date, client ou montant
5. Accédez aux actions : voir, télécharger, supprimer

L'historique est sauvegardé localement sur votre appareil.`
    },
    {
      id: 'features-4',
      category: 'Fonctionnalités',
      question: 'Quels modes de paiement puis-je indiquer ?',
      answer: `Billio supporte tous les modes de paiement populaires au Sénégal :
• Wave (recommandé)
• Orange Money
• Free Money
• Virement bancaire
• Espèces
• Chèque
• Autre (personnalisable)

Vous pouvez indiquer plusieurs modes de paiement sur une même facture.`
    },

    // PLANS ET TARIFICATION
    {
      id: 'pricing-1',
      category: 'Plans et tarification',
      question: 'Quelles sont les différences entre les plans ?',
      answer: `Plan Gratuit :
• 10 factures par mois
• Toutes les fonctionnalités de base
• Support communautaire

Plan Standard (10 000 FCFA/mois) :
• Factures illimitées
• Templates personnalisés
• Support prioritaire
• Export Excel

Plan Premium (25 000 FCFA/mois) :
• Tout du Standard
• Intégration comptabilité
• Rapports avancés
• Support dédié

Découvrez tous les détails sur notre page Tarifs.`
    },
    {
      id: 'pricing-2',
      category: 'Plans et tarification',
      question: 'Comment passer au plan payant ?',
      answer: `Pour passer au plan payant :
1. Rendez-vous sur la page 'Tarifs'
2. Choisissez votre plan (Standard ou Premium)
3. Cliquez sur 'Choisir ce plan'
4. Effectuez le paiement via Wave ou Orange Money
5. Votre compte sera activé immédiatement

Paiement sécurisé et instantané. Support disponible si besoin.`
    },
    {
      id: 'pricing-3',
      category: 'Plans et tarification',
      question: 'Puis-je annuler mon abonnement ?',
      answer: `Oui, vous pouvez annuler votre abonnement à tout moment :
1. Contactez-nous via le formulaire de contact
2. Indiquez votre demande d'annulation
3. Votre abonnement sera arrêté à la fin de la période payée
4. Vous retrouverez automatiquement le plan gratuit

Aucun frais d'annulation. Politique flexible et transparente.`
    },
    {
      id: 'pricing-4',
      category: 'Plans et tarification',
      question: 'Comment se fait le paiement via Wave ?',
      answer: `Paiement Wave simple et sécurisé :
1. Sélectionnez votre plan sur la page Tarifs
2. Cliquez sur 'Payer avec Wave'
3. Vous serez redirigé vers Wave
4. Confirmez le paiement avec votre code PIN
5. Retour automatique sur Billio avec activation immédiate

Paiement instantané et sécurisé. Recevez votre facture par email.`
    },

    // TECHNIQUE
    {
      id: 'tech-1',
      category: 'Technique',
      question: 'Billio fonctionne-t-il sur mobile ?',
      answer: `Oui, Billio est entièrement optimisé pour mobile :
• Interface responsive adaptée aux écrans tactiles
• Navigation intuitive sur smartphone et tablette
• Toutes les fonctionnalités disponibles sur mobile
• Compatible iOS et Android
• Optimisé pour les connexions lentes

Créez et gérez vos factures depuis n'importe où !`
    },
    {
      id: 'tech-2',
      category: 'Technique',
      question: 'Mes données sont-elles sécurisées ?',
      answer: `Oui, la sécurité de vos données est notre priorité :
• Données stockées localement sur votre appareil
• Aucune transmission vers nos serveurs
• Chiffrement des données sensibles
• Conformité RGPD
• Pas de collecte de données personnelles

Vos informations restent privées et sécurisées.`
    },
    {
      id: 'tech-3',
      category: 'Technique',
      question: 'Que faire si la page ne charge pas ?',
      answer: `Si la page ne charge pas :
1. Vérifiez votre connexion internet
2. Actualisez la page (F5 ou Ctrl+R)
3. Videz le cache de votre navigateur
4. Essayez un autre navigateur
5. Contactez-nous si le problème persiste

Billio fonctionne sur tous les navigateurs modernes (Chrome, Firefox, Safari, Edge).`
    },
    {
      id: 'tech-4',
      category: 'Technique',
      question: 'Comment imprimer ma facture ?',
      answer: `Pour imprimer votre facture :
1. Cliquez sur le bouton 'Imprimer' après création
2. Ou ouvrez le PDF téléchargé et imprimez
3. Ajustez les paramètres d'impression si nécessaire
4. Choisissez l'orientation (portrait recommandé)
5. Imprimez en noir et blanc ou couleur

Format optimisé pour impression A4 standard.`
    },

    // LÉGAL ET ENTREPRISE
    {
      id: 'legal-1',
      category: 'Légal et entreprise',
      question: 'Comment ajouter mon NINEA sur la facture ?',
      answer: `Pour ajouter votre NINEA :
1. Dans la section 'Informations entreprise'
2. Remplissez le champ 'NINEA' avec votre numéro
3. Le NINEA apparaîtra automatiquement sur la facture
4. Format : NINEA-XXXXXXXXX-X

Le NINEA est obligatoire pour les entreprises au Sénégal.`
    },
    {
      id: 'legal-2',
      category: 'Légal et entreprise',
      question: 'Billio est-il conforme à la réglementation sénégalaise ?',
      answer: `Oui, Billio respecte la réglementation sénégalaise :
• Format de facture conforme aux exigences fiscales
• Inclusion des mentions obligatoires (NINEA, TVA, etc.)
• Respect des normes comptables locales
• Compatible avec les logiciels de comptabilité sénégalais
• Conformité aux exigences de la Direction Générale des Impôts

Vos factures sont valides pour votre comptabilité.`
    },
    {
      id: 'legal-3',
      category: 'Légal et entreprise',
      question: 'Puis-je utiliser Billio pour mon entreprise ?',
      answer: `Absolument ! Billio est conçu pour :
• Freelances et indépendants
• Petites et moyennes entreprises
• Commerçants et artisans
• Prestataires de services
• Consultants

Fonctionnalités adaptées aux besoins professionnels :
• Factures numérotées automatiquement
• Gestion des clients
• Historique complet
• Export pour comptabilité`
    },
    {
      id: 'legal-4',
      category: 'Légal et entreprise',
      question: 'Comment obtenir une facture pour ma comptabilité ?',
      answer: `Pour vos besoins comptables :
1. Téléchargez vos factures en PDF depuis l'historique
2. Exportez vos données en Excel (plan payant)
3. Conservez vos factures dans vos dossiers comptables
4. Transmettez à votre comptable si nécessaire

Format compatible avec tous les logiciels comptables sénégalais.`
    }
  ]

  // Filtrage des FAQ en temps réel
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredFAQs(allFAQs)
    } else {
      const filtered = allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredFAQs(filtered)
    }
  }, [searchTerm])

  // Gestion des sections
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
    setOpenFAQ(null) // Fermer les FAQ ouvertes
  }

  // Gestion des FAQ individuelles
  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  // Grouper les FAQ par catégorie
  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {})

  // Schema.org pour SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Head>
        <title>Centre d'aide - FAQ Billio | Support facturation Sénégal</title>
        <meta name="description" content="Trouvez rapidement des réponses à vos questions sur Billio. Guide complet pour créer vos factures, gérer votre historique et utiliser nos fonctionnalités." />
        <meta name="keywords" content="aide billio, FAQ facturation, support client sénégal, questions factures" />
        <meta property="og:title" content="Centre d'aide Billio - Support et FAQ" />
        <meta property="og:description" content="Assistance complète pour utiliser Billio efficacement" />
        <meta property="og:url" content="https://billiosn.netlify.app/centre-aide" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Centre d'aide Billio
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation rapide par catégories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Catégories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {['Démarrage', 'Fonctionnalités', 'Plans et tarification', 'Technique', 'Légal et entreprise'].map((category) => (
                <button
                  key={category}
                  onClick={() => toggleSection(category)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    openSection === category
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-sm font-medium text-center">{category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ par catégories */}
          <div className="space-y-8">
            {Object.keys(groupedFAQs).map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                  <span className="text-gray-500 text-2xl font-bold">
                    {openSection === category ? '−' : '+'}
                  </span>
                </button>
                
                {openSection === category && (
                  <div className="border-t border-gray-200">
                    {groupedFAQs[category].map((faq) => (
                      <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-6 py-4 text-left flex justify-between items-start hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg font-medium text-gray-800 pr-4">{faq.question}</span>
                          <span className="text-gray-500 text-xl font-bold flex-shrink-0">
                            {openFAQ === faq.id ? '−' : '+'}
                          </span>
                        </button>
                        
                        {openFAQ === faq.id && (
                          <div className="px-6 pb-4">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message si aucune FAQ trouvée */}
          {searchTerm && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                Aucune question trouvée pour "{searchTerm}"
              </div>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Voir toutes les questions
              </button>
            </div>
          )}

          {/* Contact rapide */}
          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre question n'est pas listée ?
            </h2>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider. Contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Nous contacter
              </Link>
              <a
                href="mailto:billio.africa@gmail.com"
                className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                billio.africa@gmail.com
              </a>
            </div>
          </div>

          {/* Ressources utiles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ressources utiles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/create-invoice" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-2xl mb-3">📄</div>
                <h3 className="font-semibold text-gray-900 mb-2">Créer une facture</h3>
                <p className="text-gray-600 text-sm">Commencez à créer vos factures professionnelles</p>
              </Link>
              
              <Link href="/tarifs" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-2xl mb-3">💰</div>
                <h3 className="font-semibold text-gray-900 mb-2">Nos tarifs</h3>
                <p className="text-gray-600 text-sm">Découvrez nos plans adaptés à vos besoins</p>
              </Link>
              
              <Link href="/historique" className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-2xl mb-3">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Mon historique</h3>
                <p className="text-gray-600 text-sm">Gérez toutes vos factures créées</p>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}


