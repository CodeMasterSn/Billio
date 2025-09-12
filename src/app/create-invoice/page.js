'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'
import { generatePDF } from '../../utils/pdfGenerator'
import { saveInvoiceToHistory } from '../../utils/invoiceHistory'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HistoryDiscoveryBanner from '../../components/HistoryDiscoveryBanner'

/**
 * PAGE DE CRÉATION DE FACTURE - BILLIO
 * 
 * Cette page est le cœur de l'application Billio. Elle permet aux utilisateurs de :
 * - Créer des factures professionnelles
 * - Prévisualiser en temps réel
 * - Télécharger en PDF
 * - Imprimer directement
 * 
 * Architecture :
 * - Split-screen : formulaire à gauche, aperçu à droite
 * - État React centralisé pour toutes les données de facture
 * - Calculs automatiques des totaux
 * - Gestion des logos d'entreprise
 * - Support des paiements mobiles africains (Orange Money, Wave)
 */

export default function CreateInvoicePage() {
  // Génération automatique du nom de facture basé sur la date actuelle
  const generateInvoiceName = () => {
    const today = new Date()
    const month = today.toLocaleDateString('fr-FR', { month: 'long' })
    const year = today.getFullYear()
    return `Facture ${month} ${year}`
  }

  const [invoiceData, setInvoiceData] = useState({
    // FACTURE
    invoice: {
      name: generateInvoiceName(),
      date: new Date().toISOString().split('T')[0],
      items: [
        {
          description: '',
          quantity: '',
          price: 0
        }
      ],
      notes: 'Merci pour votre confiance !'
    },
    
    // MON ENTREPRISE
    company: {
      logo: null,
      name: '',
      phone: '',
      email: '',
      address: '',
      mobileMoneyService: '',
      mobileMoneyNumber: ''
    },
    
    // CLIENT
    client: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    
    // Calculs automatiques
    total: 0
  })

  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState('') // 'download' ou 'print'

  // Gestion de la touche Escape pour fermer le modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  // Calcul automatique du total - se déclenche à chaque modification des items
  // Cette fonction surveille les changements dans les articles et recalcule automatiquement le total
  useEffect(() => {
    const total = invoiceData.invoice.items.reduce((sum, item) => {
      const quantity = item.quantity === '' ? 0 : (item.quantity || 0)
      const price = item.price || 0
      return sum + (price * quantity)
    }, 0)
    
    setInvoiceData(prev => ({
      ...prev,
      total
    }))
  }, [invoiceData.invoice.items])

  // Fonction pour générer le HTML de la facture pour l'impression (identique à l'aperçu)
  const generateInvoiceHTMLForPrint = (invoiceData) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; background: white; line-height: 1.4; color: #333; position: relative;">
        <!-- Motifs décoratifs identiques à l'aperçu -->
        <div style="position: absolute; top: 0; left: 0; width: 32px; height: 32px; border-left: 4px solid #2563eb; border-top: 4px solid #2563eb; border-radius: 8px 0 0 0;"></div>
        <div style="position: absolute; top: 0; right: 0; width: 32px; height: 32px; border-right: 4px solid #2563eb; border-top: 4px solid #2563eb; border-radius: 0 8px 0 0;"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 32px; height: 32px; border-left: 4px solid #2563eb; border-bottom: 4px solid #2563eb; border-radius: 0 0 0 8px;"></div>
        <div style="position: absolute; bottom: 0; right: 0; width: 32px; height: 32px; border-right: 4px solid #2563eb; border-bottom: 4px solid #2563eb; border-radius: 0 0 8px 0;"></div>
        
        <!-- Motifs décoratifs sur les côtés -->
        <div style="position: absolute; top: 50%; left: 0; width: 24px; height: 24px; border-left: 2px solid #93c5fd; border-radius: 50%; transform: translateY(-50%);"></div>
        <div style="position: absolute; top: 50%; right: 0; width: 24px; height: 24px; border-right: 2px solid #93c5fd; border-radius: 50%; transform: translateY(-50%);"></div>
        <div style="position: absolute; top: 0; left: 50%; width: 24px; height: 24px; border-top: 2px solid #93c5fd; border-radius: 50%; transform: translateX(-50%);"></div>
        <div style="position: absolute; bottom: 0; left: 50%; width: 24px; height: 24px; border-bottom: 2px solid #93c5fd; border-radius: 50%; transform: translateX(-50%);"></div>

        <div style="padding: 40px; position: relative; z-index: 10;">
          <!-- En-tête -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div style="width: 60px; height: 60px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                  ${invoiceData.company?.logo ? 
                    `<img src="${invoiceData.company.logo}" alt="Logo entreprise" style="width: 100%; height: 100%; object-fit: contain;" />` : 
                    `<span style="color: #333; font-size: 16px; font-weight: bold;">${invoiceData.company?.name ? invoiceData.company.name.substring(0, 2).toUpperCase() : 'LO'}</span>`
                  }
                </div>
                <h1 style="margin: 0; color: #333; font-size: 18px; font-weight: 600;">${invoiceData.company?.name || 'Votre Entreprise'}</h1>
              </div>
              <p style="margin: 3px 0; color: #333; font-size: 13px;">${invoiceData.company?.address || 'Adresse non renseignée'}</p>
              <p style="margin: 3px 0; color: #333; font-size: 13px;">${invoiceData.company?.phone || 'Téléphone non renseigné'}</p>
              <p style="margin: 3px 0; color: #333; font-size: 13px;">${invoiceData.company?.email || 'Email non renseigné'}</p>
            </div>
            
            <div style="text-align: right; flex-shrink: 0; width: 256px; max-width: none;">
              <h2 style="font-size: 32px; font-weight: bold; color: #2563eb; margin: 0 0 24px 0;">FACTURE</h2>
              
              <!-- Informations facture avec cadre esthétique -->
              <div style="position: relative; margin-bottom: 20px;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #eff6ff; border-radius: 8px; z-index: 1;"></div>
                <div style="position: absolute; top: 0; left: 10px; bottom: 0; width: 4px; background-color: #2563eb; border-radius: 0 2px 2px 0; z-index: 2;"></div>
                <div style="position: relative; z-index: 3; padding: 16px 16px 16px 25px; text-align: left;">
                  <div style="margin-bottom: 8px;">
                    <strong style="color: #2563eb; font-size: 14px;">Nom de facture:</strong>
                    <strong style="color: #2563eb; font-size: 14px; margin-left: 30px;">Date:</strong>
                  </div>
                  <div style="word-wrap: break-word; overflow-wrap: anywhere; hyphens: auto;">
                    <span style="color: #000; font-size: 14px;">${invoiceData.invoice?.name || 'Facture sans nom'}</span>
                    <span style="color: #000; font-size: 14px; margin-left: 30px;">${new Date(invoiceData.invoice?.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations parties prenantes -->
          <div style="margin-bottom: 40px;">
            <div>
              <h3 style="margin: 0 0 12px 0; color: #333; font-size: 14px; font-weight: 600;">Facturé à</h3>
              ${invoiceData.client?.name ? `
                <p style="margin: 4px 0; color: #333; font-size: 13px; font-weight: 600;">${invoiceData.client.name}</p>
                <p style="margin: 4px 0; color: #333; font-size: 13px;">${invoiceData.client.address || 'Adresse non renseignée'}</p>
                ${invoiceData.client.phone ? `<p style="margin: 4px 0; color: #333; font-size: 13px;">${invoiceData.client.phone}</p>` : ''}
              ` : '<p style="margin: 4px 0; color: #999; font-style: italic; font-size: 13px;">Informations client non renseignées</p>'}
            </div>
          </div>

          <!-- Tableau des articles/services -->
          ${invoiceData.invoice?.items && invoiceData.invoice.items.length > 0 ? `
            <div style="margin-bottom: 30px;">
              <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
                <thead>
                  <tr style="background: #2563eb; color: white;">
                    <th style="border: 0; padding: 12px 8px; text-align: left; font-weight: 600; font-size: 13px; width: 40%;">Désignation</th>
                    <th style="border: 0; padding: 12px 8px; text-align: right; font-weight: 600; font-size: 13px; width: 20%;">Prix unitaire</th>
                    <th style="border: 0; padding: 12px 8px; text-align: right; font-weight: 600; font-size: 13px; width: 20%;">Qté</th>
                    <th style="border: 0; padding: 12px 8px; text-align: right; font-weight: 600; font-size: 13px; width: 20%;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceData.invoice.items.map((item, index) => `
                    <tr style="background: ${index % 2 === 0 ? '#eff6ff' : '#dbeafe'};">
                      <td style="border: 0; padding: 12px 8px; color: #333; font-size: 13px; word-wrap: break-word; overflow-wrap: anywhere;">${item.description || 'Non renseigné'}</td>
                      <td style="border: 0; padding: 12px 8px; text-align: right; color: #333; font-size: 13px;">${(item.price || 0).toLocaleString('fr-FR')} FCFA</td>
                      <td style="border: 0; padding: 12px 8px; text-align: right; color: #333; font-size: 13px;">${item.quantity === '' ? '-' : (item.quantity || '-')}</td>
                      <td style="border: 0; padding: 12px 8px; text-align: right; font-weight: 600; color: #333; font-size: 13px;">${((item.price || 0) * (item.quantity === '' ? 0 : (item.quantity || 0))).toLocaleString('fr-FR')} FCFA</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          <!-- Résumé des montants -->
          <div style="margin-bottom: 30px; display: flex; justify-content: flex-end;">
            <div style="width: 250px;">
              <table style="width: 100%;">
                <tbody>
                  <tr>
                    <td style="padding: 6px 8px; font-size: 13px; color: #333;">SOUS-TOTAL</td>
                    <td style="padding: 6px 8px; text-align: right; font-weight: 500; color: #333; font-size: 13px;">${(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                  <tr style="background: #2563eb; color: white;">
                    <td style="padding: 12px 8px; font-weight: 700; font-size: 14px; color: white;">TOTAL DÛ</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 700; font-size: 14px; color: white;">${(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pied de page -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <div style="font-size: 13px; color: #333;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Informations de paiement</p>
              ${invoiceData.company?.bank ? `<p style="margin: 4px 0;">Banque: ${invoiceData.company.bank}</p>` : ''}
              ${invoiceData.company?.mobileMoneyService && invoiceData.company.mobileMoneyService !== 'Paiement espèce' && invoiceData.company.mobileMoneyNumber ? 
                `<p style="margin: 4px 0;">Paiement fait avec ${invoiceData.company.mobileMoneyService}: ${invoiceData.company.mobileMoneyNumber}</p>` : ''}
              ${invoiceData.company?.mobileMoneyService === 'Paiement espèce' ? 
                `<p style="margin: 4px 0;">Paiement fait en espèce</p>` : ''}
              ${invoiceData.invoice?.notes ? `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0;">${invoiceData.invoice.notes}</p>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Branding Billio -->
          <div style="text-align: center; margin-top: 30px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              <span style="display: inline-flex; align-items: center;">
                Créé avec <span style="color: #2563eb; font-weight: 600; font-family: 'Courier New', monospace; margin-left: 4px;">Billio</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    `
  }

  // Fonction pour mettre à jour les données
  const updateInvoiceData = (section, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Fonction pour mettre à jour les items
  const updateItem = (index, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        items: prev.invoice.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }))
  }

  // Ajouter un item
  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        items: [...prev.invoice.items, {
          description: '',
          quantity: '',
          price: 0
        }]
      }
    }))
  }

  // Supprimer un item
  const removeItem = (index) => {
    if (invoiceData.invoice.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          items: prev.invoice.items.filter((_, i) => i !== index)
        }
      }))
    }
  }

  // Gestion du logo
  const handleLogoUpload = (logoData) => {
    updateInvoiceData('company', 'logo', logoData)
  }

  const handleLogoRemove = () => {
    updateInvoiceData('company', 'logo', null)
  }

  // Téléchargement PDF - Fonction principale pour générer et télécharger le PDF
  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Générer le PDF via notre utilitaire pdfGenerator
      const pdfBlob = await generatePDF(invoiceData)
      
      // Créer un lien de téléchargement temporaire
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      
      // Nommer le fichier avec le nom de la facture ou une date par défaut
      const fileName = invoiceData.invoice.name 
        ? `${invoiceData.invoice.name}.pdf`
        : `Facture_${new Date().toISOString().split('T')[0]}.pdf`
      
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      // Sauvegarder automatiquement dans l'historique
      const savedInvoiceId = saveInvoiceToHistory(invoiceData)
      if (savedInvoiceId) {
        console.log('Facture sauvegardée dans l\'historique:', savedInvoiceId)
        
        // Déclencher un événement personnalisé pour mettre à jour le bandeau
        window.dispatchEvent(new CustomEvent('invoiceSaved', { 
          detail: { invoiceId: savedInvoiceId } 
        }))
      }
      
      // Afficher le modal de succès
      setModalMessage('PDF téléchargé avec succès !')
      setModalType('download')
      setShowModal(true)
      
      // Tracking Google Analytics si disponible
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pdf_download', {
          'event_category': 'invoice',
          'event_label': 'pdf_download'
        })
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      alert('Erreur lors du téléchargement du PDF')
    } finally {
      setIsDownloading(false)
    }
  }

  // Impression
  const handlePrint = () => {
    setIsPrinting(true)
    try {
      // Créer une nouvelle fenêtre pour l'impression
      const printWindow = window.open('', '_blank', 'width=800,height=600')
      const invoiceHTML = generateInvoiceHTMLForPrint(invoiceData)
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Facture - ${invoiceData.invoice?.name || 'Facture'}</title>
            <meta charset="utf-8">
            <style>
              @media print {
                body { margin: 0; padding: 0; }
                * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
                @page { 
                  margin: 0 !important; 
                  size: A4;
                }
                /* Masquer complètement les en-têtes et pieds de page */
                @page :first { margin-top: 0 !important; }
                @page :left { margin-left: 0 !important; }
                @page :right { margin-right: 0 !important; }
                @page :last { margin-bottom: 0 !important; }
              }
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: white;
                line-height: 1.4;
                color: #333;
              }
            </style>
          </head>
          <body>
            ${invoiceHTML}
          </body>
        </html>
      `)
      
      printWindow.document.close()
      
      // Attendre que le contenu soit chargé puis imprimer
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
        // Fermer la fenêtre après un délai
        setTimeout(() => {
          printWindow.close()
        }, 1000)
      }, 500)
      
      setModalMessage('Facture envoyée à l\'imprimante !')
      setModalType('print')
      setShowModal(true)
      
      // Tracking GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'print', {
          'event_category': 'invoice',
          'event_label': 'print'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'impression:', error)
      alert('Erreur lors de l\'impression')
    } finally {
      setIsPrinting(false)
    }
  }

  // Reset du formulaire
  const resetForm = () => {
    setInvoiceData({
      invoice: {
        name: generateInvoiceName(),
        date: new Date().toISOString().split('T')[0],
        items: [
          {
            description: '',
            quantity: '',
            price: 0
          }
        ],
        notes: 'Merci pour votre confiance !'
      },
      company: {
        logo: null,
        name: '',
        phone: '',
        email: '',
        address: '',
        mobileMoneyService: '',
        mobileMoneyNumber: ''
      },
      client: {
        name: '',
        address: '',
        phone: '',
        email: ''
      },
      total: 0
    })
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Bandeau de découverte historique */}
          <HistoryDiscoveryBanner />
          
          {/* En-tête */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Créer une facture
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Remplissez les informations ci-dessous pour générer votre facture professionnelle
            </p>
          </div>

          {/* Layout split screen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire - Gauche */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informations de la facture
              </h2>
              
              <InvoiceForm 
                invoiceData={invoiceData}
                onUpdate={updateInvoiceData}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onLogoUpload={handleLogoUpload}
                onLogoRemove={handleLogoRemove}
              />
            </div>

            {/* Aperçu - Droite */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Aperçu de la facture
              </h2>
              
              <InvoicePreview invoiceData={invoiceData} />
              
              {/* Boutons d'action */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDownloading ? 'Téléchargement...' : 'Télécharger PDF'}
                </button>
                
                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPrinting ? 'Impression...' : 'Imprimer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de succès */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative overflow-hidden animate-scaleIn">
            {/* Motifs décoratifs en arrière-plan */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            
            <div className="relative z-10 p-8">
              {/* Header avec icône animée */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounceIn">
                  <svg 
                    className="w-10 h-10 text-white animate-checkmark" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      strokeDasharray: '24',
                      strokeDashoffset: '24',
                      animation: 'drawCheckmark 0.8s ease-in-out 0.3s forwards'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 
                  id="modal-title"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3 animate-fadeInUp"
                >
                  {modalType === 'print' ? 'Facture envoyée à l\'imprimante !' : 'Facture téléchargée avec succès !'}
                </h3>
                
                <p 
                  id="modal-description"
                  className="text-gray-600 text-lg leading-relaxed mb-2 animate-fadeInUp animation-delay-200"
                >
                  {modalType === 'print' 
                    ? 'Votre facture a été envoyée à l\'imprimante. Vérifiez votre imprimante !' 
                    : 'Votre facture professionnelle est prête. Bonne continuation avec votre business !'
                  }
                </p>
                
                <p className="text-blue-600 font-medium text-sm animate-fadeInUp animation-delay-400">
                  Merci de faire confiance à Billio
                </p>
              </div>
              
              {/* Footer avec boutons */}
              <div className="flex flex-col sm:flex-row gap-3 animate-fadeInUp animation-delay-600">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Créer une autre facture
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-4 text-gray-600 hover:text-gray-800 font-medium text-lg transition-all duration-300 hover:bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}