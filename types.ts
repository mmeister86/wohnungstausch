export interface PaginationResult {
  total: number;
  pages: number;
  currentPage: number;
}

export interface WohnungResponse {
  id: number;
  titel: string;
  beschreibung: string | null;
  miete: number;
  flaeche: number;
  zimmer: number;
  strasse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  bilder: string[];
  stellplatz: boolean;
  user: {
    name: string | null;
    email: string | null;
    telefon: string | null;
  };
  location?: {
    coordinates: {
      lat: number;
      lon: number;
    };
  };
}

export interface FilterParams {
  minPreis?: number;
  maxPreis?: number;
  minZimmer?: number;
  maxZimmer?: number;
  minFlaeche?: number;
  maxFlaeche?: number;
  stellplatz?: boolean;
  page?: number;
  limit?: number;
}

export interface FetchResult {
  success: boolean;
  data?: WohnungResponse[];
  pagination?: PaginationResult;
  error?: string;
}
