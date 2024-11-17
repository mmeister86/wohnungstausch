import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Ban, Euro, Bed, Home, House } from "lucide-react";
import { WohnungResponse } from "@/types";

interface WohnungProps {
  wohnung: WohnungResponse;
}

export default function WohnungsCardHorizontal({ wohnung }: WohnungProps) {
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
    <Card className="flex flex-row hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative w-1/3 min-h-[200px] rounded-l-lg overflow-hidden">
        <div className="w-full h-full hover:scale-110 transition-transform duration-700 ease-in-out">
        {bilder && bilder.length > 0 ? (
          <Image
            src={bilder[0]}
            alt={titel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.style.display = 'none';
              const parentDiv = imgElement.parentElement;
              if (parentDiv && !parentDiv.querySelector('.fallback-icon')) {
                parentDiv.classList.add('bg-gray-200', 'dark:bg-gray-700', 'flex', 'items-center', 'justify-center');
                const fallbackIcon = document.createElement('div');
                fallbackIcon.classList.add('fallback-icon');
                fallbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
                parentDiv.appendChild(fallbackIcon);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <House className="w-12 h-12 text-gray-400" />
          </div>
        )}
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-3">
        <div className="py-2 px-0">
          <h3 className="text-lg font-semibold mb-1 text-black dark:text-white">
            {titel}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {adresse}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {truncateText(beschreibung, 100)}
          </p>
        </div>

        <div className="py-2 px-0">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Euro className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">{miete} €</span>
            </div>
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">{flaeche} m²</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-emerald-600" />
              <span className="text-sm">{zimmer} Zimmer</span>
            </div>
            <div className="flex items-center gap-1">
              {stellplatz ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Ban className="w-4 h-4 text-red-600" />
              )}
              <span className="text-sm">
                {stellplatz ? "Stellplatz" : "Kein Stellplatz"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto py-2 px-0">
          <Link href={`/wohnungen/${id}`}>
            <Button  className="w-full bg-green-600 hover:bg-green-700">
              Details anzeigen
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
