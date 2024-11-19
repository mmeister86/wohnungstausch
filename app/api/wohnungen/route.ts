import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma/edge';
import { FilterParams, FetchResult, WohnungResponse } from '@/types';
import { Prisma, Wohnung, User, Location } from '@prisma/client';

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const ITEMS_PER_PAGE = 10;

type WohnungWithRelations = Wohnung & {
  location: Location | null
  user: User
}

async function fetchWohnungenWithFilters(
  filters: FilterParams,
  page: number = 1
): Promise<FetchResult> {
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where: Prisma.WohnungWhereInput = {
    AND: [
      filters.minZimmer ? { zimmer: { gte: filters.minZimmer } } : {},
      filters.maxZimmer ? { zimmer: { lte: filters.maxZimmer } } : {},
      filters.minFlaeche ? { flaeche: { gte: filters.minFlaeche } } : {},
      filters.maxFlaeche ? { flaeche: { lte: filters.maxFlaeche } } : {},
      filters.minPreis ? { miete: { gte: filters.minPreis } } : {},
      filters.maxPreis ? { miete: { lte: filters.maxPreis } } : {},
      filters.stellplatz !== undefined ? { stellplatz: filters.stellplatz } : {},
    ],
  };

  const [wohnungen, total] = await Promise.all([
    prisma.wohnung.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        location: true,
        user: true,
      },
    }),
    prisma.wohnung.count({ where }),
  ]);

  const transformedWohnungen: WohnungResponse[] = wohnungen.map((w: WohnungWithRelations) => {
    const coordinates = w.location?.coordinates as { lat: number; lon: number } | undefined;
    
    return {
      ...w,
      location: coordinates ? { coordinates } : undefined,
      createdAt: w.createdAt.toISOString(),
      updatedAt: w.updatedAt.toISOString(),
    };
  });

  return {
    success: true,
    data: transformedWohnungen,
    pagination: {
      total,
      pages: Math.ceil(total / ITEMS_PER_PAGE),
      currentPage: page,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
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
