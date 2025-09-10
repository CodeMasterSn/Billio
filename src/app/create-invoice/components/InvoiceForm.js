'use client'

import { useState, useEffect } from 'react'

export default function InvoiceForm({ 
  invoiceData, 
  onUpdate, 
  onUpdateItem, 
  onAddItem, 
  onRemoveItem,
  onLogoUpload,
  onLogoRemove 
}) {
  const [openSections, setOpenSections] = useState({
    invoice: true,
    company: true,
    client: true,
    items: true,
    payment: true,
    notes: true
  })

  const [validationErrors, setValidationErrors] = useState({})
  const [mobileError, setMobileError] = useState('')

  // Gestionnaire d'événements tactiles optimisé pour iOS
  const handleTouchEvent = (e, callback) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      callback()
    } catch (error) {
      console.error('Erreur interaction tactile:', error)
      setMobileError('Erreur d\'interaction. Veuillez réessayer.')
      setTimeout(() => setMobileError(''), 3000)
    }
  }

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const validateField = (section, field, value) => {
    const key = `${section}.${field}`
    if (!value || value.toString().trim() === '') {
      setValidationErrors(prev => ({ ...prev, [key]: true }))
    } else {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }

  const handleInputChange = (section, field, value) => {
    onUpdate(section, field, value)
    validateField(section, field, value)
  }

  const handleItemChange = (index, field, value) => {
    onUpdateItem(index, field, value)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onLogoUpload(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Nettoyage automatique des erreurs mobiles
  useEffect(() => {
    if (mobileError) {
      const timer = setTimeout(() => {
        setMobileError('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [mobileError])

  return (
    <div className="space-y-6">
      {/* SECTION FACTURE */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('invoice')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>📄 FACTURE</span>
          <span className="text-gray-500">{openSections.invoice ? '−' : '+'}</span>
        </button>
        
        {openSections.invoice && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de facture *
                </label>
                <input
                  type="text"
                  value={invoiceData.invoice?.name || ''}
                  onChange={(e) => handleInputChange('invoice', 'name', e.target.value)}
                  placeholder="Ex: Facture Web Design - Janvier 2024"
                  className={`invoice-form-input w-full ${
                    validationErrors['invoice.name'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  autoComplete="off"
                  inputMode="text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de facture *
                </label>
                <input
                  type="date"
                  value={invoiceData.invoice?.date || ''}
                  onChange={(e) => handleInputChange('invoice', 'date', e.target.value)}
                  className={`invoice-form-input w-full ${
                    validationErrors['invoice.date'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION MON ENTREPRISE */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('company')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>🏢 MON ENTREPRISE</span>
          <span className="text-gray-500">{openSections.company ? '−' : '+'}</span>
        </button>
        
        {openSections.company && (
          <div className="p-4 space-y-4">
            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (optionnel)
              </label>
              <div className="flex items-center space-x-4">
                {invoiceData.company?.logo ? (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={invoiceData.company.logo} 
                      alt="Logo" 
                      className="w-16 h-16 object-contain border border-gray-300 rounded"
                    />
                    <button
                      onClick={onLogoRemove}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom / Raison sociale *
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.name || ''}
                  onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  placeholder="Nom de votre entreprise"
                  className={`invoice-form-input w-full ${
                    validationErrors['company.name'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  autoComplete="off"
                  inputMode="text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={invoiceData.company?.phone || ''}
                  onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
                  placeholder="77 123 45 67"
                  className={`invoice-form-input w-full ${
                    validationErrors['company.phone'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  autoComplete="off"
                  inputMode="tel"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={invoiceData.company?.email || ''}
                  onChange={(e) => handleInputChange('company', 'email', e.target.value)}
                  placeholder="contact@entreprise.com"
                  className="invoice-form-input w-full"
                autoComplete="off"
                inputMode="text"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={invoiceData.company?.address || ''}
                  onChange={(e) => handleInputChange('company', 'address', e.target.value)}
                  placeholder="Avenue Léopold Sédar Senghor, Dakar"
                  className="invoice-form-input w-full"
                autoComplete="off"
                inputMode="text"
                  autoComplete="off"
                  inputMode="text"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION CLIENT */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('client')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>👤 CLIENT</span>
          <span className="text-gray-500">{openSections.client ? '−' : '+'}</span>
        </button>
        
        {openSections.client && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du client *
              </label>
              <input
                type="text"
                value={invoiceData.client?.name || ''}
                onChange={(e) => handleInputChange('client', 'name', e.target.value)}
                placeholder="Nom complet du client"
                className={`invoice-form-input w-full ${
                  validationErrors['client.name'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                required
                autoComplete="off"
                inputMode="text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du client
              </label>
              <input
                type="text"
                value={invoiceData.client?.address || ''}
                onChange={(e) => handleInputChange('client', 'address', e.target.value)}
                placeholder="Adresse complète du client"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  value={invoiceData.client?.phone || ''}
                  onChange={(e) => handleInputChange('client', 'phone', e.target.value)}
                  placeholder="77 123 45 67"
                  className="invoice-form-input w-full"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={invoiceData.client?.email || ''}
                  onChange={(e) => handleInputChange('client', 'email', e.target.value)}
                  placeholder="client@email.com"
                  className="invoice-form-input w-full"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION PRODUITS */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('items')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>📦 PRODUITS / SERVICES</span>
          <span className="text-gray-500">{openSections.items ? '−' : '+'}</span>
        </button>
        
        {openSections.items && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Articles facturés</h4>
              <button
                onClick={(e) => handleTouchEvent(e, onAddItem)}
                onTouchEnd={(e) => handleTouchEvent(e, onAddItem)}
                className="add-product-button touch-optimized"
                aria-label="Ajouter un produit"
              >
                + Ajouter un produit
              </button>
            </div>
            
            <div className="space-y-4">
              {invoiceData.invoice?.items?.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-semibold text-gray-900">Article #{index + 1}</h5>
                    {invoiceData.invoice.items.length > 1 && (
                      <button
                        onClick={(e) => handleTouchEvent(e, () => removeItem(index))}
                        onTouchEnd={(e) => handleTouchEvent(e, () => removeItem(index))}
                        className="remove-product-button touch-optimized"
                        aria-label={`Supprimer l'article ${index + 1}`}
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Désignation *</label>
                      <input
                        type="text"
                        value={item?.description || ''}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Description du produit/service"
                        className={`product-input w-full ${
                          validationErrors[`items.${index}.description`] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        required
                        autoComplete="off"
                        inputMode="text"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
                      <input
                        type="text"
                        value={item?.quantity || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '') {
                            handleItemChange(index, 'quantity', '')
                          } else {
                            const numValue = parseInt(value.replace(/[^0-9]/g, ''))
                            if (!isNaN(numValue) && numValue > 0) {
                              handleItemChange(index, 'quantity', numValue)
                            }
                          }
                        }}
                        placeholder="Ex: 2"
                        className="product-input w-full"
                        autoComplete="off"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix unitaire (FCFA)</label>
                      <input
                        type="text"
                        value={item?.price || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === '') {
                            handleItemChange(index, 'price', 0)
                          } else {
                            const numValue = parseFloat(value.replace(/[^0-9.]/g, ''))
                            if (!isNaN(numValue)) {
                              handleItemChange(index, 'price', numValue)
                            }
                          }
                        }}
                        placeholder="Ex: 15000"
                        className="product-input w-full"
                        autoComplete="off"
                        inputMode="decimal"
                        pattern="[0-9]*[.,]?[0-9]*"
                      />
                    </div>
                  </div>
                  
                  {/* Total de la ligne */}
                  <div className="mt-3 text-right">
                    <span className="text-sm text-gray-600">Total ligne: </span>
                    <span className="font-semibold text-gray-900">
                      {((item?.price || 0) * (item?.quantity === '' ? 0 : (item?.quantity || 0))).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total général */}
            <div className="total-calculation-zone">
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">
                  Total général: {(invoiceData.total || 0).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
            
            {/* Message d'erreur mobile */}
            {mobileError && (
              <div className="mobile-error-message">
                {mobileError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION PAIEMENT */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('payment')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>💳 PAIEMENT</span>
          <span className="text-gray-500">{openSections.payment ? '−' : '+'}</span>
        </button>
        
        {openSections.payment && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode de paiement
              </label>
              <select
                value={invoiceData.company?.mobileMoneyService || ''}
                onChange={(e) => handleInputChange('company', 'mobileMoneyService', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Sélectionner un mode de paiement</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Wave">Wave</option>
                <option value="Paiement espèce">Paiement espèce</option>
              </select>
            </div>

            {/* Numéro Mobile Money */}
            {invoiceData.company?.mobileMoneyService && invoiceData.company.mobileMoneyService !== 'Paiement espèce' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro {invoiceData.company.mobileMoneyService}
                </label>
                <input
                  type="tel"
                  value={invoiceData.company?.mobileMoneyNumber || ''}
                  onChange={(e) => handleInputChange('company', 'mobileMoneyNumber', e.target.value)}
                  placeholder={invoiceData.company.mobileMoneyService === 'Orange Money' ? '77 123 45 67' : '70 123 45 67'}
                  className="invoice-form-input w-full"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION NOTES */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('notes')}
          className="w-full px-4 py-3 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
        >
          <span>📝 NOTES</span>
          <span className="text-gray-500">{openSections.notes ? '−' : '+'}</span>
        </button>
        
        {openSections.notes && (
          <div className="p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message personnalisé
              </label>
              <textarea
                value={invoiceData.invoice?.notes || ''}
                onChange={(e) => handleInputChange('invoice', 'notes', e.target.value)}
                placeholder="Ex: Merci pour votre confiance !"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                Suggestions: "Merci pour votre confiance !", "Paiement sous 30 jours", "Contactez-nous pour toute question"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}