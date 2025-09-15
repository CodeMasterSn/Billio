'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ConfidentialitePage() {
  const [activeSection, setActiveSection] = useState('')
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  // Table des matières
  const sections = [
    { id: "resume", title: "Résumé exécutif" },
    { id: "responsable", title: "1. Responsable du traitement" },
    { id: "donnees", title: "2. Données collectées" },
    { id: "finalites", title: "3. Finalités du traitement" },
    { id: "stockage", title: "4. Stockage et conservation" },
    { id: "partage", title: "5. Partage des données" },
    { id: "droits", title: "6. Droits de l'utilisateur" },
    { id: "securite", title: "7. Sécurité des données" },
    { id: "cookies", title: "8. Cookies et traceurs" },
    { id: "transferts", title: "9. Transferts internationaux" },
    { id: "violations", title: "10. Notification violations" },
    { id: "dpo", title: "11. Délégué à la protection" },
    { id: "autorite", title: "12. Autorité de contrôle" }
  ]

  // Vérifier le consentement cookies au chargement
  useEffect(() => {
    const consent = localStorage.getItem('billio_analytics_consent')
    if (!consent) {
      setShowCookieBanner(true)
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

  // Gestion des cookies
  const acceptAnalytics = () => {
    localStorage.setItem('billio_analytics_consent', 'true')
    // Activer Google Analytics si nécessaire
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
    setShowCookieBanner(false)
  }

  const refuseAnalytics = () => {
    localStorage.setItem('billio_analytics_consent', 'false')
    // Désactiver Google Analytics si nécessaire
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
    setShowCookieBanner(false)
  }

  return (
    <>
      <Head>
        <title>Politique de confidentialité - Billio | Protection des données</title>
        <meta name="description" content="Politique de protection des données personnelles de Billio. Conformité RGPD et transparence sur le traitement de vos informations." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Politique de confidentialité - Billio" />
        <meta property="og:description" content="Protection des données personnelles et conformité RGPD" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 confidentialite-page">
        <Header />
        
        {/* Banner Cookies RGPD */}
        {showCookieBanner && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Respect de votre vie privée</h3>
                  <p className="text-sm text-gray-600">
                    Nous utilisons des cookies pour améliorer votre expérience. Les cookies analytiques nous aident à comprendre l'utilisation de notre service.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={acceptAnalytics}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={refuseAnalytics}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">Politique de confidentialité</span>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Politique de confidentialité
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Protection des données personnelles et conformité RGPD
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
                </div>
              </div>

              {/* Contenu principal */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                  
                  {/* RÉSUMÉ EXÉCUTIF */}
                  <section id="resume" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Résumé exécutif</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-3">En bref :</h3>
                      <ul className="text-blue-800 space-y-2">
                        <li className="text-gray-900">• <strong>Vos données restent sur votre appareil</strong> - Stockage local uniquement</li>
                        <li className="text-gray-900">• <strong>Aucune revente</strong> - Nous ne vendons jamais vos données</li>
                        <li className="text-gray-900">• <strong>Transparence totale</strong> - Vous savez exactement ce qui est collecté</li>
                        <li className="text-gray-900">• <strong>Droits RGPD complets</strong> - Accès, rectification, suppression, portabilité</li>
                        <li className="text-gray-900">• <strong>Conformité sénégalaise</strong> - Respect de la législation locale</li>
                      </ul>
                    </div>
                    <div className="prose prose-gray max-w-none">
                      <p className="mb-4">
                        Cette politique de confidentialité explique comment Billio collecte, utilise et protège vos données personnelles. Nous nous engageons à respecter votre vie privée et à vous donner un contrôle total sur vos informations.
                      </p>
                      <p>
                        <strong>Principe fondamental :</strong> Vos données de facturation sont stockées localement sur votre appareil et ne sont jamais transmises à nos serveurs. Seules les données analytiques anonymisées peuvent être collectées avec votre consentement.
                      </p>
                    </div>
                  </section>

                  {/* 1. RESPONSABLE DU TRAITEMENT */}
                  <section id="responsable" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">1. Responsable du traitement</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Identification</h3>
                      <p className="mb-4">
                        <strong>Dénomination :</strong> Billio<br />
                        <strong>Contact responsable :</strong> billio.africa@gmail.com<br />
                        <strong>Adresse :</strong> Dakar, Rufisque Ouest, Sénégal<br />
                        <strong>Site web :</strong> billiosn.netlify.app
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Représentant légal</h3>
                      <p className="mb-4">
                        Billio agit en qualité de responsable du traitement des données personnelles collectées dans le cadre de l'utilisation de la plateforme de facturation.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">1.3 Contact DPO</h3>
                      <p>
                        Pour toute question relative à la protection des données, vous pouvez contacter notre responsable à l'adresse : <strong>billio.africa@gmail.com</strong>
                      </p>
                    </div>
                  </section>

                  {/* 2. DONNÉES COLLECTÉES */}
                  <section id="donnees" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">2. Données collectées</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Données directement fournies</h3>
                      <p className="mb-4">Vous nous fournissez directement les données suivantes :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Informations entreprise :</strong> nom, adresse, téléphone, email, NINEA, logo</li>
                        <li><strong>Informations clients :</strong> nom, adresse, coordonnées de vos clients</li>
                        <li><strong>Données de facturation :</strong> produits/services, prix, quantités, modes de paiement</li>
                        <li><strong>Notes et commentaires :</strong> informations additionnelles sur les factures</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Données collectées automatiquement</h3>
                      <p className="mb-4">Nous collectons automatiquement :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Données de navigation :</strong> pages visitées, temps passé, actions effectuées</li>
                        <li><strong>Données techniques :</strong> adresse IP, type de navigateur, système d'exploitation</li>
                        <li><strong>Cookies de fonctionnement :</strong> préférences utilisateur, session active</li>
                        <li><strong>Données analytiques :</strong> statistiques d'utilisation anonymisées (avec consentement)</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 Données non collectées</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          <strong>Important :</strong> Nous ne collectons JAMAIS de données bancaires, financières sensibles, ou d'informations permettant de vous identifier personnellement en dehors de votre utilisation volontaire du service.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 3. FINALITÉS DU TRAITEMENT */}
                  <section id="finalites" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">3. Finalités du traitement</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Finalités principales</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Fourniture du service :</strong> création, génération et téléchargement de factures</li>
                        <li><strong>Sauvegarde locale :</strong> conservation de vos factures dans l'historique</li>
                        <li><strong>Support technique :</strong> assistance et résolution des problèmes</li>
                        <li><strong>Amélioration du service :</strong> développement de nouvelles fonctionnalités</li>
                        <li><strong>Analyse statistique :</strong> compréhension de l'utilisation (anonymisée)</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Base légale</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Exécution du contrat :</strong> fourniture du service de facturation</li>
                        <li><strong>Intérêt légitime :</strong> amélioration du service et support technique</li>
                        <li><strong>Consentement :</strong> cookies analytiques et communications marketing</li>
                        <li><strong>Obligation légale :</strong> conservation des données pour conformité</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 Finalités interdites</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">
                          <strong>Nous ne traitons JAMAIS vos données pour :</strong> la revente à des tiers, le marketing non sollicité, la publicité ciblée, ou toute finalité non déclarée dans cette politique.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 4. STOCKAGE ET CONSERVATION */}
                  <section id="stockage" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">4. Stockage et conservation</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Stockage principal</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-blue-800">
                          <strong>Vos données de facturation sont stockées UNIQUEMENT sur votre appareil</strong> dans le localStorage de votre navigateur. Elles ne sont jamais transmises à nos serveurs.
                        </p>
                      </div>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>localStorage :</strong> données de facturation et historique</li>
                        <li><strong>EmailJS :</strong> transmission temporaire des emails de contact</li>
                        <li><strong>Google Analytics :</strong> données anonymisées d'utilisation</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Durées de conservation</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>localStorage :</strong> jusqu'à suppression par l'utilisateur</li>
                        <li><strong>Analytics :</strong> 26 mois maximum (Google Analytics)</li>
                        <li><strong>Emails support :</strong> 3 ans maximum</li>
                        <li><strong>Données techniques :</strong> 12 mois maximum</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.3 Suppression automatique</h3>
                      <p>
                        Les données sont automatiquement supprimées à l'expiration des durées de conservation, sauf obligation légale contraire ou demande de conservation de l'utilisateur.
                      </p>
                    </div>
                  </section>

                  {/* 5. PARTAGE DES DONNÉES */}
                  <section id="partage" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">5. Partage des données</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Prestataires techniques</h3>
                      <p className="mb-4">Nous partageons des données limitées avec :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Google Analytics :</strong> données anonymisées d'utilisation (avec consentement)</li>
                        <li><strong>EmailJS :</strong> transmission des emails de contact</li>
                        <li><strong>Netlify :</strong> hébergement technique (données techniques uniquement)</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Aucun partage commercial</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-green-800">
                          <strong>Engagement ferme :</strong> Nous ne vendons, ne louons, ni ne transmettons vos données à des tiers à des fins commerciales, marketing ou publicitaires.
                        </p>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.3 Obligations légales</h3>
                      <p>
                        Nous pouvons être amenés à communiquer vos données aux autorités compétentes en cas d'obligation légale ou de demande judiciaire.
                      </p>
                    </div>
                  </section>

                  {/* 6. DROITS DE L'UTILISATEUR */}
                  <section id="droits" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">6. Droits de l'utilisateur</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1 Droits RGPD complets</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit d'accès</h4>
                          <p className="text-blue-800 text-sm">Connaître les données que nous détenons sur vous</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit de rectification</h4>
                          <p className="text-blue-800 text-sm">Corriger les données inexactes</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit d'effacement</h4>
                          <p className="text-blue-800 text-sm">Supprimer vos données ("droit à l'oubli")</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit à la portabilité</h4>
                          <p className="text-blue-800 text-sm">Récupérer vos données dans un format lisible</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit d'opposition</h4>
                          <p className="text-blue-800 text-sm">Vous opposer au traitement de vos données</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Droit de limitation</h4>
                          <p className="text-blue-800 text-sm">Limiter le traitement de vos données</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2 Exercice des droits</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <p className="text-yellow-800">
                          <strong>Pour exercer vos droits :</strong><br />
                          • Contactez-nous à : <strong>billio.africa@gmail.com</strong><br />
                          • Réponse sous 30 jours maximum<br />
                          • Justification d'identité requise<br />
                          • Service gratuit (sauf demandes excessives)
                        </p>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.3 Contrôle direct</h3>
                      <p>
                        Vous pouvez supprimer vos données directement depuis votre navigateur en vidant le localStorage ou en nous contactant pour assistance.
                      </p>
                    </div>
                  </section>

                  {/* 7. SÉCURITÉ DES DONNÉES */}
                  <section id="securite" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">7. Sécurité des données</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1 Mesures techniques</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Chiffrement HTTPS :</strong> toutes les communications sont chiffrées</li>
                        <li><strong>Stockage local sécurisé :</strong> localStorage protégé par le navigateur</li>
                        <li><strong>Pas de transmission non chiffrée :</strong> aucune donnée en clair</li>
                        <li><strong>Sauvegardes sécurisées :</strong> données techniques sauvegardées</li>
                        <li><strong>Anonymisation :</strong> données analytiques anonymisées</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2 Mesures organisationnelles</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Accès limité :</strong> seules les personnes autorisées accèdent aux données</li>
                        <li><strong>Formation équipe :</strong> sensibilisation à la protection des données</li>
                        <li><strong>Procédures incidents :</strong> gestion des violations de données</li>
                        <li><strong>Audit régulier :</strong> vérification des pratiques de sécurité</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.3 Limitation des risques</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          <strong>Avantage du stockage local :</strong> Vos données de facturation ne transitent jamais par nos serveurs, réduisant considérablement les risques de violation.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 8. COOKIES ET TRACEURS */}
                  <section id="cookies" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">8. Cookies et traceurs</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Cookies strictement nécessaires</h3>
                      <p className="mb-4">Ces cookies sont indispensables au fonctionnement :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Cookies de session :</strong> maintien de votre session active</li>
                        <li><strong>Préférences utilisateur :</strong> sauvegarde de vos paramètres</li>
                        <li><strong>Fonctionnement :</strong> cookies techniques essentiels</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Cookies analytiques</h3>
                      <p className="mb-4">Ces cookies nécessitent votre consentement :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Google Analytics :</strong> analyse d'utilisation anonymisée</li>
                        <li><strong>Anonymisation IP :</strong> votre adresse IP est anonymisée</li>
                        <li><strong>Opt-out possible :</strong> vous pouvez refuser à tout moment</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.3 Gestion des cookies</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                          <strong>Vous contrôlez vos cookies :</strong> Utilisez le banner de consentement ou les paramètres de votre navigateur pour gérer vos préférences.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 9. TRANSFERTS INTERNATIONAUX */}
                  <section id="transferts" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">9. Transferts internationaux</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.1 Prestataires internationaux</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Netlify (États-Unis) :</strong> hébergement technique avec clauses contractuelles types</li>
                        <li><strong>Google Analytics (États-Unis) :</strong> données anonymisées avec garanties appropriées</li>
                        <li><strong>EmailJS (Union Européenne) :</strong> transmission emails avec conformité RGPD</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.2 Garanties appropriées</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Clauses contractuelles types UE :</strong> protection standard européenne</li>
                        <li><strong>Certifications Privacy Shield :</strong> garanties de protection</li>
                        <li><strong>Évaluation régulière :</strong> vérification des garanties</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.3 Limitation des transferts</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          <strong>Important :</strong> Vos données de facturation ne sont jamais transférées à l'international car elles restent stockées localement sur votre appareil.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 10. NOTIFICATION VIOLATIONS */}
                  <section id="violations" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">10. Notification violations</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.1 Obligation de notification</h3>
                      <p className="mb-4">En cas de violation de données, nous nous engageons à :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Notifier l'autorité :</strong> sous 72h si risque pour les droits et libertés</li>
                        <li><strong>Informer les utilisateurs :</strong> si risque élevé pour leurs données</li>
                        <li><strong>Prendre des mesures :</strong> correction immédiate des failles</li>
                        <li><strong>Documenter :</strong> traçabilité complète de l'incident</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.2 Procédure interne</h3>
                      <p className="mb-4">Notre procédure de gestion des incidents :</p>
                      <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-900">
                        <li>Détection et évaluation de la violation</li>
                        <li>Mesures immédiates de confinement</li>
                        <li>Évaluation des risques pour les personnes</li>
                        <li>Notification aux autorités et utilisateurs</li>
                        <li>Correction et prévention</li>
                      </ol>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.3 Limitation des risques</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                          <strong>Avantage du stockage local :</strong> Le risque de violation de vos données de facturation est minimisé car elles ne sont pas stockées sur nos serveurs.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 11. DÉLÉGUÉ À LA PROTECTION */}
                  <section id="dpo" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">11. Délégué à la protection des données</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.1 Contact DPO</h3>
                      <p className="mb-4">
                        <strong>Email :</strong> billio.africa@gmail.com<br />
                        <strong>Rôle :</strong> Responsable de la protection des données personnelles
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.2 Missions du DPO</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li>Conseil sur la conformité RGPD</li>
                        <li>Formation de l'équipe</li>
                        <li>Audit des pratiques</li>
                        <li>Interface avec les autorités</li>
                        <li>Gestion des réclamations</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.3 Indépendance</h3>
                      <p>
                        Le DPO agit en toute indépendance et dispose des ressources nécessaires pour exercer ses missions conformément au RGPD.
                      </p>
                    </div>
                  </section>

                  {/* 12. AUTORITÉ DE CONTRÔLE */}
                  <section id="autorite" className="mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">12. Autorité de contrôle</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.1 Droit de réclamation</h3>
                      <p className="mb-4">
                        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-900">
                        <li><strong>Commission de l'informatique et des libertés (Sénégal)</strong></li>
                        <li><strong>CNIL (France)</strong> si vous résidez dans l'UE</li>
                        <li><strong>Autorité compétente</strong> de votre pays de résidence</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.2 Procédure de réclamation</h3>
                      <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-900">
                        <li>Contactez-nous d'abord pour résolution amiable</li>
                        <li>Si insatisfait, saisissez l'autorité de contrôle</li>
                        <li>Recours possible devant les tribunaux</li>
                      </ol>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.3 Recours amiable</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          <strong>Nous privilégions toujours le dialogue :</strong> Contactez-nous à billio.africa@gmail.com avant tout recours pour trouver une solution amiable.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Contact et mise à jour */}
                  <div className="mt-16 space-y-8">
                    {/* Contact */}
                    <div className="bg-blue-50 rounded-lg p-8 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Questions sur cette politique ?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Notre équipe est à votre disposition pour toute clarification sur la protection de vos données.
                      </p>
                      <a
                        href="mailto:billio.africa@gmail.com"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Nous contacter
                      </a>
                    </div>

                    {/* Mise à jour */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Mise à jour de cette politique</h3>
                      <p className="text-gray-600 mb-4">
                        Cette politique peut être mise à jour pour refléter les évolutions de notre service ou de la réglementation. Les modifications importantes vous seront notifiées.
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Version actuelle :</strong> 1.0 - 15 janvier 2025<br />
                        <strong>Prochaine révision :</strong> Janvier 2026 (ou selon évolution réglementaire)
                      </p>
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


