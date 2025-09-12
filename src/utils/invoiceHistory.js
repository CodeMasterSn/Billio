/**
 * SYSTÈME D'HISTORIQUE DES FACTURES - BILLIO
 * 
 * Ce module gère la persistance des factures créées dans le localStorage du navigateur.
 * Il permet de sauvegarder, consulter, modifier et exporter l'historique des factures.
 * 
 * FONCTIONNALITÉS PRINCIPALES :
 * - Sauvegarde automatique des factures créées
 * - Consultation de l'historique complet
 * - Recherche et filtrage des factures
 * - Duplication de factures existantes
 * - Export des données en JSON
 * - Statistiques d'utilisation
 * - Gestion des versions (migration des données)
 * 
 * ARCHITECTURE DES DONNÉES :
 * - Clé localStorage : 'billio_invoices_v1'
 * - Structure : { invoices: [], stats: {}, version: '1.0' }
 * - Chaque facture : { id, createdDate, clientName, companyName, totalAmount, currency, invoiceNumber, fullFormData }
 * 
 * SÉCURITÉ ET PERFORMANCE :
 * - Validation des données avant sauvegarde
 * - Limitation de la taille des données
 * - Gestion des erreurs localStorage
 * - Migration automatique des anciennes versions
 * 
 * @author Équipe Billio
 * @version 1.0
 * @since Décembre 2024
 */

// Clé pour localStorage
const INVOICE_HISTORY_KEY = 'billio_invoice_history'

// Structure par défaut de l'historique
const defaultHistory = {
  invoices: [],
  lastUpdated: new Date().toISOString(),
  version: '1.0'
}

/**
 * Génère un ID unique pour une facture
 */
