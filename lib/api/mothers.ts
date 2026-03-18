import type { Mother } from '@/lib/types/entities'

export interface ListMothersParams {
  page?: number
  pageSize?: number
  filters?: {
    riskLevel?: 'high' | 'medium' | 'low'
    overdue?: boolean
    assignedStaffId?: string
  }
  search?: string
}

export interface ListMothersResponse {
  data: Mother[]
  total: number
  page: number
  pageSize: number
}

export async function listMothers(params: ListMothersParams = {}): Promise<ListMothersResponse> {
  const url = new URL('/api/mothers', window.location.origin)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
  if (params.search) url.searchParams.set('search', params.search)
  if (params.filters?.riskLevel) url.searchParams.set('riskLevel', params.filters.riskLevel)
  if (params.filters?.overdue) url.searchParams.set('overdue', 'true')
  if (params.filters?.assignedStaffId)
    url.searchParams.set('assignedStaffId', params.filters.assignedStaffId)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch mothers')
  return res.json() as Promise<ListMothersResponse>
}

export async function getMother(id: string): Promise<Mother> {
  const res = await fetch(`/api/mothers/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch mother ${id}`)
  return res.json() as Promise<Mother>
}

export async function createMother(
  data: Omit<Mother, 'id' | 'createdAt' | 'lastVisitDate'>
): Promise<Mother> {
  const res = await fetch('/api/mothers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create mother')
  return res.json() as Promise<Mother>
}
