import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100/60 to-green-200/60 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <Home className="mx-auto h-24 w-24 text-green-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Wohnung nicht gefunden!
        </h1>
        <p className="text-gray-600 mb-6">
          Ups! Es sieht so aus, als hätten Sie sich in der falschen Wohnung
          eingemietet. Keine Sorge, wir helfen Ihnen, den Weg zurück zu finden!
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 italic mb-6">
            &quot;Zuhause ist da, wo dein WLAN automatisch verbindet... aber
            hier verbindet leider gar nichts.&quot;
          </p>
          <Link href="/">
            <Button variant="default" className="w-full">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