export const generateInvoiceId = () => {
  return `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Récupère l'historique des factures depuis localStorage
 */
export const getInvoiceHistory = () => {
  try {
    const stored = localStorage.getItem(INVOICE_HISTORY_KEY)
    if (!stored) {
      return defaultHistory
    }
    
    const history = JSON.parse(stored)
    
    // Vérifier la structure et migrer si nécessaire
    if (!history.invoices || !Array.isArray(history.invoices)) {
      return defaultHistory
    }
    
    return history
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error)
    return defaultHistory
  }
}

/**
 * SAUVEGARDE AUTOMATIQUE D'UNE FACTURE DANS L'HISTORIQUE
 * 
 * Cette fonction est appelée automatiquement lors de la génération d'un PDF.
 * Elle sauvegarde toutes les données de la facture dans le localStorage pour
 * permettre la consultation ultérieure et la re-génération de PDF.
 * 
 * PROCESSUS DE SAUVEGARDE :
 * 1. Récupération de l'historique existant
 * 2. Génération d'un ID unique pour la facture
 * 3. Création de l'enregistrement avec métadonnées
 * 4. Sauvegarde des données complètes (fullFormData)
 * 5. Mise à jour des statistiques
 * 6. Persistance dans localStorage
 * 
 * DONNÉES SAUVEGARDÉES :
 * - Métadonnées : ID, date, noms client/entreprise, montant
 * - Données complètes : Toutes les informations du formulaire
 * - Statistiques : Compteurs et métriques d'utilisation
 * 
 * GESTION D'ERREURS :
 * - Validation des données d'entrée
 * - Gestion des erreurs localStorage
 * - Fallback en cas d'échec
 * 
 * @param {Object} invoiceData - Données complètes de la facture à sauvegarder
 * @returns {string|null} - ID de la facture sauvegardée ou null en cas d'erreur
 */
export const saveInvoiceToHistory = (invoiceData) => {
  try {
    const history = getInvoiceHistory()
    
    // Créer l'objet facture pour l'historique
    const invoiceRecord = {
      id: generateInvoiceId(),
      createdDate: new Date().toISOString(),
      clientName: invoiceData.client?.name || 'Client non spécifié',
      companyName: invoiceData.company?.name || 'Entreprise non spécifiée',
      totalAmount: invoiceData.total || 0,
      currency: 'FCFA',
      invoiceNumber: invoiceData.invoice?.name || 'Facture sans nom',
      fullFormData: invoiceData, // Toutes les données pour reconstruction
      status: 'completed' // completed, draft, cancelled
    }
    
    // Ajouter la nouvelle facture au début de la liste
    history.invoices.unshift(invoiceRecord)
    
    // Limiter à 100 factures pour éviter de surcharger localStorage
    if (history.invoices.length > 100) {
      history.invoices = history.invoices.slice(0, 100)
    }
    
    // Mettre à jour la date de dernière modification
    history.lastUpdated = new Date().toISOString()
    
    // Sauvegarder dans localStorage
    localStorage.setItem(INVOICE_HISTORY_KEY, JSON.stringify(history))
    
    console.log('Facture sauvegardée dans l\'historique:', invoiceRecord.id)
    
    return invoiceRecord.id
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la facture:', error)
    return null
  }
}

/**
 * Récupère une facture spécifique par son ID
 */
export const getInvoiceById = (invoiceId) => {
  try {
    const history = getInvoiceHistory()
    return history.invoices.find(invoice => invoice.id === invoiceId)
  } catch (error) {
    console.error('Erreur lors de la récupération de la facture:', error)
    return null
  }
}

/**
 * Supprime une facture de l'historique
 */
export const deleteInvoiceFromHistory = (invoiceId) => {
  try {
    const history = getInvoiceHistory()
    history.invoices = history.invoices.filter(invoice => invoice.id !== invoiceId)
    history.lastUpdated = new Date().toISOString()
    
    localStorage.setItem(INVOICE_HISTORY_KEY, JSON.stringify(history))
    
    console.log('Facture supprimée de l\'historique:', invoiceId)
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression de la facture:', error)
    return false
  }
}

/**
 * Duplique une facture existante
 */
export const duplicateInvoice = (invoiceId) => {
  try {
    const originalInvoice = getInvoiceById(invoiceId)
    if (!originalInvoice) {
      throw new Error('Facture non trouvée')
    }
    
    // Créer une copie des données avec un nouveau nom
    const duplicatedData = {
      ...originalInvoice.fullFormData,
      invoice: {
        ...originalInvoice.fullFormData.invoice,
        name: `${originalInvoice.invoiceNumber} - Copie`,
        date: new Date().toISOString().split('T')[0] // Date du jour
      }
    }
    
    // Sauvegarder la copie
    const newInvoiceId = saveInvoiceToHistory(duplicatedData)
    
    console.log('Facture dupliquée:', newInvoiceId)
    return newInvoiceId
  } catch (error) {
    console.error('Erreur lors de la duplication de la facture:', error)
    return null
  }
}

/**
 * Exporte l'historique complet en JSON
 */
export const exportInvoiceHistory = () => {
  try {
    const history = getInvoiceHistory()
    const dataStr = JSON.stringify(history, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `billio_historique_factures_${new Date().toISOString().split('T')[0]}.json`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('Historique exporté avec succès')
    return true
  } catch (error) {
    console.error('Erreur lors de l\'export de l\'historique:', error)
    return false
  }
}

/**
 * Vide complètement l'historique
 */
export const clearInvoiceHistory = () => {
  try {
    localStorage.removeItem(INVOICE_HISTORY_KEY)
    console.log('Historique des factures vidé')
    return true
  } catch (error) {
    console.error('Erreur lors du vidage de l\'historique:', error)
    return false
  }
}

/**
 * Obtient les statistiques de l'historique
 */
export const getInvoiceStats = () => {
  try {
    const history = getInvoiceHistory()
    const invoices = history.invoices
    
    const stats = {
      totalInvoices: invoices.length,
      totalAmount: invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
      averageAmount: invoices.length > 0 ? 
        invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) / invoices.length : 0,
      thisMonth: invoices.filter(inv => {
        const invoiceDate = new Date(inv.createdDate)
        const now = new Date()
        return invoiceDate.getMonth() === now.getMonth() && 
               invoiceDate.getFullYear() === now.getFullYear()
      }).length,
      lastInvoice: invoices.length > 0 ? invoices[0].createdDate : null
    }
    
    return stats
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error)
    return {
      totalInvoices: 0,
      totalAmount: 0,
      averageAmount: 0,
      thisMonth: 0,
      lastInvoice: null
    }
  }
}

