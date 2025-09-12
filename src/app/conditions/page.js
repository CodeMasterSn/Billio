'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ConditionsPage() {
  const [activeSection, setActiveSection] = useState('')

  // Table des matières
  const sections = [
    { id: "preambule", title: "1. Préambule" },
    { id: "definitions", title: "2. Définitions" },
    { id: "service", title: "3. Description du service" },
    { id: "acces", title: "4. Conditions d'accès" },
    { id: "utilisation", title: "5. Utilisation du service" },
    { id: "donnees", title: "6. Données utilisateur" },
    { id: "responsabilites", title: "7. Responsabilités" },
    { id: "propriete", title: "8. Propriété intellectuelle" },
    { id: "protection", title: "9. Protection des données" },
    { id: "suspension", title: "10. Suspension/Résiliation" },
    { id: "modification", title: "11. Modification des conditions" },
    { id: "droit", title: "12. Droit applicable" }
  ]

  // Fonction pour gérer le scroll vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <>
      <Head>
        <title>Conditions d'utilisation - Billio | Facturation Sénégal</title>
        <meta name="description" content="Conditions générales d'utilisation de Billio. Cadre légal pour l'utilisation de notre plateforme de facturation au Sénégal." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Conditions d'utilisation - Billio" />
        <meta property="og:description" content="Conditions générales d'utilisation de Billio" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">Conditions d'utilisation</span>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Conditions d'utilisation
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Conditions générales d'utilisation de la plateforme Billio
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-sm text-blue-800">
                  <strong>Dernière mise à jour :</strong> 15 janvier 2025
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table des matières */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Table des matières</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  
                  {/* 1. PRÉAMBULE */}
                  <section id="preambule" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Préambule</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="mb-4">
                        Les présentes conditions générales d'utilisation (ci-après "CGU") régissent l'utilisation de la plateforme Billio, service de création de factures en ligne accessible à l'adresse <strong>billiosn.netlify.app</strong>.
                      </p>
                      <p className="mb-4">
                        <strong>Éditeur du service :</strong> Billio<br />
                        <strong>Contact :</strong> billio.africa@gmail.com<br />
                        <strong>Siège social :</strong> Dakar, Rufisque Ouest, Sénégal
                      </p>
                      <p className="mb-4">
                        L'utilisation de la plateforme Billio implique l'acceptation pleine et entière des présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                      </p>
                      <p>
                        Ces conditions sont régies par le droit sénégalais et sont applicables à tous les utilisateurs situés sur le territoire de la République du Sénégal.
                      </p>
                    </div>
                  </section>

                  {/* 2. DÉFINITIONS */}
                  <section id="definitions" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Définitions</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="mb-4">Aux fins des présentes CGU, les termes suivants ont la signification qui leur est donnée ci-dessous :</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>"Service"</strong> : désigne la plateforme Billio permettant la création, la gestion et le téléchargement de factures en ligne.</li>
                        <li><strong>"Utilisateur"</strong> : désigne toute personne physique ou morale utilisant le Service.</li>
                        <li><strong>"Facture"</strong> : désigne tout document généré via la plateforme Billio contenant les informations de facturation.</li>
                        <li><strong>"Données"</strong> : désigne toutes les informations saisies par l'Utilisateur dans le cadre de l'utilisation du Service.</li>
                        <li><strong>"Plateforme"</strong> : désigne l'ensemble des fonctionnalités et services proposés par Billio.</li>
                        <li><strong>"CGU"</strong> : désigne les présentes conditions générales d'utilisation.</li>
                      </ul>
                    </div>
                  </section>

                  {/* 3. DESCRIPTION DU SERVICE */}
                  <section id="service" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Description du service</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="mb-4">
                        Billio est une plateforme de création de factures en ligne destinée aux freelances, indépendants et petites entreprises au Sénégal.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Fonctionnalités principales</h3>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Création de factures professionnelles</li>
                        <li>Téléchargement en format PDF</li>
                        <li>Impression directe des factures</li>
                        <li>Gestion de l'historique des factures</li>
                        <li>Personnalisation avec logo d'entreprise</li>
                        <li>Support des modes de paiement locaux (Wave, Orange Money, etc.)</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Disponibilité</h3>
                      <p className="mb-4">
                        Le Service est accessible 24 heures sur 24, 7 jours sur 7, sous réserve des interruptions nécessaires à la maintenance et aux mises à jour. Billio s'efforce de maintenir une disponibilité optimale mais ne peut garantir un fonctionnement ininterrompu.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 Évolutions</h3>
                      <p>
                        Billio se réserve le droit de modifier, améliorer ou étendre les fonctionnalités du Service à tout moment, sans préavis. Les nouvelles fonctionnalités sont soumises aux présentes CGU.
                      </p>
                    </div>
                  </section>

                  {/* 4. CONDITIONS D'ACCÈS */}
                  <section id="acces" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Conditions d'accès</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Territoire</h3>
                      <p className="mb-4">
                        Le Service est accessible depuis le territoire de la République du Sénégal. L'utilisation depuis d'autres territoires peut être soumise à des restrictions.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Âge et capacité</h3>
                      <p className="mb-4">
                        L'utilisation du Service est réservée aux personnes âgées d'au moins 18 ans ou aux mineurs avec l'autorisation de leurs représentants légaux. Pour les entreprises, l'utilisateur doit avoir la capacité juridique pour s'engager.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">4.3 Conformité légale</h3>
                      <p>
                        L'Utilisateur s'engage à respecter toutes les lois et réglementations en vigueur au Sénégal, notamment en matière de facturation, de TVA et de protection des données personnelles.
                      </p>
                    </div>
                  </section>

                  {/* 5. UTILISATION DU SERVICE */}
                  <section id="utilisation" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Utilisation du service</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Usage conforme</h3>
                      <p className="mb-4">
                        L'Utilisateur s'engage à utiliser le Service conformément à sa destination, c'est-à-dire pour la création de factures légitimes dans le cadre de son activité professionnelle ou commerciale.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Interdictions</h3>
                      <p className="mb-4">Il est strictement interdit de :</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Utiliser le Service à des fins frauduleuses ou illégales</li>
                        <li>Créer des factures pour des transactions fictives</li>
                        <li>Contourner les limitations techniques du Service</li>
                        <li>Porter atteinte aux droits de propriété intellectuelle</li>
                        <li>Transmettre des virus ou codes malveillants</li>
                        <li>Utiliser le Service de manière à nuire à son fonctionnement</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">5.3 Responsabilité de l'Utilisateur</h3>
                      <p>
                        L'Utilisateur est seul responsable de l'exactitude et de la conformité des informations qu'il saisit dans le Service. Il garantit que toutes les données fournies sont exactes, complètes et à jour.
                      </p>
                    </div>
                  </section>

                  {/* 6. DONNÉES UTILISATEUR */}
                  <section id="donnees" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Données utilisateur</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1 Collecte des données</h3>
                      <p className="mb-4">
                        Billio collecte uniquement les données nécessaires au fonctionnement du Service. Les données sont stockées localement sur l'appareil de l'Utilisateur (localStorage) et ne sont pas transmises à des serveurs externes.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2 Utilisation des données</h3>
                      <p className="mb-4">
                        Les données collectées sont utilisées exclusivement pour :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>La génération des factures</li>
                        <li>La sauvegarde de l'historique local</li>
                        <li>L'amélioration du Service</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.3 Protection des données</h3>
                      <p className="mb-4">
                        Billio s'engage à ne jamais vendre, louer ou transmettre les données de l'Utilisateur à des tiers. Aucune donnée personnelle n'est collectée sans le consentement explicite de l'Utilisateur.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">6.4 Droits de l'Utilisateur</h3>
                      <p>
                        L'Utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données. Ces droits peuvent être exercés en contactant Billio à l'adresse billio.africa@gmail.com.
                      </p>
                    </div>
                  </section>

                  {/* 7. RESPONSABILITÉS */}
                  <section id="responsabilites" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Responsabilités</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1 Responsabilité de Billio</h3>
                      <p className="mb-4">
                        Billio s'engage à fournir le Service avec diligence et selon les règles de l'art. Toutefois, Billio ne saurait être tenu responsable :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Des interruptions temporaires du Service</li>
                        <li>Des erreurs dans les données saisies par l'Utilisateur</li>
                        <li>De l'utilisation non conforme du Service</li>
                        <li>Des dommages indirects résultant de l'utilisation du Service</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2 Responsabilité de l'Utilisateur</h3>
                      <p className="mb-4">
                        L'Utilisateur est responsable de :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>L'exactitude des informations saisies</li>
                        <li>La conformité des factures aux obligations légales</li>
                        <li>L'usage conforme du Service</li>
                        <li>La sauvegarde de ses données importantes</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">7.3 Limitation de responsabilité</h3>
                      <p>
                        En aucun cas, la responsabilité de Billio ne pourra être engagée au-delà du montant des sommes effectivement payées par l'Utilisateur pour l'utilisation du Service au cours des douze derniers mois.
                      </p>
                    </div>
                  </section>

                  {/* 8. PROPRIÉTÉ INTELLECTUELLE */}
                  <section id="propriete" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Propriété intellectuelle</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Droits de Billio</h3>
                      <p className="mb-4">
                        La plateforme Billio, son design, son code source, ses fonctionnalités et tous les éléments qui la composent sont protégés par le droit de la propriété intellectuelle et appartiennent exclusivement à Billio.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Licence d'utilisation</h3>
                      <p className="mb-4">
                        Billio accorde à l'Utilisateur une licence d'utilisation non exclusive, non transférable et révocable pour utiliser le Service conformément aux présentes CGU.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.3 Contenu de l'Utilisateur</h3>
                      <p className="mb-4">
                        L'Utilisateur conserve tous ses droits sur le contenu qu'il crée via le Service (factures, logos, données). Billio ne revendique aucun droit de propriété sur ce contenu.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">8.4 Marques</h3>
                      <p>
                        Les marques, logos et signes distinctifs utilisés sur la plateforme sont protégés. Toute utilisation non autorisée est interdite.
                      </p>
                    </div>
                  </section>

                  {/* 9. PROTECTION DES DONNÉES */}
                  <section id="protection" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Protection des données</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.1 Conformité RGPD</h3>
                      <p className="mb-4">
                        Billio s'engage à respecter le Règlement Général sur la Protection des Données (RGPD) et la législation sénégalaise en matière de protection des données personnelles.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.2 Finalités de traitement</h3>
                      <p className="mb-4">
                        Les données personnelles sont traitées pour les finalités suivantes :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Fourniture du Service de facturation</li>
                        <li>Amélioration de l'expérience utilisateur</li>
                        <li>Support technique et client</li>
                        <li>Respect des obligations légales</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.3 Durée de conservation</h3>
                      <p className="mb-4">
                        Les données sont conservées pendant la durée d'utilisation du Service et jusqu'à 3 ans après la dernière utilisation, sauf obligation légale contraire.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">9.4 Droits de l'Utilisateur</h3>
                      <p>
                        L'Utilisateur dispose des droits suivants : accès, rectification, effacement, limitation du traitement, portabilité des données et opposition. Ces droits peuvent être exercés en contactant billio.africa@gmail.com.
                      </p>
                    </div>
                  </section>

                  {/* 10. SUSPENSION/RÉSILIATION */}
                  <section id="suspension" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Suspension/Résiliation</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.1 Suspension par Billio</h3>
                      <p className="mb-4">
                        Billio se réserve le droit de suspendre l'accès au Service en cas de :
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Non-respect des présentes CGU</li>
                        <li>Utilisation frauduleuse du Service</li>
                        <li>Atteinte à la sécurité du Service</li>
                        <li>Maintenance technique nécessaire</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.2 Résiliation par l'Utilisateur</h3>
                      <p className="mb-4">
                        L'Utilisateur peut cesser d'utiliser le Service à tout moment sans préavis. Il est responsable de la sauvegarde de ses données avant la résiliation.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">10.3 Conséquences de la résiliation</h3>
                      <p>
                        En cas de résiliation, l'Utilisateur perd l'accès au Service et à ses données stockées localement. Billio recommande de sauvegarder les données importantes avant toute résiliation.
                      </p>
                    </div>
                  </section>

                  {/* 11. MODIFICATION DES CONDITIONS */}
                  <section id="modification" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Modification des conditions</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.1 Droit de modification</h3>
                      <p className="mb-4">
                        Billio se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.2 Information des utilisateurs</h3>
                      <p className="mb-4">
                        Les utilisateurs seront informés des modifications importantes par email ou par un avis sur la plateforme. La date de dernière mise à jour est indiquée en haut de ce document.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.3 Acceptation</h3>
                      <p className="mb-4">
                        L'utilisation continue du Service après modification des CGU vaut acceptation des nouvelles conditions.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">11.4 Droit de résiliation</h3>
                      <p>
                        En cas de désaccord avec les modifications, l'Utilisateur peut cesser d'utiliser le Service. Aucun remboursement ne sera effectué pour les services déjà utilisés.
                      </p>
                    </div>
                  </section>

                  {/* 12. DROIT APPLICABLE */}
                  <section id="droit" className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Droit applicable</h2>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.1 Loi applicable</h3>
                      <p className="mb-4">
                        Les présentes CGU sont régies par le droit sénégalais, notamment le Code des obligations civiles et commerciales et les lois applicables en République du Sénégal.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.2 Compétence juridictionnelle</h3>
                      <p className="mb-4">
                        En cas de litige, les tribunaux de Dakar seront seuls compétents, nonobstant la pluralité de défendeurs ou l'appel en garantie.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.3 Langue</h3>
                      <p className="mb-4">
                        Les présentes CGU sont rédigées en français. En cas de traduction, seule la version française fait foi.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">12.4 Résolution amiable</h3>
                      <p>
                        Avant tout recours judiciaire, les parties s'efforceront de résoudre leurs différends à l'amiable. En cas d'échec, le litige sera porté devant les tribunaux compétents.
                      </p>
                    </div>
                  </section>

                  {/* Contact */}
                  <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Questions sur ces conditions ?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Notre équipe est à votre disposition pour toute clarification.
                    </p>
                    <a
                      href="mailto:billio.africa@gmail.com"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Nous contacter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}


