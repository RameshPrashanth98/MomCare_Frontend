import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const visitsHandlers = [
  http.get('/api/visits', ({ request }) => {
    const url = new URL(request.url)
    const motherId = url.searchParams.get('motherId')
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 20)

    let filtered = [...db.visits]
    if (motherId) filtered = filtered.filter((v) => v.motherId === motherId)

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data, total, page, pageSize })
  }),

  http.get('/api/visits/:id', ({ params }) => {
    const visit = db.visits.find((v) => v.id === params.id)
    if (!visit) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(visit)
  }),

  http.post('/api/visits', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    const newVisit = { ...body, id: crypto.randomUUID() }
    return HttpResponse.json(newVisit, { status: 201 })
  }),
]
