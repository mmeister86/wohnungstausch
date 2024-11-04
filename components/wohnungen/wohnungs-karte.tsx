"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import WohnungsDetail from "./wohnungs-detail";
import { Building, Square, CarFront, Euro } from "lucide-react";

export default function WohnungsCard() {
  // State für das Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="w-[350px] overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wohnungsfoto"
            fill
            sizes="(max-width: 350px) 100vw, 350px"
            style={{
              objectFit: "cover",
            }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            2-Zimmer-Wohnung
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Beispielstraße 8, 13405 Berlin
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            Ich biete diese geräumige Zweizimmerwohnung in Berlin Reinickendorf
            zum Tausch an. Genießen Sie den modernen Komfort in einer ruhigen
            Lage.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Square className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-gray-700 dark:text-gray-200">70m²</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-gray-700 dark:text-gray-200">3. Etage</span>
            </div>
            <div className="flex items-center space-x-2">
              <CarFront className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-gray-700 dark:text-gray-200">
                Stellplatz
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-gray-700 dark:text-gray-200">
                700€ warm
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform"
            onClick={() => setIsModalOpen(true)}
          >
            Details ansehen
          </Button>
        </CardFooter>
      </Card>

      {/* Modal mit Wohnungsdetails */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WohnungsDetail onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
