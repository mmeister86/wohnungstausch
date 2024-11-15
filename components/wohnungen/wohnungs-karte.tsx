"use client"
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
import { Building, Square, Euro, ParkingSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
  const [currentPhoto, setCurrentPhoto] = useState(0);

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
        <div className="relative w-full h-48 group">
          <Image
            src={bilder[currentPhoto] || "/placeholder.jpg"}
            alt={titel}
            fill
            className="object-cover rounded-t-lg"
          />
          {bilder.length > 1 && (
            <>
              <div className="absolute inset-0 flex items-center justify-between z-10 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPhoto((prev) => (prev - 1 + bilder.length) % bilder.length);
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPhoto((prev) => (prev + 1) % bilder.length);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {currentPhoto + 1} / {bilder.length}
              </div>
            </>
          )}
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
