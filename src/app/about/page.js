import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'À propos de Billio – Logiciel de facturation pour freelances et petites entreprises',
  description: 'Billio est une solution de facturation en ligne pensée pour simplifier la vie des freelances et petites entreprises en Afrique. Découvrez notre mission, nos valeurs et nos avantages.',
  keywords: 'facturation en ligne, freelances Afrique, petites entreprises, gestion financière, factures PDF, mobile money, paiements',
  openGraph: {
    title: 'À propos de Billio – Logiciel de facturation pour freelances et petites entreprises',
    description: 'Billio est une solution de facturation en ligne pensée pour simplifier la vie des freelances et petites entreprises en Afrique. Découvrez notre mission, nos valeurs et nos avantages.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de Billio – Logiciel de facturation pour freelances et petites entreprises',
    description: 'Billio est une solution de facturation en ligne pensée pour simplifier la vie des freelances et petites entreprises en Afrique.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu texte */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Découvrez <span className="text-blue-600">Billio</span> : La facturation simplifiée pour freelances et petites entreprises.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Billio a été conçu pour vous permettre de créer vos factures et gérer vos paiements facilement, rapidement et en toute sécurité.
              </p>
              <div className="pt-4">
                <Link 
                  href="/create-invoice"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-block"
                >
                  Créer ma facture gratuitement
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl p-8 h-80 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/a-propo-banner.png"
                    alt="Interface Billio - Solution de facturation moderne"
                    width={600}
                    height={400}
                    className="object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi Billio */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Pourquoi <span className="text-blue-600">Billio</span> ?
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Billio a été créé pour simplifier la facturation et le suivi des paiements pour les freelances et petites entreprises en Afrique.</strong>
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Le terme <strong className="text-blue-600">'Billio'</strong> symbolise la rapidité et la simplicité dans la création et l'encaissement de vos factures. Notre mission est de transformer la gestion financière en une expérience fluide et accessible.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Innovation & Simplicité
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous combinons technologie moderne et simplicité d'utilisation pour créer l'expérience de facturation la plus fluide possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Différences avec autres outils */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir <span className="text-blue-600">Billio</span> ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Les avantages qui nous distinguent des autres solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pas besoin de compte complexe
              </h3>
              <p className="text-gray-600 text-sm">
                Créez vos factures instantanément sans inscription fastidieuse
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                100% en ligne et rapide
              </h3>
              <p className="text-gray-600 text-sm">
                Fonctionne parfaitement sur mobile et desktop
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personnalisation facile
              </h3>
              <p className="text-gray-600 text-sm">
                Logo et design adaptés à votre entreprise
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pensé pour l'Afrique
              </h3>
              <p className="text-gray-600 text-sm">
                Adapté aux besoins des freelances locaux
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Points forts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Points Forts</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Des fonctionnalités conçues pour votre réussite
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Créez vos factures en quelques minutes
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Interface intuitive pour générer des factures professionnelles rapidement, adaptée aux réalités du Sénégal.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Compatible avec vos habitudes de paiement
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Orange Money, Wave, espèces - tous vos modes de paiement locaux intégrés dans vos factures.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow relative">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center relative">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <div className="absolute -top-1 -right-1">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Bientôt
                  </span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Bientôt - Historique de vos factures
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Retrouvez et gérez facilement toutes vos factures créées depuis votre tableau de bord.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Design professionnel garanti
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Factures au format standard avec votre logo, informations légales (NINEA, RC) et branding propre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Des entrepreneurs innovants nous font confiance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Call-to-action final */}
      <section className="py-16 sm:py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Commencez gratuitement dès aujourd'hui
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Rejoignez des milliers d'entrepreneurs africains qui utilisent Billio pour simplifier leur facturation.
          </p>
          <Link 
            href="/create-invoice"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-block"
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