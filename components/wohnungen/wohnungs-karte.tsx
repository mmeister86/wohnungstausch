"use client";

import * as React from "react";
import { useState } from "react";
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
import WohnungsDetail from "./wohnungs-detail";

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
  }
}

export default function WohnungsCard({ wohnung }: WohnungProps) {
  // Frühe Rückgabe, wenn wohnung undefined ist
  if (!wohnung) {
    return null;
  }

  const { id, titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

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
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2">{beschreibung}</p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{flaeche}m²</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{zimmer} Zimmer</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform"
          >
            Details ansehen
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
