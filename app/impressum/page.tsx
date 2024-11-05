import React from 'react'

const Impressum = () => {
  return (
    <div className="container mx-auto h-full p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Impressum</h2>
      <p className="mb-4">
        Angaben gemäß § 5 TMG
        <br />
        Max Mustermann
        <br />
        Musterstraße 1
        <br />
        12345 Musterstadt
      </p>

      <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
      <p className="mb-4">
        Telefon: +49 (0) 123 456789
        <br />
        E-Mail: max.mustermann@example.com
      </p>

      <h2 className="text-2xl font-bold mb-4">Datenschutzhinweise</h2>
      <p className="mb-4">
        Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
        EU-Datenschutzgrundverordnung (DSGVO), ist:
        <br />
        Max Mustermann
      </p>

      <h2 className="text-2xl font-bold mb-4">Hosting</h2>
      <p className="mb-4">
        Diese Website wird auf den Servern von Vercel gehostet. <br />
        Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, ist für die Verarbeitung der Daten verantwortlich, 
        die im Zusammenhang mit dem Hosting dieser Website entstehen.
      </p>

      <h3 className="text-xl font-bold mb-2">Ihre Rechte als betroffene Person</h3>
      <p className="mb-4">
        Sie haben das Recht Auskunft über Ihre bei uns gespeicherten
        personenbezogenen Daten zu erhalten sowie das Recht auf Berichtigung,
        Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen
        Daten.
        <br />
        Zudem haben Sie das Recht, Ihre Einwilligung zur Verarbeitung Ihrer
        personenbezogenen Daten jederzeit zu widerrufen.
        <br />
        Sie haben außerdem das Recht, Ihre Daten in einem strukturierten,
        gängigen und maschinenlesbaren Format zu erhalten und diese Daten an
        einen anderen Verantwortlichen zu übermitteln.
        <br />
        Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
      </p>

      <h3 className="text-xl font-bold mb-2">Erfassung allgemeiner Informationen beim Besuch unserer Website</h3>
      <p className="mb-4">
        Wenn Sie auf unsere Website zugreifen, werden durch Vercel automatisch Informationen
        allgemeiner Natur erfasst. Diese Informationen umfassen beispielsweise
        die Art des Webbrowsers, das verwendete Betriebssystem, die Domain des
        zugreifenden Rechners sowie die IP-Adresse. Diese Daten werden ausschließlich
        zu statistischen Zwecken erfasst und verarbeitet. Sie werden nicht mit
        anderen personenbezogenen Daten in Verbindung gebracht.
      </p>

      <h3 className="text-xl font-bold mb-2">Nutzung von LLM zur Erstellung dieses Impressums</h3>
      <p className="mb-4">
        Dieses Impressum wurde mit Hilfe eines Large Language Models (LLM) erstellt. 
        Die Verwendung von LLM ermöglicht eine effiziente und korrekte Generierung von 
        rechtlichen Texten, wie z.B. Impressumsangaben, Datenschutzhinweisen und 
        allgemeinen Informationen zur Datenverarbeitung.
      </p>

    </div>

  )
}

export default Impressum