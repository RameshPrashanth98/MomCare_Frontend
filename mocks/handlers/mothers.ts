import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const mothersHandlers = [
  http.get('/api/mothers', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 20)
    const search = url.searchParams.get('search')?.toLowerCase()
    const riskLevel = url.searchParams.get('riskLevel')
    const assignedStaffId = url.searchParams.get('assignedStaffId')

    let filtered = [...db.mothers]

    if (search) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(search) ||
          m.nationalId.toLowerCase().includes(search) ||
          m.phone.includes(search) ||
          m.community.toLowerCase().includes(search)
      )
    }

    if (riskLevel) {
      filtered = filtered.filter((m) => m.riskLevel === riskLevel)
    }

    if (assignedStaffId) {
      filtered = filtered.filter((m) => m.assignedStaffId === assignedStaffId)
    }

    const total = filtered.length
    const data = filtered.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data, total, page, pageSize })
  }),

  http.get('/api/mothers/:id', ({ params }) => {
    const mother = db.mothers.find((m) => m.id === params.id)
    if (!mother) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(mother)
  }),

  http.post('/api/mothers', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    const newMother = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastVisitDate: null,
    }
    return HttpResponse.json(newMother, { status: 201 })
  }),
]
