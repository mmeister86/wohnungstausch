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
import { Building, Square, Euro, ParkingSquare } from "lucide-react";

interface WohnungProps {
  wohnung: {
    id: string;
    titel: string;
    beschreibung: string | null;
    strasse: string;
    hausnummer: string;
    plz: string;
    stadt: string;
    flaeche: number;
    zimmer: number;
    miete: number;
    bilder: string[];
    stellplatz: boolean;
  };
}

export default function WohnungsCard({ wohnung }: WohnungProps) {
  // Frühe Rückgabe, wenn wohnung undefined ist
  if (!wohnung) {
    return null;
  }

  const {
    id,
    titel,
    beschreibung,
    strasse,
    hausnummer,
    plz,
    stadt,
    flaeche,
    zimmer,
    miete,
    bilder,
    stellplatz,
  } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Link href={`/wohnungen/${id}`} className="block">
      <Card className="flex flex-col h-full w-[350px] overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={bilder[0] || "/placeholder.jpg"}
            alt={titel}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{titel}</CardTitle>
            <Badge variant="secondary">{miete} €</Badge>
          </div>
          <CardDescription>{adresse}</CardDescription>
          {beschreibung && (
            <CardDescription className="text-sm mt-1 text-gray-600">
              {truncateText(beschreibung, 100)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <span className="text-sm flex items-center gap-1">
              <Square className="h-4 w-4" /> {flaeche}m²
            </span>
            <span className="text-sm flex items-center gap-1">
              <Building className="h-4 w-4" /> {zimmer} Zi
            </span>
            <span className="text-sm flex items-center gap-1">
              <Euro className="h-4 w-4" /> {miete}€
            </span>
            <span className="text-sm flex items-center gap-1">
              <ParkingSquare
                className={`h-4 w-4 ${
                  stellplatz ? "text-green-600" : "text-red-700"
                }`}
              />
              {stellplatz ? "ja" : "nein"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform">
            Details ansehen
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
