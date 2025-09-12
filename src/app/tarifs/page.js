'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * PAGE TARIFS BILLIO - TEMPORAIREMENT MASQUÉE
 * 
 * Cette page est temporairement inaccessible pendant la finalisation
 * des tarifs et offres définitives.
 */

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icône de construction */}
          <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          
          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page en construction
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            Nous finalisons actuellement nos tarifs et offres. 
            Cette page sera bientôt disponible avec des prix adaptés au marché sénégalais.
          </p>
          
          {/* Message informatif */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              💡 Bonne nouvelle !
            </h2>
            <p className="text-blue-800">
              Billio reste <strong>100% gratuit</strong> pour créer vos factures. 
              Aucun abonnement requis pour l'instant.
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-invoice"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Créer une facture gratuitement
            </Link>
            
            <Link
              href="/about"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              En savoir plus sur Billio
            </Link>
          </div>
          
          {/* Contact */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Des questions sur nos futurs tarifs ?
            </p>
            <a 
              href="mailto:billio.africa@gmail.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}