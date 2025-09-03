'use client'

import { useState } from 'react'

export default function InvoiceForm({ 
  invoiceData, 
  onDataChange, 
  onArrayChange, 
  onAddArrayItem, 
  onRemoveArrayItem,
  onLogoUpload,
  onRemoveLogo
}) {
  const [activeSection, setActiveSection] = useState('company')

  const sections = [
    { id: 'company', title: 'Informations Entreprise', icon: '🏢' },
    { id: 'invoice', title: 'Informations Facture', icon: '📄' },
    { id: 'client', title: 'Client', icon: '👤' },
    { id: 'shipment', title: 'Expédition', icon: '📦' },
    { id: 'debours', title: 'Débours (Sous-total I)', icon: '💰' },
    { id: 'taxable', title: 'Interventions Taxables (Sous-total II)', icon: '🧾' }
  ]

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'company':
        return (
          <div className="space-y-4">
            {/* Section Logo */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                             <h4 className="text-lg font-medium text-gray-900 mb-4">Logo de l&apos;entreprise</h4>
              <div className="space-y-4">
                {/* Aperçu du logo */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {invoiceData.customLogo ? (
                      <img 
                        src={invoiceData.customLogo} 
                                                 alt="Logo DABO LOGISTIQUES" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">DT</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Personnalisez le logo de votre entreprise. Si aucun logo n&apos;est fourni, les initiales &quot;DT&quot; seront affichées.</p>
                    <div className="flex space-x-2">
                      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        Changer le logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onLogoUpload}
                          className="hidden"
                        />
                      </label>
                      {invoiceData.customLogo && (
                        <button
                          onClick={onRemoveLogo}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l&apos;entreprise</label>
              <input
                type="text"
                value={invoiceData.company.name}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Pré-rempli et non modifiable</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activité</label>
              <input
                type="text"
                value={invoiceData.company.activity}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
              <input
                type="text"
                value={invoiceData.company.address}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="text"
                  value={invoiceData.company.phone}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  value={invoiceData.company.email}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NINEA</label>
                <input
                  type="text"
                  value={invoiceData.company.ninea}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RC</label>
                <input
                  type="text"
                  value={invoiceData.company.rc}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <input
                type="text"
                value={invoiceData.company.location}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>
        )

      case 'invoice':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la facture</label>
              <input
                type="text"
                value={invoiceData.invoiceName || ''}
                onChange={(e) => onDataChange('invoiceName', e.target.value)}
                placeholder="Nom personnalisé de la facture"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Personnalisez le nom de votre facture</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de facture</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Généré automatiquement</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de facture</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Date actuelle par défaut</p>
            </div>
          </div>
        )

      case 'client':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du client *</label>
              <input
                type="text"
                value={invoiceData.client.name || ''}
                onChange={(e) => onDataChange('client', 'name', e.target.value)}
                placeholder="Nom complet du client"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
              <textarea
                value={invoiceData.client.address || ''}
                onChange={(e) => onDataChange('client', 'address', e.target.value)}
                placeholder="Adresse complète du client"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <input
                  type="text"
                  value={invoiceData.client.city || ''}
                  onChange={(e) => onDataChange('client', 'city', e.target.value)}
                  placeholder="Ville"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                <input
                  type="text"
                  value={invoiceData.client.country || ''}
                  onChange={(e) => onDataChange('client', 'country', e.target.value)}
                  placeholder="Pays"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>
        )

      case 'shipment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Waybill</label>
              <input
                type="text"
                value={invoiceData.shipment.waybillNumber || ''}
                onChange={(e) => onDataChange('shipment', 'waybillNumber', e.target.value)}
                placeholder="Numéro de waybill"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marque/Désignation</label>
              <input
                type="text"
                value={invoiceData.shipment.brand || ''}
                onChange={(e) => onDataChange('shipment', 'brand', e.target.value)}
                placeholder="Marque ou désignation"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Poids brut (kg)</label>
              <input
                type="number"
                value={invoiceData.shipment.grossWeight || ''}
                onChange={(e) => onDataChange('shipment', 'grossWeight', e.target.value)}
                placeholder="Poids en kilogrammes"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>
        )

      case 'debours':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Liste des débours</h4>
                             <button
                 onClick={() => onAddArrayItem('debours')}
                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
               >
                + Ajouter
              </button>
            </div>
            
            {invoiceData.debours.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun débours ajouté</p>
            ) : (
              <div className="space-y-3">
                {invoiceData.debours.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-gray-900">Débours #{index + 1}</h5>
                                             <button
                         onClick={() => onRemoveArrayItem('debours', index)}
                         className="text-red-600 hover:text-red-800 text-sm"
                       >
                        Supprimer
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={item.description || ''}
                          onChange={(e) => onArrayChange('debours', index, 'description', e.target.value)}
                          placeholder="Description du débours"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
                        <input
                          type="number"
                          value={item.amount || ''}
                          onChange={(e) => onArrayChange('debours', index, 'amount', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-right">
                <span className="text-sm text-gray-600">Sous-total I: </span>
                <span className="text-lg font-bold text-blue-600">{invoiceData.subtotal1.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        )

      case 'taxable':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Interventions taxables</h4>
                             <button
                 onClick={() => onAddArrayItem('taxableInterventions')}
                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
               >
                + Ajouter
              </button>
            </div>
            
            {invoiceData.taxableInterventions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune intervention ajoutée</p>
            ) : (
              <div className="space-y-3">
                {invoiceData.taxableInterventions.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-medium text-gray-900">Intervention #{index + 1}</h5>
                                             <button
                         onClick={() => onRemoveArrayItem('taxableInterventions', index)}
                         className="text-red-600 hover:text-red-800 text-sm"
                       >
                        Supprimer
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={item.description || ''}
                          onChange={(e) => onArrayChange('taxableInterventions', index, 'description', e.target.value)}
                          placeholder="Description de l'intervention"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                          <input
                            type="number"
                            value={item.quantity || ''}
                            onChange={(e) => onArrayChange('taxableInterventions', index, 'quantity', parseInt(e.target.value) || 1)}
                            placeholder="1"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prix unit. (FCFA)</label>
                          <input
                            type="number"
                            value={item.unitPrice || ''}
                            onChange={(e) => onArrayChange('taxableInterventions', index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total (FCFA)</label>
                          <input
                            type="number"
                            value={((item.quantity || 1) * (item.unitPrice || 0)).toFixed(0)}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-right">
                <span className="text-sm text-gray-600">Sous-total II: </span>
                <span className="text-lg font-bold text-blue-600">{invoiceData.subtotal2.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de la facture</h2>
      
      {/* Navigation des sections */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </div>

      {/* Contenu de la section active */}
      <div className="min-h-[400px]">
        {renderSectionContent()}
      </div>

      {/* Résumé des totaux */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            Total: {invoiceData.total.toLocaleString('fr-FR')} FCFA
          </div>
          <div className="text-sm text-gray-600">
            {invoiceData.total > 0 && (
              <span>Arrêté la présente facture à la somme de {numberToWords(invoiceData.total)} francs CFA</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Fonction utilitaire pour convertir les nombres en lettres françaises
function numberToWords(num) {
  if (num === 0) return 'zéro'
  
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf']
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix']
  
  if (num < 10) return units[num]
  if (num < 20) return teens[num - 10]
  if (num < 100) {
    if (num % 10 === 0) return tens[Math.floor(num / 10)]
    if (num < 70) return tens[Math.floor(num / 10)] + (num % 10 === 1 ? ' et un' : '-' + units[num % 10])
    if (num < 80) return 'soixante-' + (num % 10 === 1 ? 'et-onze' : teens[num % 10])
    return tens[Math.floor(num / 10)] + (num % 10 === 0 ? '' : '-' + units[num % 10])
  }
  
  if (num < 1000) {
    if (num === 100) return 'cent'
    if (num < 200) return 'cent ' + numberToWords(num % 100)
    return units[Math.floor(num / 100)] + ' cent' + (num % 100 === 0 ? 's' : ' ' + numberToWords(num % 100))
  }
  
  if (num < 1000000) {
    if (num === 1000) return 'mille'
    if (num < 2000) return 'mille ' + numberToWords(num % 1000)
    return numberToWords(Math.floor(num / 1000)) + ' mille' + (num % 1000 === 0 ? '' : ' ' + numberToWords(num % 1000))
  }
  
  return 'nombre trop grand'
}

