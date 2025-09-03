import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Fonction pour convertir les nombres en mots français
export const numberToWords = (num) => {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf']
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix']
  
  if (num === 0) return 'zéro'
  if (num < 10) return units[num]
  if (num < 20) return teens[num - 10]
  if (num < 100) {
    if (num % 10 === 0) return tens[Math.floor(num / 10)]
    if (num < 70) return tens[Math.floor(num / 10)] + '-' + units[num % 10]
    if (num < 80) return tens[6] + '-' + teens[num - 70]
    return tens[Math.floor(num / 10)] + '-' + units[num % 10]
  }
  if (num < 1000) {
    if (num % 100 === 0) return units[Math.floor(num / 100)] + ' cent'
    return units[Math.floor(num / 100)] + ' cent ' + numberToWords(num % 100)
  }
  if (num < 1000000) {
    if (num % 1000 === 0) return numberToWords(Math.floor(num / 1000)) + ' mille'
    return numberToWords(Math.floor(num / 1000)) + ' mille ' + numberToWords(num % 1000)
  }
  if (num < 1000000000) {
    if (num % 1000000 === 0) return numberToWords(Math.floor(num / 1000000)) + ' million'
    return numberToWords(Math.floor(num / 1000000)) + ' million ' + numberToWords(num % 1000000)
  }
  return 'nombre trop grand'
}

// Fonction pour formater une date
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Fonction pour générer le PDF côté client
export const generatePDF = async (invoiceData) => {
  try {
    // Créer un élément temporaire pour le rendu
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '0'
    tempDiv.style.width = '800px'
    tempDiv.style.backgroundColor = 'white'
    tempDiv.style.padding = '40px'
    tempDiv.style.fontFamily = 'Arial, sans-serif'
    tempDiv.style.fontSize = '12px'
    tempDiv.style.lineHeight = '1.4'
    
    // Générer le HTML de la facture
    const invoiceHTML = generateInvoiceHTML(invoiceData)
    tempDiv.innerHTML = invoiceHTML
    
    // Ajouter au DOM temporairement
    document.body.appendChild(tempDiv)
    
    // Convertir en canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    })
    
    // Nettoyer
    document.body.removeChild(tempDiv)
    
    // Créer le PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // Ajouter l'image au PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    
    // Si l'image dépasse une page, ajouter des pages supplémentaires
    let heightLeft = imgHeight
    let position = 0
    
    while (heightLeft >= pdfHeight) {
      position = heightLeft - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }
    
    return pdf
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
    throw new Error('Erreur lors de la génération du PDF')
  }
}

