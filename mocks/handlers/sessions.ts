import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const sessionsHandlers = [
  http.get('/api/sessions', ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    const status = url.searchParams.get('status')
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 20)

    let filtered = [...db.sessions]
    if (date) filtered = filtered.filter((s) => s.date === date)
    if (status) filtered = filtered.filter((s) => s.status === status)

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data, total, page, pageSize })
  }),

  http.get('/api/sessions/:id', ({ params }) => {
    const session = db.sessions.find((s) => s.id === params.id)
    if (!session) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(session)
  }),

  http.post('/api/sessions', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    const newSession = { ...body, id: crypto.randomUUID() }
    return HttpResponse.json(newSession, { status: 201 })
  }),
]
