import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const weightHandlers = [
  http.get('/api/weight', ({ request }) => {
    const url = new URL(request.url)
    const motherId = url.searchParams.get('motherId')
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 20)

    let filtered = [...db.weightRecords]
    if (motherId) filtered = filtered.filter((w) => w.motherId === motherId)

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data, total, page, pageSize })
  }),

  http.post('/api/weight', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    const newRecord = { ...body, id: crypto.randomUUID() }
    return HttpResponse.json(newRecord, { status: 201 })
  }),
]
