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
        <title>Invoice ${invoiceData.invoice?.name || 'Sans nom'}</title>
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
            border: 2px solid #5C3DF2;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #5C3DF2 0%, #4C2BC7 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .company-info {
            flex: 1;
            min-width: 0;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .company-details {
            font-size: 14px;
            line-height: 1.5;
          }
          .invoice-info {
            text-align: right;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            flex-shrink: 0;
            width: 256px;
            max-width: none;
          }
          .invoice-title {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #5C3DF2;
          }
          .invoice-details {
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            overflow-wrap: anywhere;
            hyphens: auto;
          }
          .parties-section {
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            justify-content: space-between;
          }
          .party-info {
            flex: 1;
            margin: 0 10px;
          }
          .party-title {
            font-size: 16px;
            font-weight: bold;
            color: #5C3DF2;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #5C3DF2;
          }
          .party-details {
            font-size: 14px;
            line-height: 1.5;
          }
          .items-section {
            padding: 20px;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .items-table th {
            background: #5C3DF2;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
          }
          .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
          }
          .items-table tr:nth-child(even) {
            background: #f8f9fa;
          }
          .total-section {
            background: #f8f9fa;
            padding: 20px;
            border-top: 2px solid #5C3DF2;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .total-final {
            background: #5C3DF2;
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
          }
          .footer {
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #666;
          }
          .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .payment-info {
            flex: 1;
          }
          .branding {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #5C3DF2;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <!-- En-tête -->
          <div class="header">
            <div class="company-info">
              ${invoiceData.company?.logo ? `<img src="${invoiceData.company.logo}" alt="Logo" style="max-height: 60px; margin-bottom: 10px;">` : ''}
              <div class="company-name">${invoiceData.company?.name || 'Nom de l\'entreprise'}</div>
              <div class="company-details">
                ${invoiceData.company?.address ? `<div>${invoiceData.company.address}</div>` : ''}
                ${invoiceData.company?.phone ? `<div>Tél: ${invoiceData.company.phone}</div>` : ''}
                ${invoiceData.company?.email ? `<div>Email: ${invoiceData.company.email}</div>` : ''}
              </div>
            </div>
            <div class="invoice-info">
              <div class="invoice-title">FACTURE</div>
              <div class="invoice-details">
                <div><strong>Nom:</strong> ${invoiceData.invoice?.name || 'Facture sans nom'}</div>
                <div><strong>Date:</strong> ${formatDate(invoiceData.invoice?.date)}</div>
              </div>
            </div>
          </div>

          <!-- Parties -->
          <div class="parties-section">
            <div class="party-info">
              <div class="party-title">Facturé par</div>
              <div class="party-details">
                <div><strong>${invoiceData.company?.name || 'Nom de l\'entreprise'}</strong></div>
                ${invoiceData.company?.address ? `<div>${invoiceData.company.address}</div>` : ''}
                ${invoiceData.company?.phone ? `<div>Tél: ${invoiceData.company.phone}</div>` : ''}
                ${invoiceData.company?.email ? `<div>Email: ${invoiceData.company.email}</div>` : ''}
              </div>
            </div>
            <div class="party-info">
              <div class="party-title">Facturé à</div>
              <div class="party-details">
                <div><strong>${invoiceData.client?.name || 'Nom du client'}</strong></div>
                ${invoiceData.client?.address ? `<div>${invoiceData.client.address}</div>` : ''}
                ${invoiceData.client?.phone ? `<div>Tél: ${invoiceData.client.phone}</div>` : ''}
                ${invoiceData.client?.email ? `<div>Email: ${invoiceData.client.email}</div>` : ''}
              </div>
            </div>
          </div>

          <!-- Articles -->
          <div class="items-section">
            <table class="items-table" style="table-layout: fixed; width: 100%;">
              <thead>
                <tr>
                  <th style="width: 40%;">Désignation</th>
                  <th style="width: 20%;">Prix unitaire</th>
                  <th style="width: 20%;">Qté</th>
                  <th style="width: 20%;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.invoice?.items?.map((item, index) => `
                  <tr>
                    <td style="word-wrap: break-word; overflow-wrap: anywhere;">${item.description || 'Non renseigné'}</td>
                    <td style="text-align: right;">${(item.price || 0).toLocaleString('fr-FR')} FCFA</td>
                    <td style="text-align: right;">${item.quantity === '' ? '-' : (item.quantity || '-')}</td>
                    <td style="text-align: right;">${((item.price || 0) * (item.quantity === '' ? 0 : (item.quantity || 0))).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Totaux -->
          <div class="total-section">
            <div class="total-row">
              <span>SOUS-TOTAL</span>
              <span>${(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div class="total-final">
              <span>TOTAL DÛ</span>
              <span>${(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          <!-- Pied de page -->
          <div class="footer">
            <div class="footer-content">
              <div class="payment-info">
                <div><strong>Informations de paiement</strong></div>
                ${invoiceData.company?.mobileMoneyService && invoiceData.company.mobileMoneyService !== 'Paiement espèce' && invoiceData.company.mobileMoneyNumber ? 
                  `<div>Paiement avec ${invoiceData.company.mobileMoneyService}: ${invoiceData.company.mobileMoneyNumber}</div>` : ''}
                ${invoiceData.company?.mobileMoneyService === 'Paiement espèce' ? 
                  `<div>Paiement en espèce</div>` : ''}
                ${invoiceData.invoice?.notes ? `
                  <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0;">${invoiceData.invoice.notes}</p>
                  </div>
                ` : ''}
              </div>
              <div style="text-align: right;">
                <div><strong>Merci pour votre confiance !</strong></div>
              </div>
            </div>
            <div class="branding">
              Créé avec Billio
            </div>
          </div>
        </div>
      </body>
      </html>
    `
    printWindow.document.write(printHTML)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }

  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden relative">
      {/* Motifs décoratifs aux coins */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
      
      {/* Motifs décoratifs sur les côtés */}
      <div className="absolute top-1/2 left-0 w-6 h-6 border-l-2 border-blue-300 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-6 h-6 border-r-2 border-blue-300 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute top-0 left-1/2 w-6 h-6 border-t-2 border-blue-300 rounded-full transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-6 h-6 border-b-2 border-blue-300 rounded-full transform -translate-x-1/2"></div>

      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 p-4 sm:p-6 border-b border-blue-200">
        <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
          <div className="flex-1 min-w-0">
            {invoiceData.company?.logo && (
              <img 
                src={invoiceData.company.logo} 
                alt="Logo" 
                className="h-12 w-auto mb-3 object-contain"
              />
            )}
            <div className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
              {invoiceData.company?.name || 'Nom de l\'entreprise'}
            </div>
            <div className="text-sm space-y-1">
              {invoiceData.company?.address && (
                <div>{invoiceData.company.address}</div>
              )}
              {invoiceData.company?.phone && (
                <div>Tél: {invoiceData.company.phone}</div>
              )}
              {invoiceData.company?.email && (
                <div>Email: {invoiceData.company.email}</div>
              )}
            </div>
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-blue-200 flex-shrink-0 w-full sm:w-64 sm:max-w-none">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-3">FACTURE</div>
            <div className="text-sm space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-gray-700">Nom:</span>
                <span className="text-gray-900 break-words overflow-wrap-anywhere hyphens-auto">{invoiceData.invoice?.name || 'Facture sans nom'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="text-gray-900">{formatDate(invoiceData.invoice?.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="p-4 sm:p-6 bg-blue-50 border-b border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
              Facturé par
            </h3>
            <div className="text-sm space-y-1">
              <div className="font-semibold text-gray-900 sm:text-inherit">{invoiceData.company?.name || 'Nom de l\'entreprise'}</div>
              {invoiceData.company?.address && <div className="text-gray-900 sm:text-inherit">{invoiceData.company.address}</div>}
              {invoiceData.company?.phone && <div className="text-gray-900 sm:text-inherit">Tél: {invoiceData.company.phone}</div>}
              {invoiceData.company?.email && <div className="text-gray-900 sm:text-inherit">Email: {invoiceData.company.email}</div>}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
              Facturé à
            </h3>
            <div className="text-sm space-y-1">
              <div className="font-semibold text-gray-900 sm:text-inherit">{invoiceData.client?.name || 'Nom du client'}</div>
              {invoiceData.client?.address && <div className="text-gray-900 sm:text-inherit">{invoiceData.client.address}</div>}
              {invoiceData.client?.phone && <div className="text-gray-900 sm:text-inherit">Tél: {invoiceData.client.phone}</div>}
              {invoiceData.client?.email && <div className="text-gray-900 sm:text-inherit">Email: {invoiceData.client.email}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border-0 px-2 py-3 text-left font-semibold text-white text-xs sm:text-sm w-2/5">Désignation</th>
                <th className="border-0 px-2 py-3 text-right font-semibold text-white text-xs sm:text-sm w-1/5">Prix unitaire</th>
                <th className="border-0 px-2 py-3 text-right font-semibold text-white text-xs sm:text-sm w-1/5">Qté</th>
                <th className="border-0 px-2 py-3 text-right font-semibold text-white text-xs sm:text-sm w-1/5">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.invoice?.items?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
                  <td className="border-0 px-2 py-3 text-gray-900 text-xs sm:text-sm break-words overflow-wrap-anywhere">
                    {item.description || 'Non renseigné'}
                  </td>
                  <td className="border-0 px-2 py-3 text-right text-gray-900 text-xs whitespace-nowrap">
                    {(item.price || 0).toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="border-0 px-2 py-3 text-right text-gray-900 text-xs sm:text-sm whitespace-nowrap">
                    {item.quantity === '' ? '-' : (item.quantity || '-')}
                  </td>
                  <td className="border-0 px-2 py-3 text-right font-semibold text-gray-900 text-xs whitespace-nowrap overflow-hidden">
                    {((item.price || 0) * (item.quantity === '' ? 0 : (item.quantity || 0))).toLocaleString('fr-FR')} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totaux */}
      <div className="p-4 sm:p-6 bg-blue-50 border-t-2 border-blue-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-900 sm:text-inherit">SOUS-TOTAL</span>
            <span className="font-medium text-gray-900 sm:text-inherit">{(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</span>
          </div>
          <div className="bg-blue-600 text-white p-4 rounded-lg">
            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL DÛ</span>
              <span>{(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="p-4 sm:p-6 bg-blue-50 border-t border-blue-100">
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-2">Informations de paiement</div>
          {invoiceData.company?.mobileMoneyService && invoiceData.company.mobileMoneyService !== 'Paiement espèce' && invoiceData.company.mobileMoneyNumber && (
            <p className="text-gray-900 text-xs sm:text-sm">
              Paiement avec {invoiceData.company.mobileMoneyService}: {invoiceData.company.mobileMoneyNumber}
            </p>
          )}
          {invoiceData.company?.mobileMoneyService === 'Paiement espèce' && (
            <p className="text-gray-900 text-xs sm:text-sm">Paiement en espèce</p>
          )}
          {invoiceData.invoice?.notes && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-gray-900 text-xs sm:text-sm break-words">{invoiceData.invoice.notes}</p>
            </div>
          )}
        </div>
        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs font-bold text-blue-600">Créé avec Billio</div>
        </div>
      </div>
    </div>
  )
}