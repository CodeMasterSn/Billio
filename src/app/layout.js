import './globals.css'
import '../styles/modal-animations.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Billio - facturation en ligne',
  description: 'Billio est la plateforme de facturation et de paiement pensée pour freelances et petites entreprises en Afrique. Créez vos factures et recevez vos paiements facilement.',
  icons: {
    icon: '/favicons/favicon.png',
    shortcut: '/favicons/favicon.png',
    apple: '/favicons/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
