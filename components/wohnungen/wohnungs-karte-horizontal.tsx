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
import Image from "next/image";
import Link from "next/link";
import { Square, CarFront, Euro, Bed, Home } from "lucide-react";
import { WohnungResponse } from "@/types";

interface WohnungProps {
  wohnung: WohnungResponse;
}

export default function WohnungsCardHorizontal({ wohnung }: WohnungProps) {
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

  // Frühe Rückgabe, wenn wohnung undefined ist
  if (!wohnung) {
    return null;
  }

  return (
    <Card className="flex flex-row hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative w-1/3 min-h-[200px] rounded-l-lg overflow-hidden">
        {bilder && bilder.length > 0 ? (
          <Image
            src={bilder[0]}
            alt={titel}
            fill
            className="object-cover rounded-l-lg hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              // Wenn das Bild nicht geladen werden kann, zeige den Platzhalter
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.placeholder-icon')) {
                parent.classList.add('bg-gray-200', 'dark:bg-gray-700', 'flex', 'items-center', 'justify-center');
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-icon';
                placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 dark:text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
                parent.appendChild(placeholder);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Home className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
      <div className="w-2/3 flex flex-col p-3">
        <CardHeader className="py-2 px-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold">{titel}</CardTitle>
          </div>
          <CardDescription className="text-sm">{adresse}</CardDescription>
          {beschreibung && (
            <CardDescription className="text-sm mt-1 text-gray-800">
              {truncateText(beschreibung, 100)}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="py-2 px-0">
          <div className="flex gap-4">
            <span className="text-sm flex items-center gap-1">
              <Square className="h-4 w-4" /> {flaeche}m²
            </span>
            <span className="text-sm flex items-center gap-1">
              <Bed className="h-4 w-4" /> {zimmer} Zimmer
            </span>
            <span className="text-sm flex items-center gap-1">
              <Euro className="h-4 w-4" /> {miete}€
            </span>
            <span className="text-sm flex items-center gap-1">
              <CarFront
                className={`h-4 w-4 ${
                  stellplatz ? "text-green-600" : "text-gray-400"
                }`}
              />
              {stellplatz ? "inkl. Stellplatz" : "ohne Stellplatz"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-auto py-2 px-0">
          <Link href={`/wohnungen/${id}`} className="w-full">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg">
              Details
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
