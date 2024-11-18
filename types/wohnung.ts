export interface Wohnung {
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
  userId: string;
  user: {
    name: string | null;
    email: string | null;
    telefon: string | null;
  };
}
