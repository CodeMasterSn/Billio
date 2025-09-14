'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index, event) => {
    setOpenFAQ(openFAQ === index ? null : index)
    event.target.blur() // Supprimer le focus après le clic
  }

  const faqs = [
    {
      question: "Comment créer ma première facture avec Billio ?",
      answer: "C'est très simple ! Cliquez sur \"Créer ma facture gratuitement\", remplissez les informations de votre entreprise et de votre client, ajoutez vos produits ou services, et générez votre facture PDF en un clic."
    },
    {
      question: "Billio est-il gratuit ?",
      answer: "Oui ! Billio est actuellement entièrement gratuit. Créez un nombre illimité de factures sans aucune limite. La plateforme reste gratuite jusqu'à l'arrivée des fonctionnalités premium."
    },
    {
      question: "Quelles fonctionnalités sont disponibles maintenant ?",
      answer: "Création de factures, téléchargement PDF, impression, compatibilité mobile, formats adaptés au Sénégal (Orange Money, Wave, NINEA). Historique disponible et templates personnalisés arrivent bientôt."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "La sécurité de vos données est notre priorité. Nous utilisons des protocoles de chiffrement avancés et nos serveurs sont hébergés de manière sécurisée. Vos informations ne sont jamais partagées avec des tiers."
    },
    {
      question: "Puis-je utiliser Billio sur mobile ?",
      answer: "Oui ! Billio est entièrement responsive et fonctionne parfaitement sur tous les appareils : ordinateur, tablette et smartphone. Créez et gérez vos factures où que vous soyez."
    },
    {
      question: "Comment puis-je obtenir de l'aide ?",
      answer: "Notre équipe support est là pour vous aider ! Contactez-nous via la page Contact ou par email à billio.africa@gmail.com. Nous répondons généralement dans les 24h."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texte à gauche */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-blue-600">Créez</span> <span className="text-gray-900">des</span> <span className="text-gray-900">factures</span> <span className="text-blue-600">professionnelles</span> <span className="text-gray-900">en</span> <span className="text-gray-900">quelques</span> <span className="text-blue-600">minutes</span>.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Billio est la solution de facturation en ligne conçue pour freelances et petites entreprises en Afrique.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  href="/create-invoice"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg text-center"
                >
                  Créer ma facture gratuitement
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-base sm:text-lg">
                  Voir la démo
                </button>
              </div>
            </div>
            
            {/* Image à droite */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl p-8 h-80 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/banner-1.png"
                    alt="Entrepreneur africain travaillant sur ordinateur avec des factures"
                    width={400}
                    height={300}
                    className="object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="text-blue-600">Pourquoi</span> <span className="text-gray-900">choisir</span> <span className="text-blue-600">Billio</span> ?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Une solution complète pour simplifier votre facturation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Point fort 1 */}
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Créez vos factures en quelques secondes
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Interface intuitive et templates professionnels pour générer vos factures rapidement.
              </p>
            </div>
            
            {/* Point fort 2 */}
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Historique de vos factures
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Retrouvez toutes vos factures en un clic, consultez leur statut et gérez votre historique de facturation facilement.
              </p>
            </div>
            
            {/* Point fort 3 */}
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow relative">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center relative">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="absolute -top-1 -right-1">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Bientôt
                  </span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Bientôt - Templates personnalisés
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Factures aux couleurs de votre marque, personnalisez vos templates et créez une identité visuelle unique pour votre entreprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Démo produit */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Des <span className="text-blue-600">factures</span> <span className="text-gray-900">au</span> <span className="text-gray-900">standard</span> <span className="text-blue-600">professionnel</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Interface moderne et intuitive pour une facturation efficace
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      <span className="text-blue-600">Facture</span> <span className="text-gray-900">Billio</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Design moderne</span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Paiements mobiles (Wave, Orange Money)</span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Informations légales (NINEA, RC)</span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-orange-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Génération PDF instantanée</span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-pink-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Interface intuitive et rapide</span>
                      </div>
                      <div className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 hover:shadow-md transition-all duration-200">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-sm"></div>
                        <span className="text-gray-800 font-medium">Compatible mobile et desktop</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Exemple de facture générée</h4>
                    <div className="relative group">
                      {/* Effet de brillance au survol */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Image de la facture avec effet 3D */}
                      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 p-4 sm:p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                        
                        {/* Container pour l'image avec marges */}
                        <div className="relative flex items-center justify-center min-h-64 sm:min-h-80 md:min-h-96">
                          <Image
                            src="/images/testimonials/exemple-facture.PNG"
                            alt="Exemple de facture générée avec Billio"
                            width={400}
                            height={500}
                            className="w-full h-auto object-contain relative z-10 max-h-72 sm:max-h-80 md:max-h-96"
                            priority
                          />
                        </div>
                        
                        {/* Overlay avec effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Badge "Créé avec Billio" - Position corrigée */}
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300 z-20">
                          <span className="hidden sm:inline">Créé avec Billio</span>
                          <span className="sm:hidden">Billio</span>
                        </div>
                      </div>
                      
                      {/* Effet de particules flottantes */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="text-blue-600">Ce que</span> <span className="text-gray-900">disent</span> <span className="text-blue-600">nos utilisateurs</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Des entrepreneurs innovants nous font confiance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Aminata Mbaye</h4>
                  <p className="text-gray-600">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Simple et rapide, mes factures sont maintenant professionnelles"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            
            {/* Témoignage 2 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  KD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Kouassi Dembélé</h4>
                  <p className="text-gray-600">Consultant IT</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Interface intuitive, j'ai créé ma première facture en 2 minutes"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
            
            {/* Témoignage 3 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  FS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Fatou Sarr</h4>
                  <p className="text-gray-600">Agence Marketing</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Parfait pour notre équipe, compatible avec nos habitudes de paiement"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Questions <span className="text-blue-600">Fréquentes</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Tout ce que vous devez savoir sur Billio
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={(e) => toggleFAQ(index, e)}
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left flex justify-between items-center hover:bg-blue-50 transition-colors focus:outline-none"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-blue-600 transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action final */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Commencez à facturer dès aujourd'hui
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8">
            Rejoignez des milliers d'entrepreneurs africains qui utilisent Billio pour simplifier leur facturation.
          </p>
          <Link 
            href="/create-invoice"
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-base sm:text-lg inline-block"
          >
            Créer ma facture gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}