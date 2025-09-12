'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 flex-shrink-0">
            Billio
          </Link>
          
          {/* Navigation Desktop - Ordre optimisé selon logique d'usage */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            <Link href="/create-invoice" className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
              Créer une facture
            </Link>
            <Link href="/historique" className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
              Historique
            </Link>
            <Link href="/tarifs" className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
              Tarifs
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-md text-xs xl:text-sm font-medium whitespace-nowrap">
              À propos
            </Link>
          </nav>
          
          {/* CTA Button Desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <Link 
              href="/create-invoice"
              className="bg-blue-600 text-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-xs xl:text-sm whitespace-nowrap"
            >
              Créer ma facture
            </Link>
          </div>

          {/* Menu Mobile/Tablet Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile/Tablet */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/create-invoice" 
                className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Créer une facture
              </Link>
              <Link 
                href="/historique" 
                className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Historique
              </Link>
              <Link 
                href="/tarifs" 
                className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifs
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <div className="pt-2">
                <Link 
                  href="/create-invoice"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Créer ma facture gratuitement
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

