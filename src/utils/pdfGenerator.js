import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * GÉNÉRATEUR PDF POUR FACTURES BILLIO
 * 
 * Ce module gère la génération de PDF côté client pour les factures.
 * Il utilise jsPDF pour créer le PDF et html2canvas pour convertir le HTML en image.
 * 
 * Fonctionnalités principales :
 * - Conversion HTML vers PDF via canvas
 * - Conversion des nombres en lettres françaises
 * - Formatage des dates françaises
 * - Génération de factures professionnelles
 */

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
    // Cet élément sera invisible et utilisé uniquement pour la conversion HTML->PDF
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '0'
    tempDiv.style.width = '800px'
    tempDiv.style.backgroundColor = 'white'
    tempDiv.style.padding = '40px'
    tempDiv.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    tempDiv.style.fontSize = '12px'
    tempDiv.style.lineHeight = '1.6'
    
    // Générer le HTML de la facture avec tous les styles inline
    const invoiceHTML = generateInvoiceHTML(invoiceData)
    tempDiv.innerHTML = invoiceHTML
    
    // Ajouter au DOM temporairement pour permettre le rendu
    document.body.appendChild(tempDiv)
    
    // Convertir en canvas avec html2canvas
    // Cette étape capture l'élément HTML comme image
    const canvas = await html2canvas(tempDiv, {
      scale: 2, // Haute résolution pour un PDF de qualité
      useCORS: true, // Permet les images externes
      allowTaint: true, // Permet les images non-CORS
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    })
    
    // Nettoyer l'élément temporaire
    document.body.removeChild(tempDiv)
    
    // Créer le PDF avec jsPDF
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
    
    // Retourner le PDF sous forme de blob pour le téléchargement
    const pdfBlob = pdf.output('blob')
    return pdfBlob
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
    throw new Error('Erreur lors de la génération du PDF')
  }
}

// Fonction pour générer l'HTML de la facture - Identique à l'aperçu et l'impression
const generateInvoiceHTML = (invoiceData) => {
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
                  <span style="color: #000; font-size: 14px; margin-left: 30px;">${formatDate(invoiceData.invoice?.date)}</span>
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
      <div style="display: grid; grid-template-columns: 1fr; gap: 30px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
        <div style="font-size: 13px; color: #333;">
          <p style="margin: 0 0 8px 0; font-weight: 600;">Informations de paiement</p>
          ${invoiceData.company.bank ? `<p style="margin: 4px 0;">Banque: ${invoiceData.company.bank}</p>` : ''}
          ${invoiceData.company.mobileMoneyService && invoiceData.company.mobileMoneyService !== 'Paiement espèce' && invoiceData.company.mobileMoneyNumber ? 
            `<p style="margin: 4px 0;">Paiement fait avec ${invoiceData.company.mobileMoneyService}: ${invoiceData.company.mobileMoneyNumber}</p>` : ''}
          ${invoiceData.company.mobileMoneyService === 'Paiement espèce' ? 
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