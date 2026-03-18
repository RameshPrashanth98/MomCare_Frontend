import type { Visit } from '@/lib/types/entities'

export interface ListVisitsParams {
  motherId?: string
  page?: number
  pageSize?: number
}

export interface ListVisitsResponse {
  data: Visit[]
  total: number
  page: number
  pageSize: number
}

export async function listVisits(params: ListVisitsParams = {}): Promise<ListVisitsResponse> {
  const url = new URL('/api/visits', window.location.origin)
  if (params.motherId) url.searchParams.set('motherId', params.motherId)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch visits')
  return res.json() as Promise<ListVisitsResponse>
}

export async function getVisit(id: string): Promise<Visit> {
  const res = await fetch(`/api/visits/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch visit ${id}`)
  return res.json() as Promise<Visit>
}

export async function createVisit(
  data: Omit<Visit, 'id'>
): Promise<Visit> {
  const res = await fetch('/api/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create visit')
  return res.json() as Promise<Visit>
}
