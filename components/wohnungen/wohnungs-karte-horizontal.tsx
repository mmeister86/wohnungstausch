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
  }
}

export default function WohnungsCardHorizontal({ wohnung }: WohnungProps) {
  const { id, titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

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
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex gap-4">
              <span className="text-sm">{flaeche}m²</span>
              <span className="text-sm">{zimmer} Zimmer</span>
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
