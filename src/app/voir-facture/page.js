'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getInvoiceById } from '../../utils/invoiceHistory'
import { generatePDF } from '../../utils/pdfGenerator'
import InvoicePreview from '../create-invoice/components/InvoicePreview'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * PAGE VISUALISATION FACTURE - BILLIO
 *
 * Cette page permet de visualiser une facture complète en mode lecture seule.
 * L'utilisateur peut voir tous les détails et télécharger/imprimer la facture.
 *
 * Fonctionnalités :
 * - Affichage complet de la facture
 * - Téléchargement PDF
 * - Impression directe
 * - Interface responsive
 * - Mode lecture seule (pas de modification)
 * - Récupération de l'ID via paramètres URL
 */

export default function VoirFacture() {
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)

  useEffect(() => {
    // Récupérer l'ID depuis les paramètres URL
    const urlParams = new URLSearchParams(window.location.search)
    const invoiceId = urlParams.get('id')
    
    if (invoiceId) {
      loadInvoice(invoiceId)
    } else {
      setLoading(false)
    }
  }, [])

  const loadInvoice = (invoiceId) => {
    try {
      const invoiceData = getInvoiceById(invoiceId)
      if (invoiceData) {
        setInvoice(invoiceData)
      } else {
        console.error('Facture non trouvée')
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la facture:', error)
    } finally {
      setLoading(false)
    }
  }

  // Télécharger le PDF
  const handleDownloadPDF = async () => {
    if (!invoice) return
    
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
        gtag('event', 'pdf_download_view', {
          'event_category': 'invoice_view',
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

  // Imprimer la facture
  const handlePrint = () => {
    if (!invoice) return
    
    setIsPrinting(true)
    try {
      // Utiliser la fonction d'impression du composant InvoicePreview
      const printWindow = window.open('', '_blank', 'width=800,height=600')
      
      // Créer un élément temporaire pour générer le HTML d'impression
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '0'
      
      // Utiliser le composant InvoicePreview pour générer le HTML
      const previewHTML = generatePreviewHTML(invoice.fullFormData)
      
      printWindow.document.write(previewHTML)
      printWindow.document.close()
      printWindow.focus()
      
      // Attendre que le contenu soit chargé puis imprimer
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
        setIsPrinting(false)
      }, 500)
      
      // Tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'invoice_print_view', {
          'event_category': 'invoice_view',
          'event_label': 'print'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'impression:', error)
      alert('Erreur lors de l\'impression')
      setIsPrinting(false)
    }
  }

  // Générer le HTML d'aperçu (identique au composant InvoicePreview)
  const generatePreviewHTML = (invoiceData) => {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Facture ${invoiceData.invoice?.name || 'Sans nom'}</title>
        <style>
          @media print {
            @page { margin: 0; size: A4; }
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
            * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #333;
            line-height: 1.4;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
          }
          .company-info {
            flex: 1;
          }
          .company-info img {
            max-height: 80px;
            margin-bottom: 20px;
          }
          .company-info h3 {
            margin: 0 0 8px 0;
            color: #333;
            font-size: 16px;
            font-weight: 600;
          }
          .company-info p {
            margin: 4px 0;
            color: #333;
            font-size: 14px;
          }
          .invoice-info {
            text-align: right;
            flex-shrink: 0;
            width: 256px;
            max-width: none;
          }
          .invoice-title {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            margin: 0 0 24px 0;
          }
          .invoice-details {
            position: relative;
            margin-bottom: 20px;
          }
          .invoice-details::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #eff6ff;
            border-radius: 8px;
            z-index: 1;
          }
          .invoice-details::after {
            content: '';
            position: absolute;
            top: 0;
            left: 10px;
            bottom: 0;
            width: 4px;
            background-color: #2563eb;
            border-radius: 0 2px 2px 0;
            z-index: 2;
          }
          .invoice-details-content {
            position: relative;
            z-index: 3;
            padding: 16px 16px 16px 25px;
            text-align: left;
          }
          .invoice-details-content div:first-child {
            margin-bottom: 8px;
          }
          .invoice-details-content strong {
            color: #2563eb;
            font-size: 14px;
          }
          .invoice-details-content span {
            color: #000;
            font-size: 14px;
          }
          .client-section {
            margin-bottom: 40px;
          }
          .client-section h3 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 14px;
            font-weight: 600;
          }
          .client-section p {
            margin: 4px 0;
            color: #333;
            font-size: 13px;
          }
          .client-section p:first-of-type {
            font-weight: 600;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            table-layout: fixed;
          }
          .items-table th {
            background: #2563eb;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
            border: 0;
          }
          .items-table th:nth-child(2),
          .items-table th:nth-child(3),
          .items-table th:nth-child(4) {
            text-align: right;
          }
          .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #e5e7eb;
            color: #333;
            font-size: 13px;
            word-wrap: break-word;
            overflow-wrap: anywhere;
          }
          .items-table td:nth-child(2),
          .items-table td:nth-child(3),
          .items-table td:nth-child(4) {
            text-align: right;
          }
          .items-table tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .items-table tr:nth-child(odd) {
            background-color: #eff6ff;
          }
          .total-section {
            text-align: right;
            margin-top: 20px;
          }
          .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
          .payment-section {
            margin-top: 40px;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 8px;
          }
          .payment-section h3 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 14px;
            font-weight: 600;
          }
          .payment-section p {
            margin: 4px 0;
            color: #333;
            font-size: 13px;
          }
          .notes-section {
            margin-top: 30px;
          }
          .notes-section h3 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 14px;
            font-weight: 600;
          }
          .notes-section p {
            margin: 4px 0;
            color: #333;
            font-size: 13px;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="company-info">
              ${invoiceData.company?.logo ? `
                <img src="${invoiceData.company.logo}" alt="Logo" />
              ` : ''}
              <h3>${invoiceData.company?.name || 'Nom de l\'entreprise'}</h3>
              ${invoiceData.company?.address ? `<p>${invoiceData.company.address}</p>` : ''}
              ${invoiceData.company?.phone ? `<p>Tél: ${invoiceData.company.phone}</p>` : ''}
              ${invoiceData.company?.email ? `<p>Email: ${invoiceData.company.email}</p>` : ''}
            </div>
            
            <div class="invoice-info">
              <h2 class="invoice-title">FACTURE</h2>
              <div class="invoice-details">
                <div class="invoice-details-content">
                  <div>
                    <strong>Nom de facture:</strong>
                    <strong style="margin-left: 30px;">Date:</strong>
                  </div>
                  <div>
                    <span>${invoiceData.invoice?.name || 'Facture sans nom'}</span>
                    <span style="margin-left: 30px;">${new Date(invoiceData.invoice?.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="client-section">
            <h3>Facturé à</h3>
            ${invoiceData.client?.name ? `
              <p>${invoiceData.client.name}</p>
              <p>${invoiceData.client.address || 'Adresse non renseignée'}</p>
              ${invoiceData.client.phone ? `<p>${invoiceData.client.phone}</p>` : ''}
            ` : '<p style="color: #999; font-style: italic;">Informations client non renseignées</p>'}
          </div>

          ${invoiceData.invoice?.items && invoiceData.invoice.items.length > 0 ? `
            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 40%;">Désignation</th>
                  <th style="width: 20%;">Prix unitaire</th>
                  <th style="width: 20%;">Qté</th>
                  <th style="width: 20%;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.invoice.items.map((item, index) => `
                  <tr>
                    <td>${item.description || 'Non renseigné'}</td>
                    <td>${(item.price || 0).toLocaleString('fr-FR')} FCFA</td>
                    <td>${item.quantity || 0}</td>
                    <td>${((item.price || 0) * (item.quantity || 0)).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}

          <div class="total-section">
            <div class="total-amount">
              Total: ${(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          ${invoiceData.company?.mobileMoneyService ? `
            <div class="payment-section">
              <h3>Mode de paiement</h3>
              <p>
                <strong>${invoiceData.company.mobileMoneyService}</strong>
                ${invoiceData.company.mobileMoneyNumber ? ` - ${invoiceData.company.mobileMoneyNumber}` : ''}
              </p>
            </div>
          ` : ''}

          ${invoiceData.invoice?.notes ? `
            <div class="notes-section">
              <h3>Notes</h3>
              <p>${invoiceData.invoice.notes}</p>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la facture...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Facture non trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              Cette facture n'existe pas ou a été supprimée.
            </p>
            <Link
              href="/historique"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Retour à l'historique
            </Link>
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
        {/* En-tête avec actions */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📄 {invoice.invoiceNumber}
              </h1>
              <p className="text-gray-600">
                Créée le {formatDate(invoice.createdDate)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isDownloading ? '⏳ Téléchargement...' : '📥 Télécharger PDF'}
              </button>
              
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {isPrinting ? '⏳ Impression...' : '🖨️ Imprimer'}
              </button>
              
              <Link
                href="/historique"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-center"
              >
                ← Retour
              </Link>
            </div>
          </div>
        </div>

        {/* Aperçu de la facture */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <InvoicePreview invoiceData={invoice.fullFormData} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
