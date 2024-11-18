"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { WohnungResponse, PaginationResult } from "@/types";
import { WohnungsCard } from "./wohnungs-card";
import Pagination from "./pagination";
import { Skeleton } from "@/components/ui/skeleton";

function WohnungsCardSkeleton() {
  return (
    <div className="hover:shadow-lg transition-shadow duration-300">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-4">
          {/* Titel */}
          <Skeleton className="h-6 w-3/4" />
          
          {/* Adresse */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          {/* Grid mit 4 Items */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
          
          {/* Kontakt Sektion */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Skeleton className="h-5 w-20 mb-2" />
            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const transformWohnung = (wohnung: WohnungResponse) => ({
  id: wohnung.id,
  titel: wohnung.titel,
  beschreibung: wohnung.beschreibung,
  strasse: wohnung.strasse,
  hausnummer: wohnung.hausnummer,
  plz: wohnung.plz,
  stadt: wohnung.stadt,
  miete: wohnung.miete,
  flaeche: wohnung.flaeche,
  zimmer: wohnung.zimmer,
  stellplatz: wohnung.stellplatz,
  bilder: wohnung.bilder || [],
  user: wohnung.user
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
