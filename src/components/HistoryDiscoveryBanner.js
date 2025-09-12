'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/**
 * BANDEAU DE DÉCOUVERTE HISTORIQUE - BILLIO
 * 
 * Ce composant affiche un bandeau informatif sur la page "Créer une facture"
 * pour guider les utilisateurs vers la fonctionnalité d'historique des factures.
 * 
 * LOGIQUE D'AFFICHAGE :
 * - S'affiche uniquement si l'utilisateur a créé au moins 1 facture
 * - Disparaît automatiquement après 1 minute
 * - Ne s'affiche qu'UNE SEULE FOIS par utilisateur (marqué en localStorage)
 * - Design non-intrusif mais visible
 * 
 * OPTIMISATIONS UX :
 * - Responsive mobile avec stack vertical
 * - Bouton d'action clair et accessible
 * - Disparition automatique après 1 minute
 * - Affichage unique par utilisateur pour éviter la répétition
 * 
 * @author Équipe Billio
 * @version 1.0
 * @since Décembre 2024
 */

export default function HistoryDiscoveryBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Fonction pour vérifier l'état du banner
  const checkBannerState = () => {
    try {
      // Vérifier si le banner a déjà été affiché une fois (fermé définitivement ou disparu automatiquement)
      const bannerShown = localStorage.getItem('billio_history_banner_shown')
      if (bannerShown === 'true') {
        setIsVisible(false)
        setIsLoaded(true)
        return
      }

      // Vérifier si l'utilisateur a des factures dans l'historique
      const historyData = JSON.parse(localStorage.getItem('billio_invoice_history') || '{}')
      const invoices = historyData.invoices || []
      const hasInvoices = invoices && invoices.length > 0

      // Debug temporaire
      console.log('HistoryDiscoveryBanner - Données trouvées:', {
        historyData,
        invoicesCount: invoices.length,
        hasInvoices,
        bannerShown: localStorage.getItem('billio_history_banner_shown')
      })

      // Afficher le banner seulement si l'utilisateur a des factures ET qu'il n'a jamais été affiché
      setIsVisible(hasInvoices)
      setIsLoaded(true)
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'historique:', error)
      setIsVisible(false)
      setIsLoaded(true)
    }
  }

  // Vérifier l'état au montage du composant
  useEffect(() => {
    checkBannerState()
  }, [])

  // Disparition automatique après 1 minute
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        // Marquer le banner comme affiché pour qu'il ne revienne plus jamais
        localStorage.setItem('billio_history_banner_shown', 'true')
        setIsVisible(false)
        console.log('Bandeau - Disparition automatique après 1 minute et marqué comme affiché')
      }, 60000) // 60 secondes

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Écouter les changements dans localStorage et les événements personnalisés
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'billio_invoice_history') {
        checkBannerState()
      }
    }

    const handleInvoiceSaved = () => {
      console.log('Événement invoiceSaved reçu - mise à jour du bandeau')
      checkBannerState()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('invoiceSaved', handleInvoiceSaved)
    
    // Vérifier périodiquement (pour les changements dans le même onglet)
    const interval = setInterval(checkBannerState, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('invoiceSaved', handleInvoiceSaved)
      clearInterval(interval)
    }
  }, [])


  // Ne pas afficher si pas encore chargé ou si pas visible
  if (!isLoaded || !isVisible) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 animate-in slide-in-from-top-2 duration-300">
      {/* Contenu du bandeau */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Section informative */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Icône */}
          <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          {/* Texte informatif */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-sm md:text-base">
              Retrouvez vos factures facilement
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Accédez à l'historique de toutes vos factures créées
            </p>
          </div>
        </div>
        
        {/* Bouton d'action - toujours visible */}
        <div className="flex-shrink-0">
          <Link 
            href="/historique"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap w-full md:w-auto text-center block"
          >
            Voir l'historique
          </Link>
        </div>
      </div>
    </div>
  )
}
