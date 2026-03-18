import type { WeightRecord } from '@/lib/types/entities'

export interface ListWeightRecordsParams {
  motherId?: string
  page?: number
  pageSize?: number
}

export interface ListWeightRecordsResponse {
  data: WeightRecord[]
  total: number
  page: number
  pageSize: number
}

export async function listWeightRecords(
  params: ListWeightRecordsParams = {}
): Promise<ListWeightRecordsResponse> {
  const url = new URL('/api/weight', window.location.origin)
  if (params.motherId) url.searchParams.set('motherId', params.motherId)
  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch weight records')
  return res.json() as Promise<ListWeightRecordsResponse>
}

export async function logWeight(
  data: Omit<WeightRecord, 'id'>
): Promise<WeightRecord> {
  const res = await fetch('/api/weight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to log weight record')
  return res.json() as Promise<WeightRecord>
}
