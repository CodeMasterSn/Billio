import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Billio</h3>
            <p className="text-gray-400">
              La solution de facturation en ligne pour freelances et petites entreprises en Afrique.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/create-invoice" className="hover:text-white transition-colors">Créer une facture</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Centre d'aide</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>billio.africa@gmail.com</li>
              <li>+221 77 677 87 47</li>
              <li>Dakar, Rufisque Ouest</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Billio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
