'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  getInvoiceHistory, 
  deleteInvoiceFromHistory, 
  getInvoiceStats 
} from '../../utils/invoiceHistory'
import { generatePDF } from '../../utils/pdfGenerator'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * PAGE HISTORIQUE DES FACTURES - BILLIO
 *
 * Cette page permet aux utilisateurs de :
 * - Consulter l'historique de toutes leurs factures
 * - Voir les détails d'une facture
 * - Retélécharger un PDF
 * - Dupliquer une facture
 * - Supprimer une facture
 * - Exporter l'historique complet
 *
 * Fonctionnalités :
 * - Interface responsive avec cards
 * - Actions tactiles optimisées
 * - Statistiques des factures
 * - Recherche et filtrage
 */

export default function InvoiceHistoryPage() {
  const [invoices, setInvoices] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date') // date, amount, client

  // Charger l'historique au montage du composant
  useEffect(() => {
    loadInvoiceHistory()
  }, [])

  const loadInvoiceHistory = () => {
    try {
      const history = getInvoiceHistory()
      const stats = getInvoiceStats()
      
      setInvoices(history.invoices)
      setStats(stats)
      setLoading(false)
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error)
      setLoading(false)
    }
  }

  // Filtrer et trier les factures
  const filteredAndSortedInvoices = invoices
    .filter(invoice => {
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return (
        invoice.clientName.toLowerCase().includes(term) ||
        invoice.companyName.toLowerCase().includes(term) ||
        invoice.invoiceNumber.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.totalAmount - a.totalAmount
        case 'client':
          return a.clientName.localeCompare(b.clientName)
        case 'date':
        default:
          return new Date(b.createdDate) - new Date(a.createdDate)
      }
    })

  // Supprimer une facture
  const handleDeleteInvoice = (invoiceId) => {
    setInvoiceToDelete(invoiceId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (invoiceToDelete) {
      const success = deleteInvoiceFromHistory(invoiceToDelete)
      if (success) {
        loadInvoiceHistory() // Recharger la liste
        setShowDeleteModal(false)
        setInvoiceToDelete(null)
      }
    }
  }


  // Retélécharger un PDF
  const handleRedownloadPDF = async (invoice) => {
    setIsDownloading(true)
    try {
      const pdfBlob = await generatePDF(invoice.fullFormData)
      
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${invoice.invoiceNumber}.pdf`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      // Tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pdf_redownload', {
          'event_category': 'invoice_history',
          'event_label': 'pdf_redownload'
        })
      }
    } catch (error) {
      console.error('Erreur lors du retéléchargement:', error)
      alert('Erreur lors du retéléchargement du PDF')
    } finally {
      setIsDownloading(false)
    }
  }


  // Formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Formater le montant
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de l'historique...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">
                📋 Historique des Factures
              </h1>
              <p className="text-gray-600">
                Consultez et gérez toutes vos factures créées
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link
                href="/create-invoice"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                + Nouvelle Facture
              </Link>
            </div>
          </div>

          {/* Statistiques */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{stats.totalInvoices}</div>
                <div className="text-sm text-gray-600">Total Factures</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-lg font-bold text-blue-500 whitespace-nowrap">
                  {formatAmount(stats.totalAmount)} FCFA
                </div>
                <div className="text-sm text-gray-600">Montant Total</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">
                  {formatAmount(Math.round(stats.averageAmount))} FCFA
                </div>
                <div className="text-sm text-gray-600">Moyenne</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-500">{stats.thisMonth}</div>
                <div className="text-sm text-gray-600">Ce Mois</div>
              </div>
            </div>
          )}
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher par client, entreprise ou numéro de facture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Trier par Date</option>
                <option value="amount">Trier par Montant</option>
                <option value="client">Trier par Client</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des factures */}
        {filteredAndSortedInvoices.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {invoices.length === 0 ? 'Aucune facture créée' : 'Aucune facture trouvée'}
            </h3>
            <p className="text-gray-600 mb-6">
              {invoices.length === 0 
                ? 'Commencez par créer votre première facture !'
                : 'Essayez de modifier vos critères de recherche.'
              }
            </p>
            {invoices.length === 0 && (
              <Link
                href="/create-invoice"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Créer ma première facture
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* En-tête de la card */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {invoice.invoiceNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(invoice.createdDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-500 whitespace-nowrap">
                        {formatAmount(invoice.totalAmount)} FCFA
                      </div>
                    </div>
                  </div>

                  {/* Informations client */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Client:</span> {invoice.clientName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Entreprise:</span> {invoice.companyName}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleRedownloadPDF(invoice)}
                      disabled={isDownloading}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Télécharger
                    </button>
                    
                    <Link
                      href={`/voir-facture?id=${invoice.id}`}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors text-center flex items-center justify-center"
                    >
                      Voir la facture
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteInvoice(invoice.id)}
                      className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette facture ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
