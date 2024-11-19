import { Prisma, Wohnung, User, Location } from '@prisma/client'

export interface FilterParams {
  minPreis?: number
  maxPreis?: number
  minZimmer?: number
  maxZimmer?: number
  minFlaeche?: number
  maxFlaeche?: number
  stellplatz?: boolean
  page?: number
  limit?: number
}

export type WohnungWithRelations = Wohnung & {
  location: Location | null
  user: User
}

export type WohnungResponse = Omit<WohnungWithRelations, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export interface FetchResult {
  success: boolean
  data: WohnungResponse[]
  pagination: {
    total: number
    pages: number
    currentPage: number
  }
}
