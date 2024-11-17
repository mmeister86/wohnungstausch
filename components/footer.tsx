import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Kontakt</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">E-Mail: matthiasmeister@bundeswehr.org</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Telefon: +49 123 456789</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/impressum" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link href="/impressum" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/nutzungsbedingungen" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Nutzungsbedingungen</Link></li>
            </ul>
          </div>
          <div id="about">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Über uns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Diese Plattform ist ein privates Projekt anlässlich der Aufstellung OFK
              und hat keinen Bezug zum Dienstherrn und der zu erwartenden Umzüge i.R. von Versetzungen. Dieses Portal ersetzt auch keine Wohnungsfürsorge, sondern ist meine Art, ein zu erwartendes Problem anlässlich der geringen Verfügbarkeit von geeigneten TG-Wohnungen zu lösen. <br/> Bei Fragen, Bugs oder Problemen bitte an meine eMail-Adresse schreiben oder einfach anrufen.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Matthias Meister.
        </div>
      </div>
    </footer>
  )
}
