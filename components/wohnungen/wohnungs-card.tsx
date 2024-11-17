"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Euro, Home, Bed, CheckCircle, Ban } from "lucide-react";

type WohnungProps = {
  wohnung: {
    id: number;
    titel: string;
    beschreibung: string | null;
    strasse: string;
    hausnummer: string;
    plz: string;
    stadt: string;
    miete: number;
    flaeche: number;
    zimmer: number;
    stellplatz: boolean;
    bilder?: string[];
    user: {
      name: string | null;
      email: string | null;
      telefon: string | null;
    };
  };
  className?: string;
};

export function WohnungsCard({ wohnung, className }: WohnungProps) {
  return (
    <Link href={`/wohnungen/${wohnung.id}`}>
      <div
        className={`w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
          className || ""
        }`}
      >
        {wohnung.bilder && wohnung.bilder.length > 0 ? (
          <div className="w-full h-48 relative">
            <Image
              src={wohnung.bilder[0]}
              alt={wohnung.titel}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
              priority={false}
              onError={(e) => {
                // Wenn das Bild nicht geladen werden kann, zeige den Platzhalter
                const target = e.target as HTMLElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".placeholder-icon")) {
                  parent.classList.add(
                    "bg-gray-200",
                    "dark:bg-gray-700",
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                  const placeholder = document.createElement("div");
                  placeholder.className = "placeholder-icon";
                  placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 dark:text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Home className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{wohnung.titel}</h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {wohnung.strasse} {wohnung.hausnummer}, {wohnung.plz}{" "}
              {wohnung.stadt}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Euro className="w-4 h-4 mr-1" />
              <span>{Math.round(wohnung.miete)}€</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Home className="w-4 h-4 mr-1" />
              <span>{wohnung.flaeche}m²</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Bed className="w-4 h-4 ml-1 mr-2" />
              <span>{wohnung.zimmer} Zimmer</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              {wohnung.stellplatz ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-700" />
                  <span>inkl. Stellplatz</span>
                </>
              ) : (
                <>
                  <Ban className="w-4 h-4 mr-1 text-red-600" />
                  <span>ohne Stellplatz</span>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-2">Kontakt:</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {wohnung.user.name && (
                <p className="flex">
                  <span className="w-16 font-medium">Name:</span>{" "}
                  {wohnung.user.name}
                </p>
              )}
              {wohnung.user.email && (
                <p className="flex">
                  <span className="w-16 font-medium">Email:</span>
                  <a
                    href={`mailto:${wohnung.user.email}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {wohnung.user.email}
                  </a>
                </p>
              )}
              {wohnung.user.telefon && (
                <p className="flex">
                  <span className="w-16 font-medium">Telefon:</span>
                  <a
                    href={`tel:${wohnung.user.telefon}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {wohnung.user.telefon}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
