import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FilterParams, FetchResult, WohnungResponse } from '@/types';

const ITEMS_PER_PAGE = 10;

const fetchWohnungenWithFilters = async (filters: FilterParams): Promise<FetchResult> => {
  const {
    minPreis,
    maxPreis,
    minZimmer,
    maxZimmer,
    minFlaeche,
    maxFlaeche,
    stellplatz,
    page = 1,
    limit = ITEMS_PER_PAGE
  } = filters;

  try {
    const where = {
      AND: [
        minPreis ? { miete: { gte: minPreis } } : {},
        maxPreis ? { miete: { lte: maxPreis } } : {},
        minZimmer ? { zimmer: { gte: minZimmer } } : {},
        maxZimmer ? { zimmer: { lte: maxZimmer } } : {},
        minFlaeche ? { flaeche: { gte: minFlaeche } } : {},
        maxFlaeche ? { flaeche: { lte: maxFlaeche } } : {},
        stellplatz !== undefined ? { stellplatz } : {},
      ],
    };

    const [wohnungen, total] = await Promise.all([
      prisma.wohnung.findMany({
        where,
        select: {
          id: true,
          titel: true,
          beschreibung: true,
          miete: true,
          flaeche: true,
          zimmer: true,
          strasse: true,
          hausnummer: true,
          plz: true,
          stadt: true,
          bilder: true,
          stellplatz: true,
          user: {
            select: {
              name: true,
              email: true,
              telefon: true,
            },
          },
          location: {
            select: {
              coordinates: true
            }
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.wohnung.count({ where }),
    ]);

    console.log('Database query results:', { total, fetchedCount: wohnungen.length, where });

    const transformedWohnungen: WohnungResponse[] = wohnungen.map(wohnung => ({
      ...wohnung,
      location: wohnung.location ? {
        coordinates: wohnung.location.coordinates as { lat: number; lon: number }
      } : undefined
    }));

    return {
      success: true,
      data: transformedWohnungen,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error fetching wohnungen:', error);
    return {
      success: false,
      error: 'Fehler beim Laden der Wohnungen',
    };
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: FilterParams = {
      minPreis: searchParams.get('minPreis') ? Number(searchParams.get('minPreis')) : undefined,
      maxPreis: searchParams.get('maxPreis') ? Number(searchParams.get('maxPreis')) : undefined,
      minZimmer: searchParams.get('minZimmer') ? Number(searchParams.get('minZimmer')) : undefined,
      maxZimmer: searchParams.get('maxZimmer') ? Number(searchParams.get('maxZimmer')) : undefined,
      minFlaeche: searchParams.get('minFlaeche') ? Number(searchParams.get('minFlaeche')) : undefined,
      maxFlaeche: searchParams.get('maxFlaeche') ? Number(searchParams.get('maxFlaeche')) : undefined,
      stellplatz: searchParams.get('stellplatz') ? searchParams.get('stellplatz') === 'true' : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    };

    const result = await fetchWohnungenWithFilters(filters);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
