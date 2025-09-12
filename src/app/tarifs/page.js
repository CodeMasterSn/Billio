'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * PAGE TARIFS BILLIO
 *
 * Page tarifs professionnelle et moderne pour Billio.
 * Design optimisé pour le marché sénégalais avec focus sur la conversion.
 *
 * Fonctionnalités :
 * - 3 plans tarifaires clairs
 * - Design responsive et moderne
 * - FAQ intégrée
 * - CTA optimisés pour la conversion
 * - Compatible export statique Next.js
 */

export default function TarifsPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Données des plans tarifaires
  const pricingPlans = [
    {
      id: 'gratuit',
      plan: 'Gratuit',
      price: '0',
      currency: 'FCFA',
      period: '/mois',
      description: 'Parfait pour débuter',
      features: [
        '10 factures par mois',
        'Téléchargement PDF',
        'Impression directe',
        'Compatible mobile',
        'Formats locaux (Wave, Orange Money)',
        'Sans création de compte'
      ],
      buttonText: 'Commencer gratuitement',
      buttonStyle: 'outline',
      popular: false,
      href: '/create-invoice'
    },
    {
      id: 'standard',
      plan: 'Standard',
      price: '10 000',
      currency: 'FCFA',
      period: '/mois',
      description: 'Pour les entreprises actives',
      features: [
        '100 factures par mois',
        'Historique complet',
        'Templates personnalisés',
        'Dashboard de suivi',
        'Support prioritaire',
        'Export Excel',
        'Statistiques mensuelles'
      ],
      buttonText: 'Choisir Standard',
      buttonStyle: 'primary',
      popular: true,
      badge: 'Le plus populaire',
      href: '/contact?plan=standard'
    },
    {
      id: 'premium',
      plan: 'Premium',
      price: '25 000',
      currency: 'FCFA',
      period: '/mois',
      description: 'Pour les gros volumes',
      features: [
        '500 factures par mois',
        'Toutes les fonctionnalités Standard',
        'Branding personnalisé',
        'API d\'intégration',
        'Support téléphonique',
        'Formation équipe',
        'Backup automatique'
      ],
      buttonText: 'Choisir Premium',
      buttonStyle: 'primary',
      popular: false,
      href: '/contact?plan=premium'
    }
  ]

  // FAQ des tarifs
  const faqs = [
    {
      question: 'Puis-je changer de plan à tout moment ?',
      answer: 'Oui, vous pouvez passer d\'un plan à l\'autre à tout moment. Les changements sont effectifs immédiatement et nous ajustons la facturation en conséquence.'
    },
    {
      question: 'Que se passe-t-il si je dépasse ma limite ?',
      answer: 'Si vous dépassez votre limite mensuelle, nous vous proposerons automatiquement de passer au plan supérieur. Vous pouvez aussi acheter des factures supplémentaires à l\'unité.'
    },
    {
      question: 'Le paiement est-il sécurisé ?',
      answer: 'Absolument ! Nous utilisons Wave, la plateforme de paiement la plus sécurisée du Sénégal. Vos données bancaires ne sont jamais stockées sur nos serveurs.'
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais de résiliation n\'est appliqué.'
    },
    {
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Non, nos tarifs sont transparents. Le prix affiché est le prix final, sans frais cachés ni surprises.'
    },
    {
      question: 'Puis-je tester avant de payer ?',
      answer: 'Bien sûr ! Le plan Gratuit vous permet de tester toutes les fonctionnalités de base. Vous pouvez créer jusqu\'à 10 factures gratuitement.'
    }
  ]

  // Gestionnaire de clic sur plan
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan.id)
    setIsLoading(true)
    
    // Tracking Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pricing_plan_click', {
        'plan_name': plan.plan,
        'plan_price': plan.price,
        'event_category': 'pricing'
      })
    }

    // Simulation de chargement pour UX
    setTimeout(() => {
      setIsLoading(false)
      setSelectedPlan(null)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Tarifs Billio - Plans de facturation pour entrepreneurs au Sénégal</title>
        <meta name="description" content="Découvrez nos tarifs transparents pour la facturation en ligne. Plans Gratuit, Standard et Premium adaptés aux entrepreneurs sénégalais. Commencez gratuitement !" />
        <meta name="keywords" content="tarifs facturation, prix Billio, plans facturation Sénégal, Wave paiement" />
        <meta property="og:title" content="Tarifs Billio - Facturation en ligne au Sénégal" />
        <meta property="og:description" content="Plans tarifaires transparents pour votre facturation. Gratuit, Standard et Premium. Paiement sécurisé via Wave." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tarifs Billio - Facturation en ligne" />
        <meta name="twitter:description" content="Découvrez nos plans tarifaires pour la facturation professionnelle au Sénégal." />
        
        {/* Schema.org pour les prix */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Billio - Facturation en ligne",
            "description": "Plateforme de facturation pour entrepreneurs au Sénégal",
            "offers": [
              {
                "@type": "Offer",
                "name": "Plan Gratuit",
                "price": "0",
                "priceCurrency": "XOF",
                "description": "10 factures par mois"
              },
              {
                "@type": "Offer", 
                "name": "Plan Standard",
                "price": "10000",
                "priceCurrency": "XOF",
                "description": "100 factures par mois"
              },
              {
                "@type": "Offer",
                "name": "Plan Premium", 
                "price": "25000",
                "priceCurrency": "XOF",
                "description": "500 factures par mois"
              }
            ]
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choisissez votre plan Billio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des tarifs adaptés à vos besoins d'entrepreneur. 
            Commencez gratuitement et évoluez selon votre croissance.
          </p>
        </div>

        {/* Section Tarifs */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'ring-1 ring-gray-200'
                }`}
              >
                {/* Badge populaire */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* En-tête du plan */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.plan}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    
                    {/* Prix */}
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-xl text-gray-600 ml-2">
                        {plan.currency}
                      </span>
                      <span className="text-gray-500 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Fonctionnalités */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg 
                            className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bouton CTA */}
                  <Link
                    href={plan.href}
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                      plan.buttonStyle === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    } ${
                      selectedPlan === plan.id ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                        Chargement...
                      </div>
                    ) : (
                      plan.buttonText
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Paiement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Paiement sécurisé et simple
            </h2>
            <p className="text-gray-600 mb-6">
              Payez facilement via Wave, la plateforme de paiement la plus utilisée au Sénégal
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-green-100 p-4 rounded-lg">
                <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Wave</h3>
                <p className="text-sm text-gray-600">Paiement sécurisé</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Annulation possible à tout moment • Aucun frais caché
            </p>
          </div>
        </div>

        {/* Section FAQ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600">
              Tout ce que vous devez savoir sur nos tarifs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à faire évoluer votre facturation ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'entrepreneurs qui font confiance à Billio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-invoice"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </>
  )
}
