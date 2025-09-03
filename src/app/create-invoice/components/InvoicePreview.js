'use client'

import { numberToWords, formatDate } from '../../../utils/pdfGenerator'

export default function InvoicePreview({ invoiceData }) {
  // Fonction pour imprimer uniquement la facture
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    const printHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Facture ${invoiceData.invoiceNumber}</title>
        <style>
          @media print {
            @page { margin: 0; size: A4; }
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #1f2937;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
          }
          .company-info h1 {
            margin: 0;
            color: #1f2937;
            font-size: 24px;
            font-weight: bold;
          }
          .company-info p {
            margin: 5px 0;
            color: #6b7280;
            font-size: 14px;
          }
          .logo {
            width: 80px;
            height: 80px;
            background: #2563eb;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            overflow: hidden;
          }
          .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .logo span {
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          .invoice-title h2 {
            margin: 0;
            color: #2563eb;
            font-size: 32px;
            font-weight: bold;
          }
          .invoice-title p {
            margin: 5px 0;
            font-size: 14px;
            color: #6b7280;
          }
          .client-shipment {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          .section h3 {
            margin: 0 0 10px 0;
            color: #1f2937;
            font-size: 16px;
            font-weight: bold;
          }
          .section p {
            margin: 5px 0;
            color: #6b7280;
            font-size: 12px;
          }
          .section p strong {
            color: #1f2937;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #d1d5db;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
            color: #1f2937;
          }
          th {
            background: #f9fafb;
            font-weight: bold;
          }
          tfoot tr {
            background: #f3f4f6;
            font-weight: bold;
          }
          .totals {
            margin-bottom: 30px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-weight: bold;
          }
          .grand-total {
            padding: 15px;
            background: #2563eb;
            color: white;
            border-radius: 8px;
            font-size: 16px;
          }
          .amount-in-words {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
          }
          .amount-in-words p {
            margin: 0 0 10px 0;
            font-weight: bold;
            color: #1f2937;
          }
          .amount-in-words p:last-child {
            color: #2563eb;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
          }
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .footer-grid p {
            margin: 5px 0;
            color: #6b7280;
            font-size: 12px;
          }
          .footer-center {
            text-align: center;
          }
          .footer-center p {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- En-tête -->
          <div class="header">
            <div class="company-info">
              <div class="logo">
                ${invoiceData.customLogo ? `<img src="${invoiceData.customLogo}" alt="Logo DABO LOGISTIQUES" />` : '<span>DL</span>'}
              </div>
              <h1>${invoiceData.company.name}</h1>
              <p>${invoiceData.company.activity}</p>
              <p><strong>Adresse:</strong> ${invoiceData.company.address} | <strong>Tél:</strong> ${invoiceData.company.phone} | <strong>Email:</strong> ${invoiceData.company.email}</p>
              <p>${invoiceData.company.location}</p>
            </div>
            <div class="invoice-title">
              <h2>${invoiceData.invoiceName || 'FACTURE'}</h2>
              <p><strong>N° ${invoiceData.invoiceNumber}</strong></p>
              <p>Date: ${formatDate(invoiceData.invoiceDate)}</p>
            </div>
          </div>
          <!-- Client et Expédition -->
          <div class="client-shipment">
            <div class="section">
              <h3>Facturé à :</h3>
              ${invoiceData.client.name ? `
                <p><strong>${invoiceData.client.name}</strong></p>
                <p>${invoiceData.client.address}</p>
                <p>${invoiceData.client.city}, ${invoiceData.client.country}</p>
              ` : '<p><em>Informations client non renseignées</em></p>'}
            </div>
            <div class="section">
              <h3>Expédition :</h3>
              ${invoiceData.shipment.waybillNumber ? `
                <p>Waybill: <strong>${invoiceData.shipment.waybillNumber}</strong></p>
                <p>Marque: <strong>${invoiceData.shipment.brand}</strong></p>
                <p>Poids: <strong>${invoiceData.shipment.grossWeight} kg</strong></p>
              ` : '<p><em>Informations expédition non renseignées</em></p>'}
            </div>
          </div>
          <!-- Tableau des débours -->
          ${invoiceData.debours.length > 0 ? `
            <div class="section">
              <h3>Débours (Sous-total I)</h3>
              <table>
                <thead><tr><th>Description</th><th style="text-align: right;">Montant</th></tr></thead>
                <tbody>
                  ${invoiceData.debours.map(item => `<tr><td>${item.description}</td><td style="text-align: right;">${item.amount.toLocaleString('fr-FR')} FCFA</td></tr>`).join('')}
                </tbody>
                <tfoot><tr><td><strong>Sous-total I</strong></td><td style="text-align: right;"><strong>${invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</strong></td></tr></tfoot>
              </table>
            </div>
          ` : ''}
          <!-- Tableau des interventions taxables -->
          ${invoiceData.taxableInterventions.length > 0 ? `
            <div class="section">
              <h3>Interventions Taxables (Sous-total II)</h3>
              <table>
                <thead><tr><th>Description</th><th style="text-align: center;">Qté</th><th style="text-align: right;">Prix unit.</th><th style="text-align: right;">Montant</th></tr></thead>
                <tbody>
                  ${invoiceData.taxableInterventions.map(item => `<tr><td>${item.description}</td><td style="text-align: center;">${item.quantity}</td><td style="text-align: right;">${item.unitPrice.toLocaleString('fr-FR')} FCFA</td><td style="text-align: right;">${(item.quantity * item.unitPrice).toLocaleString('fr-FR')} FCFA</td></tr>`).join('')}
                </tbody>
                <tfoot><tr><td colspan="3"><strong>Sous-total II</strong></td><td style="text-align: right;"><strong>${invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</strong></td></tr></tfoot>
              </table>
            </div>
          ` : ''}
          <!-- Totaux -->
          <div class="totals">
            <div class="total-row"><span>Sous-total I:</span><span>${invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</span></div>
            <div class="total-row"><span>Sous-total II:</span><span>${invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</span></div>
            <div class="total-row grand-total"><span>Total:</span><span>${invoiceData.total.toLocaleString('fr-FR')} FCFA</span></div>
          </div>
          <!-- Montant en lettres -->
          ${invoiceData.total > 0 ? `
            <div class="amount-in-words">
              <p><strong>Arrêté la présente facture à la somme de :</strong></p>
              <p style="color: #2563eb; font-size: 16px; margin-top: 10px;">${numberToWords(invoiceData.total)} francs CFA</p>
            </div>
          ` : ''}
          <!-- Pied de page -->
          <div class="footer">
            <div class="footer-grid">
              <div><p><strong>NINEA:</strong> ${invoiceData.company.ninea}</p><p><strong>RC:</strong> ${invoiceData.company.rc}</p></div>
              <div><p><strong>Tél:</strong> ${invoiceData.company.phone}</p><p><strong>Email:</strong> ${invoiceData.company.email}</p></div>
            </div>
            <div class="footer-center"><p>Merci de votre confiance</p></div>
          </div>
        </div>
      </body>
      </html>
    `
    printWindow.document.write(printHTML)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
      printWindow.onafterprint = () => { printWindow.close() }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Aperçu de la facture</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrint}
            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimer
          </button>
        </div>
      </div>

      {/* Aperçu de la facture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm invoice-preview">
        {/* En-tête */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                {invoiceData.customLogo ? (
                  <img 
                    src={invoiceData.customLogo} 
                    alt="Logo DABO LOGISTIQUES" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-white text-xl font-bold">DL</span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{invoiceData.company.name}</h1>
              <p className="text-gray-600">{invoiceData.company.activity}</p>
              <p className="text-sm text-gray-500"><strong>Adresse:</strong> {invoiceData.company.address} | <strong>Tél:</strong> {invoiceData.company.phone} | <strong>Email:</strong> {invoiceData.company.email}</p>
              <p className="text-sm text-gray-500">{invoiceData.company.location}</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">{invoiceData.invoiceName || 'FACTURE'}</h2>
              <div className="text-sm text-gray-600">
                <p><strong>N° {invoiceData.invoiceNumber}</strong></p>
                <p>Date: {formatDate(invoiceData.invoiceDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations client et expédition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Facturé à :</h3>
            {invoiceData.client.name ? (
              <div className="space-y-1">
                <p className="font-medium">{invoiceData.client.name}</p>
                <p className="text-sm text-gray-600">{invoiceData.client.address}</p>
                <p className="text-sm text-gray-600">{invoiceData.client.city}, {invoiceData.client.country}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Informations client non renseignées</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Expédition :</h3>
            {invoiceData.shipment.waybillNumber ? (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Waybill: <span className="font-medium">{invoiceData.shipment.waybillNumber}</span></p>
                <p className="text-sm text-gray-600">Marque: <span className="font-medium">{invoiceData.shipment.brand}</span></p>
                <p className="text-sm text-gray-600">Poids: <span className="font-medium">{invoiceData.shipment.grossWeight} kg</span></p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Informations expédition non renseignées</p>
            )}
          </div>
        </div>

        {/* Tableau des débours */}
        {invoiceData.debours.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Débours (Sous-total I)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Description</th>
                    <th className="border border-gray-200 px-4 py-2 text-right font-semibold">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.debours.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">{item.description}</td>
                      <td className="border border-gray-200 px-4 py-2 text-right">{item.amount.toLocaleString('fr-FR')} FCFA</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 px-4 py-2 font-semibold">Sous-total I</td>
                    <td className="border border-gray-200 px-4 py-2 text-right font-semibold">{invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Tableau des interventions taxables */}
        {invoiceData.taxableInterventions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Interventions Taxables (Sous-total II)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Description</th>
                    <th className="border border-gray-200 px-4 py-2 text-center font-semibold">Qté</th>
                    <th className="border border-gray-200 px-4 py-2 text-right font-semibold">Prix unit.</th>
                    <th className="border border-gray-200 px-4 py-2 text-right font-semibold">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.taxableInterventions.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">{item.description}</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-200 px-4 py-2 text-right">{item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
                      <td className="border border-gray-200 px-4 py-2 text-right">{(item.quantity * item.unitPrice).toLocaleString('fr-FR')} FCFA</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="border border-gray-200 px-4 py-2 font-semibold">Sous-total II</td>
                    <td className="border border-gray-200 px-4 py-2 text-right font-semibold">{invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Totaux */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Sous-total I:</span>
            <span className="font-semibold">{invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Sous-total II:</span>
            <span className="font-semibold">{invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="flex justify-between p-4 bg-blue-600 text-white rounded-lg">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">{invoiceData.total.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>

        {/* Montant en lettres */}
        {invoiceData.total > 0 && (
          <div className="mb-6 p-5 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            <p className="font-semibold mb-2">Arrêté la présente facture à la somme de :</p>
            <p className="text-blue-600 text-lg font-bold">{numberToWords(invoiceData.total)} francs CFA</p>
          </div>
        )}

        {/* Pied de page */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600"><strong>NINEA:</strong> {invoiceData.company.ninea}</p>
              <p className="text-sm text-gray-600"><strong>RC:</strong> {invoiceData.company.rc}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600"><strong>Tél:</strong> {invoiceData.company.phone}</p>
              <p className="text-sm text-gray-600"><strong>Email:</strong> {invoiceData.company.email}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 italic">Merci de votre confiance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
