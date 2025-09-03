'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import { generatePDF, numberToWords, formatDate } from '../../utils/pdfGenerator'

export default function CreateInvoicePage() {
  const [invoiceData, setInvoiceData] = useState({
    // Infos entreprise (préremplies) - DABO LOGISTIQUES
    company: {
      name: 'DABO LOGISTIQUES',
      activity: 'Transport, Maritime, Fret Aérien, Conseils',
      address: 'Yoff Océan – Dakar, Sénégal',
      phone: '+221 77 437 65 21',
      email: 'dabotrans@gmail.com',
      ninea: '006059845 1Y 1',
      rc: 'SN DKR 2019A 20129',
      location: 'Zone Fret Aéroport International Blaise Diagne'
    },
    // Logo personnalisé
    customLogo: null,
    // Infos facture
    invoiceNumber: 'FACT-2024-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceName: 'Facture',
    // Client
    client: {
      name: '',
      address: '',
      city: '',
      country: ''
    },
    // Expédition
    shipment: {
      waybillNumber: '',
      brand: '',
      grossWeight: ''
    },
    // Débours
    debours: [],
    // Interventions taxables
    taxableInterventions: [],
    // Totaux
    subtotal1: 0,
    subtotal2: 0,
    total: 0
  })

  // États pour les modales et loaders
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Calcul automatique des totaux
  useEffect(() => {
    const subtotal1 = invoiceData.debours.reduce((sum, item) => sum + (item.amount || 0), 0)
    const subtotal2 = invoiceData.taxableInterventions.reduce((sum, item) => sum + (item.amount || 0), 0)
    const total = subtotal1 + subtotal2
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal1,
      subtotal2,
      total
    }))
  }, [invoiceData.debours, invoiceData.taxableInterventions])

  // Génération automatique du numéro de facture
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: `FACT-${year}-${month}${day}-${random}`
    }))
  }, [])

  const handleDataChange = (section, field, value) => {
    // Si on a seulement 2 paramètres, le deuxième est la valeur
    if (value === undefined) {
      setInvoiceData(prev => ({
        ...prev,
        [section]: field
      }))
    } else {
      // Si on a 3 paramètres, c'est section.field = value
      setInvoiceData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    }
  }

  const handleArrayChange = (section, index, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addArrayItem = (section) => {
    const newItem = section === 'debours' 
      ? { description: '', amount: 0 }
      : { description: '', quantity: 1, unitPrice: 0, amount: 0 }
    
    setInvoiceData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }))
  }

  const removeArrayItem = (section, index) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  // Gestion du logo personnalisé
  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInvoiceData(prev => ({
          ...prev,
          customLogo: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setInvoiceData(prev => ({
      ...prev,
      customLogo: null
    }))
  }

  // Fonction pour télécharger le PDF
  const handleDownloadPDF = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const pdf = await generatePDF(invoiceData)
      const blob = pdf.output('blob')
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `facture-${invoiceData.invoiceNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      
      setMessage('PDF téléchargé avec succès !')
      setShowModal(true)
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      setMessage('Erreur lors de la génération du PDF')
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour imprimer le PDF
  const handlePrintPDF = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const pdf = await generatePDF(invoiceData)
      const blob = pdf.output('blob')
      const url = URL.createObjectURL(blob)
      
      const printWindow = window.open(url, '_blank')
      printWindow.onload = () => {
        printWindow.print()
        printWindow.onafterprint = () => {
          printWindow.close()
          URL.revokeObjectURL(url)
        }
      }
      
      setMessage('Impression lancée avec succès !')
      setShowModal(true)
    } catch (error) {
      console.error('Erreur lors de l\'impression:', error)
      setMessage('Erreur lors de la génération du PDF')
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Fermer la modale
  const closeModal = () => {
    setShowModal(false)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">DABO LOGISTIQUES</Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/create-invoice" className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Créer une facture
              </Link>
              <Link href="/history" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Historique
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire côté gauche */}
          <div>
            <InvoiceForm 
              invoiceData={invoiceData}
              onDataChange={handleDataChange}
              onArrayChange={handleArrayChange}
              onAddArrayItem={addArrayItem}
              onRemoveArrayItem={removeArrayItem}
              onLogoUpload={handleLogoUpload}
              onRemoveLogo={removeLogo}
            />
          </div>

          {/* Aperçu côté droit */}
          <div>
            <InvoicePreview invoiceData={invoiceData} />
            
            {/* Boutons d'action */}
            <div className="mt-6 space-y-4">
              {/* Bouton Télécharger PDF */}
              <button 
                onClick={handleDownloadPDF}
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Télécharger PDF
                  </>
                )}
              </button>

              {/* Bouton Imprimer PDF */}
              <button 
                onClick={handlePrintPDF}
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimer PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale de feedback */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${message.includes('succès') ? 'bg-green-100' : 'bg-red-100'}`}>
                {message.includes('succès') ? (
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                {message.includes('succès') ? 'Succès !' : 'Erreur'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
