"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WohnungResponse, PaginationResult } from "@/types";
import { WohnungsCard } from "./wohnungs-card";
import Pagination from "./pagination";

function WohnungsCardSkeleton() {
  return (
    <div className="hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

const transformWohnung = (wohnung: WohnungResponse) => ({
  id: String(wohnung.id),
  titel: wohnung.titel,
  beschreibung: "", // Default empty string since it's missing from the response
  strasse: `${wohnung.strasse} ${wohnung.hausnummer}`,
  plz: wohnung.plz,
  ort: wohnung.stadt,
  kaltmiete: wohnung.miete, // Assuming miete is kaltmiete
  warmmiete: wohnung.miete, // Using same value since we don't have warmmiete
  wohnflaeche: wohnung.flaeche,
  zimmer: wohnung.zimmer,
  stellplatz: wohnung.stellplatz,
  bilder: wohnung.bilder || [],
  user: {
    ...wohnung.user,
    telefon: "", // Default empty string since it's missing from the response
  },
});

export default function WohnungsGrid() {
  const searchParams = useSearchParams();
  const [wohnungen, setWohnungen] = useState<WohnungResponse[]>([]);
  const [pagination, setPagination] = useState<PaginationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchWohnungen = async () => {
      setLoading(true);
      try {
        const queryString = searchParams.toString();
        console.log(
          "Fetching wohnungen with query:",
          queryString || "no query params"
        );
        const response = await fetch(`/api/wohnungen?${queryString}`);
        const data = await response.json();
        console.log("Received wohnungen:", data);

        if (!response.ok) {
          throw new Error(data.error || "Fehler beim Laden der Wohnungen");
        }
        console.log("Setting wohnungen state with:", data.data.length, "items");
        setWohnungen(data.data);
        setPagination(data.pagination);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWohnungen();
  }, [searchParams]);
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <WohnungsCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {wohnungen.map((wohnung) => (
          <WohnungsCard key={wohnung.id} wohnung={transformWohnung(wohnung)} className="hover:shadow-md transition-shadow duration-300" />
        ))}
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.pages}
        />
      )}
    </div>
  );
}
