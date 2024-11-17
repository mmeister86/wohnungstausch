"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WohnungsFormularTippsProps {
  activeField: string | null;
  className?: string;
}

const tippsMap: Record<string, { title: string; description: string }> = {
  titel: {
    title: "Titel der Anzeige",
    description:
      "Wählen Sie einen prägnanten Titel, der die wichtigsten Merkmale Ihrer Wohnung hervorhebt, z.B. '3-Zimmer-Wohnung mit Balkon in ruhiger Lage'.",
  },
  beschreibung: {
    title: "Beschreibung",
    description:
      "Beschreiben Sie die besonderen Merkmale Ihrer Wohnung. Erwähnen Sie z.B. die Ausstattung, Renovierungen, Besonderheiten der Umgebung und ÖPNV-Anbindung.",
  },
  strasse: {
    title: "Straße",
    description:
      "Bitte geben Sie den Straßennamen korrekt ein. Die genaue Adresse ist wichtig für Interessenten, um die Lage zu bewerten, und um die Lage korrekt auf der Karte darzustelen.",
  },
  hausnummer: {
    title: "Hausnummer",
    description:
      "Die vollständige Hausnummer inklusive möglicher Zusätze (z.B. 12a).",
  },
  plz: {
    title: "Postleitzahl",
    description: "Die fünfstellige Postleitzahl Ihrer Wohnung.",
  },
  stadt: {
    title: "Stadt",
    description: "Der Name der Stadt oder Gemeinde.",
  },
  flaeche: {
    title: "Wohnfläche",
    description:
      "Die gesamte Wohnfläche in Quadratmetern. Berücksichtigen Sie alle Räume, aber keine Kellerräume oder den Dachboden.",
  },
  zimmer: {
    title: "Anzahl der Zimmer",
    description:
      "Geben Sie die Anzahl der Wohnräume an (ohne Küche und Bad). Halbe Zimmer können mit Dezimalpunkt angegeben werden (z.B. 2.5).",
  },
  kaltmiete: {
    title: "Kaltmiete",
    description: "Der monatliche Grundmietpreis ohne Nebenkosten.",
  },
  nebenkosten: {
    title: "Nebenkosten",
    description:
      "Monatliche Nebenkosten wie Hausmeister, Müllabfuhr, etc. (ohne Heizung und Strom).",
  },
  stromkosten: {
    title: "Stromkosten",
    description:
      "Durchschnittliche monatliche Stromkosten. Falls nicht bekannt, können Sie einen Schätzwert angeben.",
  },
  heizkosten: {
    title: "Heizkosten",
    description:
      "Durchschnittliche monatliche Heizkosten. Bei Pauschalabrechnung den monatlichen Durchschnitt angeben.",
  },
  name: {
    title: "Ihr Name",
    description: "Ihr vollständiger Name für die Kontaktaufnahme.",
  },
  telefon: {
    title: "Telefonnummer",
    description:
      "Ihre Telefonnummer für Rückfragen. Format: Mit Vorwahl, z.B. 0123 45678900",
  },
  email: {
    title: "E-Mail-Adresse",
    description: "Ihre E-Mail-Adresse für Kontaktanfragen.",
  },
  dienstgrad: {
    title: "Dienstgrad",
    description: "Wählen Sie Ihren aktuellen Dienstgrad aus der Liste aus.",
  },
  stellplatz: {
    title: "Stellplatz",
    description:
      "Geben Sie an, ob ein Parkplatz oder eine Garage zur Wohnung gehört.",
  },
};

const WohnungsFormularTipps = ({
  activeField,
  className,
}: WohnungsFormularTippsProps) => {
  const activeTipp = activeField ? tippsMap[activeField] : null;

  return (
    <div className="sticky top-[76px]">
      <Card className={`${className} bg-slate-50 shadow-sm`}>
        <CardHeader className="bg-white">
          <CardTitle className="text-lg">
            {activeTipp ? activeTipp.title : "Ausfüllhilfe"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTipp ? (
            <p className="text-sm text-slate-600">{activeTipp.description}</p>
          ) : (
            <p className="text-sm text-slate-600">
              Wählen Sie ein Formularfeld aus, um hilfreiche Tipps zum Ausfüllen
              zu erhalten.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WohnungsFormularTipps;
