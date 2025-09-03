import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DABO LOGISTIQUES - Transport, Maritime, Fret Aérien, Conseils',
  description: 'Solutions complètes de transit et logistique internationale. Gestion professionnelle de vos expéditions avec facturation automatisée.',
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
