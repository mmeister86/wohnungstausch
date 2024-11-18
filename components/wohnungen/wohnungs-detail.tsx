"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Euro,
  Home,
  ChevronLeft,
  ChevronRight,
  Bed,
  CheckCircle,
  Ban,
  Pencil,
} from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { geocodeAddress } from "@/lib/geocoding";
import Loader from "../ui/Loader";
import { useAuth } from "@/lib/auth-context";

const PermanentLocationsMap = dynamic(
  () => import("@/components/permanent-locations-map"),
  { ssr: false }
);

interface WohnungsDetailProps {
  wohnung?: {
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
    user: {
      name: string;
      email: string;
      telefon: string;
    };
  };
}

export function WohnungsDetailSkeleton() {
  return (
    <Card className="w-full bg-white dark:bg-gray-800 rounded-lg">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center mt-2">
          <Skeleton className="w-5 h-5 mr-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Bildergalerie Skeleton */}
        <div className="space-y-4">
          <Skeleton className="relative aspect-video w-full overflow-hidden rounded-lg" />

          {/* Thumbnail Carousel Skeleton */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className="flex-shrink-0 w-24 h-24 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Beschreibung Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Karte Skeleton */}
        <div className="h-[400px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </CardContent>
    </Card>
  );
}

export default function WohnungsDetail({ wohnung }: WohnungsDetailProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const { user } = useAuth();

  const isOwner = user && wohnung?.user?.email === user.email;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!wohnung) return;

    const { strasse, hausnummer, plz, stadt } = wohnung;

    async function loadCoordinates() {
      try {
        setGeocodingError(null);
        const result = await geocodeAddress(strasse, hausnummer, plz, stadt);
        if (result) {
          setCoordinates([result.lat, result.lon]);
        } else {
          setGeocodingError("Konnte die Adresse nicht finden");
        }
      } catch (error) {
        console.error("Error loading coordinates:", error);
        setGeocodingError("Fehler beim Laden der Koordinaten");
        setCoordinates(null);
      }
    }

    loadCoordinates();
  }, [wohnung]);

  if (!wohnung) {
    return <WohnungsDetailSkeleton />;
  }

  const {
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
  console.log("Wohnung object:", wohnung);
  console.log("User data:", user);
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % bilder.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + bilder.length) % bilder.length);
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 rounded-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{titel}</CardTitle>
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              className="text-black dark:text-white"
            >
              <Pencil className="w-4 h-4 mr-1" /> Bearbeiten
            </Button>
          )}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{adresse}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 relative z-10">
        {/* Bildergalerie */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {bilder.length > 0 ? (
              <>
                <div className="absolute inset-0 flex items-center justify-between z-10 px-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPhoto}
                    className="bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPhoto}
                    className="bg-white/80 hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <Image
                  src={bilder[currentPhoto]}
                  alt={`Foto ${currentPhoto + 1} von ${titel}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
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
                      placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 dark:text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Home className="w-24 h-24 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

          {/* Thumbnail Carousel */}
          <div className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2">
                {bilder.map((bild, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden transition-all hover:opacity-100 ${
                      currentPhoto === index ? "" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={bild}
                      alt={`Vorschau ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                      onError={(e) => {
                        // Wenn das Thumbnail nicht geladen werden kann, zeige den Platzhalter
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (
                          parent &&
                          !parent.querySelector(".placeholder-icon")
                        ) {
                          parent.classList.add(
                            "bg-gray-200",
                            "dark:bg-gray-700",
                            "flex",
                            "items-center",
                            "justify-center"
                          );
                          const placeholder = document.createElement("div");
                          placeholder.className = "placeholder-icon";
                          placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 dark:text-gray-500"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{flaeche} m²</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bed className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{zimmer} Zimmer</span>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{miete} €/Monat</span>
          </div>
          <div className="flex items-center space-x-2">
            {stellplatz ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Ban className="w-5 h-5 text-red-600" />
            )}
            <span className="text-lg">
              {stellplatz ? "Stellplatz vorhanden" : "Kein Stellplatz"}
            </span>
          </div>
        </div>

        {/* Beschreibung */}
        {beschreibung && (
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4">Beschreibung</h3>
            <p className="whitespace-pre-wrap">{beschreibung}</p>
          </div>
        )}


        {/* Karte */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Standort</h3>
          {mapLoaded ? (
            <div className="h-[400px] rounded-lg overflow-hidden">
              {geocodingError ? (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                  {geocodingError}
                </div>
              ) : !coordinates ? (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <Loader />
                </div>
              ) : (
                <PermanentLocationsMap
                  currentApartmentCoordinates={coordinates}
                />
              )}
            </div>
          ) : null}
          <p className="text-xs text-gray-600 dark:text-gray-400 pt-6">* die hier dargestellten Routen werden automatisch generiert. Das sind nicht zwingend die kürzesten Wege zur Dienststelle, aber sie geben einen ersten Anhalt zur Orientierung.</p>
        </div>
      </CardContent>
    </Card>
  );
}
