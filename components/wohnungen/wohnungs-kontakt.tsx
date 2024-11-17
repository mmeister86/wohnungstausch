"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WohnungsKontaktProps {
  user?: {
    name: string;
    email: string;
    telefon: string;
  };
  className?: string;
}

export function WohnungsKontaktSkeleton() {
  return (
    <Card className="bg-white dark:bg-gray-700/50 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mr-2" />
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function WohnungsKontakt({ user, className }: WohnungsKontaktProps) {
  if (!user) {
    return <WohnungsKontaktSkeleton />;
  }

  return (
    <Card className={`bg-white dark:bg-gray-700/50 rounded-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Kontakt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.name && (
          <div className="flex items-center">
            <span className="font-medium mr-2">Anbieter:</span>
            {user.name}
          </div>
        )}
        {user?.email && (
          <div className="flex items-center">
            <span className="font-medium mr-2">E-Mail:</span>
            <a
              href={`mailto:${user.email}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {user.email}
            </a>
          </div>
        )}
        {user?.telefon && (
          <div className="flex items-center">
            <span className="font-medium mr-2">Telefon:</span>
            <a
              href={`tel:${user.telefon}`}
              className="text-emerald-600 hover:text-emerald-700"
            >
              {user.telefon}
            </a>
          </div>
        )}
        {!user?.name && !user?.email && !user?.telefon && (
          <p className="text-gray-500 italic">
            Keine Kontaktinformationen verfügbar
          </p>
        )}
      </CardContent>
    </Card>
  );
}
