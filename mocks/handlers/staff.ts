import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const staffHandlers = [
  http.get('/api/staff', () => {
    return HttpResponse.json(db.staff)
  }),

  http.get('/api/staff/:id', ({ params }) => {
    const member = db.staff.find((s) => s.id === params.id)
    if (!member) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(member)
  }),
]
