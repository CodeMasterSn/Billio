'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../../config/emailjs'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * PAGE DE CONTACT - BILLIO
 * 
 * Cette page gère le formulaire de contact avec EmailJS pour l'envoi d'emails.
 * 
 * Fonctionnalités :
 * - Formulaire de contact avec validation
 * - Intégration EmailJS pour l'envoi d'emails
 * - FAQ interactive
 * - Carte Google Maps
 * - Tracking des événements
 * 
 * Technologies utilisées :
 * - EmailJS pour l'envoi d'emails côté client
 * - React hooks pour la gestion d'état
 * - Validation côté client
 */

export default function ContactPage() {
  // États React pour le formulaire EmailJS
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [errors, setErrors] = useState({})
  const [openFAQ, setOpenFAQ] = useState(null)

  const formRef = useRef()

  // Vérification de la configuration EmailJS au chargement
  useEffect(() => {
    console.log('Configuration EmailJS:', emailjsConfig)
    
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      console.error('Configuration EmailJS incomplète!')
    }
  }, [])

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Gestionnaire de changement formulaire
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Supprimer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Fonction handleSubmit complète - Gestion du formulaire EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    setErrors({})

    // Validation côté client des champs obligatoires
    const newErrors = {}
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est obligatoire'
    if (!formData.email.trim()) newErrors.email = 'L\'email est obligatoire'
    if (!formData.sujet) newErrors.sujet = 'Veuillez sélectionner un sujet'
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Préparer les données pour EmailJS selon le template configuré
      const templateParams = {
        from_name: formData.nom,
        from_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        to_email: 'billio.africa@gmail.com'
      }

      console.log('Tentative envoi EmailJS avec:', templateParams)
      console.log('Config EmailJS:', emailjsConfig)

      // Envoi EmailJS avec gestion d'erreur améliorée
      // EmailJS permet d'envoyer des emails directement depuis le frontend
      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      )

      console.log('Succès EmailJS:', response)
      
      // Tracking Google Analytics si disponible
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
          'subject_category': formData.sujet
        })
      }

      setSubmitStatus('success')
      
      // Reset automatique du formulaire après succès
      setTimeout(() => {
        setFormData({
          nom: '',
          email: '',
          sujet: '',
          message: ''
        })
        setSubmitStatus('')
      }, 2000)

    } catch (error) {
      // Logging détaillé des erreurs EmailJS pour le debugging
      console.error('=== ERREUR EMAILJS COMPLÈTE ===')
      console.error('Erreur objet:', error)
      console.error('Message:', error?.message || 'Pas de message')
      console.error('Status:', error?.status || 'Pas de status')
      console.error('Text:', error?.text || 'Pas de texte')
      console.error('Stack:', error?.stack || 'Pas de stack')
      console.error('================================')
      
      setSubmitStatus('error')
      
      // Tracking des erreurs pour analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_error', {
          'error_message': error?.message || 'Erreur inconnue'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // FAQ data
  const faqs = [
    {
      question: "Comment créer ma première facture ?",
      answer: "Rendez-vous dans la section 'Créer une facture', remplissez les informations de votre entreprise, ajoutez vos produits/services, et téléchargez votre facture au format PDF."
    },
    {
      question: "Puis-je personnaliser mes factures ?",
      answer: "Oui ! Vous pouvez ajouter votre logo, personnaliser les couleurs, et modifier les informations de votre entreprise pour créer des factures qui reflètent votre marque."
    },
    {
      question: "Les factures sont-elles conformes aux réglementations sénégalaises ?",
      answer: "Billio génère des factures professionnelles avec tous les éléments requis. Pour une conformité totale, consultez un expert-comptable pour vos besoins spécifiques."
    },
    {
      question: "Puis-je sauvegarder mes informations d'entreprise ?",
      answer: "Actuellement, vous devez saisir vos informations à chaque facture. Nous travaillons sur un système de sauvegarde pour les utilisateurs Premium."
    },
    {
      question: "Comment puis-je recevoir mes paiements ?",
      answer: "Billio vous aide à créer des factures professionnelles. Pour les paiements, vous pouvez utiliser les paiements mobiles (Orange Money, Wave), virements bancaires, ou espèces selon vos préférences."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Non ! Billio est entièrement gratuit pour créer des factures illimitées. Nous proposerons bientôt des fonctionnalités Premium optionnelles."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Hero Section avec image de fond */}
      <div 
        className="relative h-96"
        style={{
          backgroundImage: `url('/images/hero/contact-banner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-Nous
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou support.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de contact optimisé avec EmailJS */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-blue-600">Envoyez-nous</span> <span className="text-gray-900">un Message</span>
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Nom complet */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-2 text-gray-900">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: Amadou Diallo"
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-600 ${errors.nom ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-600 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="sujet" className="block text-sm font-medium mb-2 text-gray-900">
                  Sujet *
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 ${errors.sujet ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="📋 Support technique (bug, problème)">📋 Support technique (bug, problème)</option>
                  <option value="❓ Question sur les fonctionnalités">❓ Question sur les fonctionnalités</option>
                  <option value="🤝 Demande de partenariat">🤝 Demande de partenariat</option>
                  <option value="💰 Informations tarification Premium">💰 Informations tarification Premium</option>
                  <option value="🚀 Suggestion d'amélioration">🚀 Suggestion d'amélioration</option>
                  <option value="📞 Autre (précisez dans le message)">📞 Autre (précisez dans le message)</option>
                </select>
                {errors.sujet && <p className="text-red-500 text-sm mt-1">{errors.sujet}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                  rows={6}
                  maxLength={500}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-600 ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 resize-none`}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  <p className="text-gray-500 text-sm ml-auto">{formData.message.length}/500 caractères</p>
                </div>
              </div>

              {/* Messages de statut */}
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  ✅ Message envoyé avec succès ! Nous vous répondrons rapidement.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  ❌ Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
                </div>
              )}

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                } text-white`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-blue-600">Informations</span> de Contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">billio.africa@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+221 77 677 87 47</p>
                    <p className="text-sm text-gray-500 mt-1">Disponible 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">Dakar, Rufisque Ouest</p>
                    <p className="text-sm text-gray-500 mt-1">Sénégal</p>
                  </div>
                </div>

                {/* Carte Google Maps */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">
                    <span className="text-blue-600">Notre</span> Localisation
                  </h3>
                  <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.5!2d-17.4441!3d14.6937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sRufisque%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2ssn!4v1234567890123!5m2!1sfr!2ssn"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-48 sm:h-56 lg:h-64"
                    ></iframe>
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium shadow-lg">
                      📍 Rufisque, Sénégal
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Rufisque Ouest, Dakar - Sénégal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-blue-600">Questions</span> <span className="text-gray-900">Fréquentes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes sur Billio.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}