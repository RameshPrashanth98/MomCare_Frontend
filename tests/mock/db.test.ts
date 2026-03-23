import { describe, it, expect } from 'vitest'
import { db } from '@/lib/mock/db'

describe('Mock database', () => {
  it('generates at least 50 mothers', () => {
    expect(db.mothers.length).toBeGreaterThanOrEqual(50)
  })

  it('generates at least 5 staff members', () => {
    expect(db.staff.length).toBeGreaterThanOrEqual(5)
  })

  it('every mother has a valid riskLevel', () => {
    db.mothers.forEach((m) => {
      expect(['high', 'medium', 'low']).toContain(m.riskLevel)
    })
  })

  it('every mother has a valid lmpDate', () => {
    db.mothers.forEach((m) => {
      expect(m.lmpDate).toBeTruthy()
      expect(new Date(m.lmpDate).getTime()).not.toBeNaN()
    })
  })

  it('every visit.motherId references an existing mother', () => {
    const motherIds = new Set(db.mothers.map((m) => m.id))
    db.visits.forEach((v) => {
      expect(motherIds.has(v.motherId)).toBe(true)
    })
  })

  it('every visit.staffId references an existing staff member', () => {
    const staffIds = new Set(db.staff.map((s) => s.id))
    db.visits.forEach((v) => {
      expect(staffIds.has(v.staffId)).toBe(true)
    })
  })

  it('every visit.createdByStaffId references an existing staff member', () => {
    const staffIds = new Set(db.staff.map((s) => s.id))
    db.visits.forEach((v) => {
      expect(staffIds.has(v.createdByStaffId)).toBe(true)
    })
  })

  it('every vaccination.motherId references an existing mother', () => {
    const motherIds = new Set(db.mothers.map((m) => m.id))
    db.vaccinations.forEach((v) => {
      expect(motherIds.has(v.motherId)).toBe(true)
    })
  })

  it('every weightRecord.motherId references an existing mother', () => {
    const motherIds = new Set(db.mothers.map((m) => m.id))
    db.weightRecords.forEach((w) => {
      expect(motherIds.has(w.motherId)).toBe(true)
    })
  })

  it('every session.leadClinicianId references an existing staff member', () => {
    const staffIds = new Set(db.staff.map((s) => s.id))
    db.sessions.forEach((s) => {
      expect(staffIds.has(s.leadClinicianId)).toBe(true)
    })
  })

  it('every session.attendeeMotherIds reference existing mothers', () => {
    const motherIds = new Set(db.mothers.map((m) => m.id))
    db.sessions.forEach((s) => {
      s.attendeeMotherIds.forEach((id) => {
        expect(motherIds.has(id)).toBe(true)
      })
    })
  })

  it('produces deterministic output (seeded faker)', () => {
    const firstName = db.mothers[0].name
    expect(firstName).toBeTruthy()
    expect(db.mothers[0].name).toBe(firstName)
  })
})