// Fonction pour générer l'HTML de la facture
const generateInvoiceHTML = (invoiceData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white;">
      <!-- En-tête -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
        <div>
          <div style="width: 80px; height: 80px; background: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; overflow: hidden;">
            ${invoiceData.customLogo ? 
              `<img src="${invoiceData.customLogo}" alt="Logo DABO LOGISTIQUES" style="width: 100%; height: 100%; object-fit: contain;" />` : 
              '<span style="color: white; font-size: 24px; font-weight: bold;">DL</span>'
            }
          </div>
          <h1 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: bold;">${invoiceData.company.name}</h1>
          <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">${invoiceData.company.activity}</p>
          <p style="margin: 5px 0; color: #6b7280; font-size: 12px;"><strong>Adresse:</strong> ${invoiceData.company.address} | <strong>Tél:</strong> ${invoiceData.company.phone} | <strong>Email:</strong> ${invoiceData.company.email}</p>
          <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">${invoiceData.company.location}</p>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; color: #2563eb; font-size: 32px; font-weight: bold;">${invoiceData.invoiceName || 'FACTURE'}</h2>
          <div style="margin-top: 10px; font-size: 14px; color: #6b7280;">
            <p style="margin: 5px 0;"><strong>N° ${invoiceData.invoiceNumber}</strong></p>
            <p style="margin: 5px 0;">Date: ${formatDate(invoiceData.invoiceDate)}</p>
          </div>
        </div>
      </div>

      <!-- Client et Expédition -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
        <div>
          <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Facturé à :</h3>
          ${invoiceData.client.name ? `
            <p style="margin: 5px 0; font-weight: bold; color: #1f2937;">${invoiceData.client.name}</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">${invoiceData.client.address}</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">${invoiceData.client.city}, ${invoiceData.client.country}</p>
          ` : '<p style="margin: 5px 0; color: #9ca3af; font-style: italic; font-size: 12px;">Informations client non renseignées</p>'}
        </div>
        <div>
          <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Expédition :</h3>
          ${invoiceData.shipment.waybillNumber ? `
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">Waybill: <span style="font-weight: bold; color: #1f2937;">${invoiceData.shipment.waybillNumber}</span></p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">Marque: <span style="font-weight: bold; color: #1f2937;">${invoiceData.shipment.brand}</span></p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">Poids: <span style="font-weight: bold; color: #1f2937;">${invoiceData.shipment.grossWeight} kg</span></p>
          ` : '<p style="margin: 5px 0; color: #9ca3af; font-style: italic; font-size: 12px;">Informations expédition non renseignées</p>'}
        </div>
      </div>

      <!-- Tableau des débours -->
      ${invoiceData.debours.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Débours (Sous-total I)</h3>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #d1d5db;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; font-weight: bold; color: #1f2937;">Description</th>
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">Montant</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.debours.map(item => `
                <tr>
                  <td style="border: 1px solid #d1d5db; padding: 12px; color: #1f2937;">${item.description}</td>
                  <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; color: #1f2937;">${item.amount.toLocaleString('fr-FR')} FCFA</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background: #f3f4f6;">
                <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; color: #1f2937;">Sous-total I</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">${invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ` : ''}

      <!-- Tableau des interventions taxables -->
      ${invoiceData.taxableInterventions.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Interventions Taxables (Sous-total II)</h3>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #d1d5db;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; font-weight: bold; color: #1f2937;">Description</th>
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: center; font-weight: bold; color: #1f2937;">Qté</th>
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">Prix unit.</th>
                <th style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">Montant</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.taxableInterventions.map(item => `
                <tr>
                  <td style="border: 1px solid #d1d5db; padding: 12px; color: #1f2937;">${item.description}</td>
                  <td style="border: 1px solid #d1d5db; padding: 12px; text-align: center; color: #1f2937;">${item.quantity}</td>
                  <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; color: #1f2937;">${item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
                  <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; color: #1f2937;">${(item.quantity * item.unitPrice).toLocaleString('fr-FR')} FCFA</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background: #f3f4f6;">
                <td colspan="3" style="border: 1px solid #d1d5db; padding: 12px; font-weight: bold; color: #1f2937;">Sous-total II</td>
                <td style="border: 1px solid #d1d5db; padding: 12px; text-align: right; font-weight: bold; color: #1f2937;">${invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ` : ''}

      <!-- Totaux -->
      <div style="margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #1f2937; font-weight: bold;">Sous-total I:</span>
          <span style="color: #1f2937; font-weight: bold;">${invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #1f2937; font-weight: bold;">Sous-total II:</span>
          <span style="color: #1f2937; font-weight: bold;">${invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px; background: #2563eb; color: white; border-radius: 8px;">
          <span style="font-weight: bold; font-size: 16px;">Total:</span>
          <span style="font-weight: bold; font-size: 16px;">${invoiceData.total.toLocaleString('fr-FR')} FCFA</span>
        </div>
      </div>

      <!-- Montant en lettres -->
      ${invoiceData.total > 0 ? `
        <div style="margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="margin: 0 0 10px 0; font-weight: bold; color: #1f2937;">Arrêté la présente facture à la somme de :</p>
          <p style="margin: 0; color: #2563eb; font-size: 16px; font-weight: bold;">${numberToWords(invoiceData.total)} francs CFA</p>
        </div>
      ` : ''}

      <!-- Pied de page -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;"><strong>NINEA:</strong> ${invoiceData.company.ninea}</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;"><strong>RC:</strong> ${invoiceData.company.rc}</p>
          </div>
          <div>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;"><strong>Tél:</strong> ${invoiceData.company.phone}</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;"><strong>Email:</strong> ${invoiceData.company.email}</p>
          </div>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 14px; font-style: italic;">Merci de votre confiance</p>
        </div>
      </div>
    </div>
  `
}

