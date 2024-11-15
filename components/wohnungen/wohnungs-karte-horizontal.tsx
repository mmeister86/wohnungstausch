import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Building, Square, CarFront, Euro } from "lucide-react";

interface WohnungProps {
  wohnung: {
    id: string
    titel: string
    beschreibung: string | null
    strasse: string
    hausnummer: string
    plz: string
    stadt: string
    flaeche: number
    zimmer: number
    miete: number
    bilder: string[]
    stellplatz: boolean
  }
}

export default function WohnungsCardHorizontal({ wohnung }: WohnungProps) {
  const { id, titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder, stellplatz } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Frühe Rückgabe, wenn wohnung undefined ist
  if (!wohnung) {
    return null;
  }

  return (
    <Link href={`/wohnungen/${id}`} className="block">
      <Card className="flex flex-row hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-1/3">
          <Image
            src={bilder[0] || "/placeholder.jpg"}
            alt={titel}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <CardHeader className="py-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold">{titel}</CardTitle>
              <Badge variant="secondary">{miete} €</Badge>
            </div>
            <CardDescription className="text-sm">{adresse}</CardDescription>
            {beschreibung && (
              <CardDescription className="text-sm mt-1 text-gray-600">
                {truncateText(beschreibung, 100)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex gap-4">
              <span className="text-sm flex items-center gap-1">
                <Square className="h-4 w-4" /> {flaeche}m²
              </span>
              <span className="text-sm flex items-center gap-1">
                <Building className="h-4 w-4" /> {zimmer} Zimmer
              </span>
              <span className="text-sm flex items-center gap-1">
                <Euro className="h-4 w-4" /> {miete}€
              </span>
              <span className="text-sm flex items-center gap-1">
                <CarFront className={`h-4 w-4 ${stellplatz ? 'text-green-600' : 'text-gray-400'}`} />
                {stellplatz ? 'inkl. Stellplatz' : 'ohne Stellplatz'}
              </span>
            </div>
          </CardContent>
          <CardFooter className="mt-auto py-2">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
