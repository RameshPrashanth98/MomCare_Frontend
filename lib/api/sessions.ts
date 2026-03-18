import type { ClinicSession } from '@/lib/types/entities'

export interface ListSessionsParams {
  date?: string
  status?: ClinicSession['status']
  page?: number
  pageSize?: number
}

export interface ListSessionsResponse {
  data: ClinicSession[]
  total: number
  page: number
  pageSize: number
}

export async function listSessions(
  params: ListSessionsParams = {}
): Promise<ListSessionsResponse> {
  const url = new URL('/api/sessions', window.location.origin)
  if (params.date) url.searchParams.set('date', params.date)
  if (params.status) url.searchParams.set('status', params.status)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch sessions')
  return res.json() as Promise<ListSessionsResponse>
}

export async function getSession(id: string): Promise<ClinicSession> {
  const res = await fetch(`/api/sessions/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch session ${id}`)
  return res.json() as Promise<ClinicSession>
}

export async function createSession(
  data: Omit<ClinicSession, 'id'>
): Promise<ClinicSession> {
  const res = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json() as Promise<ClinicSession>
}
