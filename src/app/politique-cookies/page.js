'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function PolitiqueCookiesPage() {
  const [activeSection, setActiveSection] = useState('')
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Non modifiable
    analytics: false,
    functional: true
  })
  const [showManager, setShowManager] = useState(false)

  // Table des matières
  const sections = [
    { id: "definition", title: "Qu'est-ce qu'un cookie ?" },
    { id: "cookies-billio", title: "Cookies utilisés par Billio" },
    { id: "finalites", title: "Finalités détaillées" },
    { id: "controle", title: "Contrôle utilisateur" },
    { id: "tiers", title: "Données tiers et transferts" },
    { id: "droits", title: "Vos droits" },
    { id: "banner", title: "Banner cookies conforme" },
    { id: "contact", title: "Mise à jour et contact" }
  ]

  // Cookies utilisés par Billio
  const necessaryCookies = [
    {
      name: "billio_daily_limit",
      purpose: "Gestion limitation factures quotidiennes",
      duration: "Permanent (localStorage)",
      data: "Compteur factures, email optionnel",
      thirdParty: false,
      control: "Non modifiable"
    },
    {
      name: "billio_invoices",
      purpose: "Sauvegarde historique factures",
      duration: "Permanent (localStorage)",
      data: "Données factures créées",
      thirdParty: false,
      control: "Non modifiable"
    },
    {
      name: "billio_preferences",
      purpose: "Préférences utilisateur interface",
      duration: "Permanent (localStorage)",
      data: "Langue, thème, paramètres",
      thirdParty: false,
      control: "Non modifiable"
    }
  ]

  const analyticsCookies = [
    {
      name: "_ga, _ga_*",
      provider: "Google Analytics",
      purpose: "Analyse audience et comportement",
      duration: "2 ans",
      data: "Pages visitées, temps passé, source trafic",
      thirdParty: true,
      control: "Opt-out possible"
    }
  ]

  // Charger les préférences au montage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('billio_cookie_preferences')
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences))
    }
  }, [])

  // Fonction pour gérer le scroll vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  // Gestion des préférences cookies
  const handlePreferenceChange = (category, value) => {
    const newPreferences = { ...cookiePreferences, [category]: value }
    setCookiePreferences(newPreferences)
    localStorage.setItem('billio_cookie_preferences', JSON.stringify(newPreferences))
    
    // Appliquer les changements
    if (category === 'analytics') {
      if (value) {
        localStorage.setItem('billio_analytics_consent', 'true')
        if (typeof gtag !== 'undefined') {
          gtag('consent', 'update', { 'analytics_storage': 'granted' })
        }
      } else {
        localStorage.setItem('billio_analytics_consent', 'false')
        if (typeof gtag !== 'undefined') {
          gtag('consent', 'update', { 'analytics_storage': 'denied' })
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Politique des cookies - Billio | Transparence et contrôle</title>
        <meta name="description" content="Politique transparente sur l'utilisation des cookies par Billio. Contrôlez vos préférences et comprenez notre usage des données de navigation." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Politique des cookies - Billio" />
        <meta property="og:description" content="Transparence et contrôle sur l'utilisation des cookies" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">Politique des cookies</span>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Politique des cookies
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Transparence et contrôle sur l'utilisation des cookies
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                <p className="text-sm text-green-800">
                  <strong>Dernière mise à jour :</strong> 15 janvier 2025
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table des matières */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Table des matières</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                  
                  {/* Bouton gestion cookies */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowManager(!showManager)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {showManager ? 'Masquer' : 'Gérer'} mes cookies
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                  
                  {/* Panneau de gestion des cookies */}
                  {showManager && (
                    <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Gérez vos préférences cookies</h2>
                      
                      <div className="space-y-6">
                        {/* Cookies nécessaires */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">Cookies strictement nécessaires</h3>
                              <p className="text-sm text-gray-600">Requis pour le fonctionnement de base</p>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.necessary} 
                                disabled 
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">Toujours actifs</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            Ces cookies sont indispensables au fonctionnement de Billio et ne peuvent pas être désactivés.
                          </p>
                        </div>

                        {/* Cookies analytiques */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">Cookies analytiques</h3>
                              <p className="text-sm text-gray-600">Nous aident à améliorer le service</p>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.analytics}
                                onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">Optionnels</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            Ces cookies nous permettent de comprendre comment vous utilisez Billio pour l'améliorer.
                          </p>
                        </div>

                        {/* Cookies fonctionnels */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">Cookies fonctionnels</h3>
                              <p className="text-sm text-gray-600">Améliorent votre expérience</p>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.functional}
                                onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">Recommandés</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            Ces cookies mémorisent vos préférences pour personnaliser votre expérience.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            handlePreferenceChange('analytics', true)
                            handlePreferenceChange('functional', true)
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Accepter tout
                        </button>
                        <button
                          onClick={() => {
                            handlePreferenceChange('analytics', false)
                            handlePreferenceChange('functional', false)
                          }}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                        >
                          Refuser optionnels
                        </button>
                        <button
                          onClick={() => setShowManager(false)}
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 1. QU'EST-CE QU'UN COOKIE ? */}
                  <section id="definition" className="mb-12">
                    <h2 className="text-xl sm:text-xl sm:text-2xl font-bold text-gray-900 mb-6">Qu'est-ce qu'un cookie ?</h2>
                    <div className="prose prose-gray max-w-none">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-3">Définition simple :</h3>
                        <p className="text-blue-800 mb-4">
                          Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Il permet au site de mémoriser vos préférences et d'améliorer votre expérience de navigation.
                        </p>
                      <ul className="text-blue-800 space-y-2">
                        <li className="text-gray-900">• <strong>Ne contient jamais d'informations personnelles sensibles</strong></li>
                        <li className="text-gray-900">• <strong>Améliore votre expérience</strong> en mémorisant vos préférences</li>
                        <li className="text-gray-900">• <strong>Facilite la navigation</strong> en évitant de ressaisir des informations</li>
                        <li className="text-gray-900">• <strong>Peut être supprimé</strong> à tout moment depuis votre navigateur</li>
                      </ul>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Types de cookies</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Par durée</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• <strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                            <li>• <strong>Cookies persistants :</strong> durée déterminée (jours, mois, années)</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Par origine</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• <strong>Cookies internes :</strong> créés par le site visité</li>
                            <li>• <strong>Cookies tiers :</strong> créés par des services externes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 2. COOKIES UTILISÉS PAR BILLIO */}
                  <section id="cookies-billio" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Cookies utilisés par Billio</h2>
                    
                    {/* Cookies strictement nécessaires */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">🍪 Cookies strictement nécessaires</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-800 font-medium">
                          ✅ Ces cookies sont indispensables au fonctionnement de Billio et ne nécessitent pas de consentement.
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nom du cookie</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Finalité</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Durée</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Données</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contrôle</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {necessaryCookies.map((cookie, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-3 py-3 text-sm font-mono bg-gray-50">{cookie.name}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.purpose}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.duration}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.data}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">
                                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {cookie.control}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cookies analytiques */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Cookies analytiques</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800 font-medium">
                          ℹ️ Ces cookies nécessitent votre consentement et peuvent être désactivés à tout moment.
                        </p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nom du cookie</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Fournisseur</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Finalité</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Durée</th>
                              <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contrôle</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {analyticsCookies.map((cookie, index) => (
                              <tr key={index}>
                                <td className="border border-gray-300 px-3 py-3 text-sm font-mono bg-gray-50">{cookie.name}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.provider}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.purpose}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">{cookie.duration}</td>
                                <td className="border border-gray-300 px-3 py-3 text-sm">
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                    {cookie.control}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cookies non utilisés */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Cookies que nous n'utilisons PAS</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="text-red-800 space-y-2">
                          <li className="text-gray-900">• <strong>Cookies publicitaires :</strong> AUCUN</li>
                          <li className="text-gray-900">• <strong>Cookies de ciblage :</strong> AUCUN</li>
                        </ul>
                        <ul className="text-red-800 space-y-2">
                          <li className="text-gray-900">• <strong>Cookies réseaux sociaux :</strong> AUCUN</li>
                          <li className="text-gray-900">• <strong>Cookies de tracking commercial :</strong> AUCUN</li>
                        </ul>
                      </div>
                      <p className="text-red-700 mt-4 font-medium">
                        Billio ne fait aucun usage commercial de vos données de navigation.
                      </p>
                    </div>
                  </section>

                  {/* 3. FINALITÉS DÉTAILLÉES */}
                  <section id="finalites" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Finalités détaillées</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Amélioration du service</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-900">
                        <li>Comprendre quelles fonctionnalités sont les plus utilisées</li>
                        <li>Identifier les problèmes techniques et les corriger</li>
                        <li>Optimiser les performances de la plateforme</li>
                        <li>Adapter l'interface aux usages réels des utilisateurs</li>
                        <li>Développer de nouvelles fonctionnalités utiles</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Mesures d'audience</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-900">
                        <li>Nombre de visiteurs uniques et pages vues</li>
                        <li>Pages les plus consultées et parcours utilisateur</li>
                        <li>Taux de conversion création de factures</li>
                        <li>Durée moyenne des sessions</li>
                        <li>Sources de trafic (moteurs de recherche, liens directs)</li>
                      </ul>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800">
                          <strong>Important :</strong> Toutes ces données sont anonymisées et agrégées. Nous ne pouvons pas identifier un utilisateur spécifique à partir de ces informations.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 4. CONTRÔLE UTILISATEUR */}
                  <section id="controle" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contrôle utilisateur</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Options de contrôle</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Via Billio</h4>
                          <ul className="text-blue-800 text-sm space-y-1">
                            <li>• Panneau de gestion des cookies</li>
                            <li>• Modification possible à tout moment</li>
                            <li>• Application immédiate des choix</li>
                            <li>• Sauvegarde des préférences</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Via votre navigateur</h4>
                          <ul className="text-green-800 text-sm space-y-1">
                            <li>• Paramètres de confidentialité</li>
                            <li>• Suppression manuelle des cookies</li>
                            <li>• Blocage des cookies tiers</li>
                            <li>• Mode navigation privée</li>
                          </ul>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions par navigateur</h3>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                          <p className="text-sm text-gray-700">Paramètres → Confidentialité et sécurité → Cookies et autres données de site</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                          <p className="text-sm text-gray-700">Préférences → Confidentialité → Gérer les données de site web</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                          <p className="text-sm text-gray-700">Options → Vie privée et sécurité → Cookies et données de sites</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 5. DONNÉES TIERS ET TRANSFERTS */}
                  <section id="tiers" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Données tiers et transferts</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Analytics</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <ul className="text-blue-800 space-y-2">
                          <li>• <strong>Localisation serveurs :</strong> États-Unis + Europe</li>
                          <li>• <strong>Anonymisation IP :</strong> activée par défaut</li>
                          <li>• <strong>Données agrégées :</strong> uniquement des statistiques générales</li>
                          <li>• <strong>Pas de profilage :</strong> aucun ciblage individuel</li>
                          <li>• <strong>Suppression automatique :</strong> après 26 mois maximum</li>
                        </ul>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Garanties de protection</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li>Clauses contractuelles types de l'Union Européenne</li>
                        <li>Certifications internationales de protection des données</li>
                        <li>Audit régulier des pratiques de sécurité</li>
                        <li>Droit d'accès et de suppression des données</li>
                        <li>Conformité aux standards internationaux</li>
                      </ul>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          <strong>Avantage Billio :</strong> Vos données de facturation ne sont jamais transférées car elles restent stockées localement sur votre appareil.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 6. VOS DROITS */}
                  <section id="droits" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Vos droits</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Droits sur les cookies</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Contrôle technique</h4>
                          <ul className="text-blue-800 text-sm space-y-1">
                            <li>• Paramétrage navigateur</li>
                            <li>• Suppression manuelle</li>
                            <li>• Blocage sélectif</li>
                            <li>• Mode privé</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Contrôle légal</h4>
                          <ul className="text-green-800 text-sm space-y-1">
                            <li>• Information préalable</li>
                            <li>• Consentement éclairé</li>
                            <li>• Droit d'opposition</li>
                            <li>• Retrait du consentement</li>
                          </ul>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Comment exercer vos droits</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-blue-600 font-bold">1.</span>
                          <div>
                            <p className="font-medium">Paramètres navigateur</p>
                            <p className="text-sm text-gray-600">Configurez votre navigateur pour bloquer ou supprimer les cookies</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-blue-600 font-bold">2.</span>
                          <div>
                            <p className="font-medium">Page préférences Billio</p>
                            <p className="text-sm text-gray-600">Utilisez notre panneau de gestion des cookies</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-blue-600 font-bold">3.</span>
                          <div>
                            <p className="font-medium">Contact direct</p>
                            <p className="text-sm text-gray-600">Écrivez-nous à billio.africa@gmail.com</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-blue-600 font-bold">4.</span>
                          <div>
                            <p className="font-medium">Outils Google Analytics</p>
                            <p className="text-sm text-gray-600">Utilisez l'outil d'opt-out de Google</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 7. BANNER COOKIES CONFORME */}
                  <section id="banner" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Banner cookies conforme</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="mb-4">
                        Notre banner de cookies respecte les exigences RGPD et vous donne un contrôle total sur vos préférences.
                      </p>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Fonctionnalités du banner :</h3>
                        <ul className="text-gray-700 space-y-2">
                          <li>• <strong>Information claire :</strong> Explication des cookies utilisés</li>
                          <li>• <strong>Choix granulaire :</strong> Accepter/refuser par catégorie</li>
                          <li>• <strong>Liens utiles :</strong> Vers cette politique et la politique de confidentialité</li>
                          <li>• <strong>Application immédiate :</strong> Vos choix sont appliqués instantanément</li>
                          <li>• <strong>Sauvegarde :</strong> Vos préférences sont mémorisées</li>
                        </ul>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Options disponibles</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <h4 className="font-semibold text-green-900 mb-2">Accepter tout</h4>
                          <p className="text-green-800 text-sm">Active tous les cookies pour une expérience optimale</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                          <h4 className="font-semibold text-yellow-900 mb-2">Refuser analytiques</h4>
                          <p className="text-yellow-800 text-sm">Garde seulement les cookies nécessaires</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                          <h4 className="font-semibold text-blue-900 mb-2">Personnaliser</h4>
                          <p className="text-blue-800 text-sm">Contrôle granulaire par catégorie</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 8. MISE À JOUR ET CONTACT */}
                  <section id="contact" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Mise à jour et contact</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Évolution de la politique</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-900">
                        <li>Notification des changements majeurs par email ou banner</li>
                        <li>Date de dernière mise à jour visible en haut de page</li>
                        <li>Archive des versions précédentes disponible sur demande</li>
                        <li>Transparence totale sur les évolutions</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact et questions</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Support technique</h4>
                            <p className="text-blue-800 text-sm mb-2">
                              <strong>Email :</strong> billio.africa@gmail.com
                            </p>
                            <p className="text-blue-800 text-sm mb-2">
                              <strong>Réponse :</strong> sous 72h ouvrées
                            </p>
                            <p className="text-blue-800 text-sm">
                              <strong>Support :</strong> explications complémentaires disponibles
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Questions légales</h4>
                            <p className="text-blue-800 text-sm mb-2">
                              <strong>DPO :</strong> billio.africa@gmail.com
                            </p>
                            <p className="text-blue-800 text-sm mb-2">
                              <strong>Conformité :</strong> RGPD et droit sénégalais
                            </p>
                            <p className="text-blue-800 text-sm">
                              <strong>Réclamations :</strong> autorités de contrôle
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Contact final */}
                  <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Questions sur les cookies ?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Notre équipe est à votre disposition pour toute clarification sur notre utilisation des cookies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="mailto:billio.africa@gmail.com"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Nous contacter
                      </a>
                      <Link
                        href="/confidentialite"
                        className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                      >
                        Politique de confidentialité
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}


