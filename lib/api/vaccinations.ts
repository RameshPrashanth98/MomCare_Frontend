import type { Vaccination } from '@/lib/types/entities'

export interface ListVaccinationsParams {
  motherId?: string
  page?: number
  pageSize?: number
}

export interface ListVaccinationsResponse {
  data: Vaccination[]
  total: number
  page: number
  pageSize: number
}

export async function listVaccinations(
  params: ListVaccinationsParams = {}
): Promise<ListVaccinationsResponse> {
  const url = new URL('/api/vaccinations', window.location.origin)
  if (params.motherId) url.searchParams.set('motherId', params.motherId)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch vaccinations')
  return res.json() as Promise<ListVaccinationsResponse>
}

export async function logVaccination(
  data: Omit<Vaccination, 'id'>
): Promise<Vaccination> {
  const res = await fetch('/api/vaccinations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to log vaccination')
  return res.json() as Promise<Vaccination>
}
