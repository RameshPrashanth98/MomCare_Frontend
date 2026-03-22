import type { Staff, Mother, Visit, Vaccination, WeightRecord, ClinicSession, LabReport } from '../types/entities'
import { createStaff } from './factories/staff.factory'
import { createMother } from './factories/mother.factory'
import { createVisit } from './factories/visit.factory'
import { createVaccination } from './factories/vaccination.factory'
import { createWeightRecord } from './factories/weight.factory'
import { createClinicSession } from './factories/session.factory'
import { createLabReport } from './factories/lab-report.factory'
import { faker } from './seed'

// ── Staff (10 members) ────────────────────────────────────────────────────────
const staff: Staff[] = Array.from({ length: 10 }, () => createStaff())

const staffIds = staff.map((s) => s.id)

// ── Mothers (75) ──────────────────────────────────────────────────────────────
const mothersRaw: Mother[] = Array.from({ length: 75 }, () => {
  const assignedStaffId = faker.helpers.arrayElement(staffIds)
  return createMother({ assignedStaffId })
})

const motherIds = mothersRaw.map((m) => m.id)

// ── Visits ────────────────────────────────────────────────────────────────────
// 1–6 visits per mother; both motherId and staffId resolve to real entities
const visits: Visit[] = mothersRaw.flatMap((mother) => {
  const count = faker.number.int({ min: 1, max: 6 })
  return Array.from({ length: count }, () => {
    const attendingStaffId = faker.helpers.arrayElement(staffIds)
    const authorStaffId = faker.helpers.arrayElement(staffIds)
    return createVisit(mother.id, attendingStaffId, authorStaffId)
  })
})

// ── Back-fill lastVisitDate on each mother ────────────────────────────────────
const visitsByMother = new Map<string, string[]>()
for (const visit of visits) {
  const existing = visitsByMother.get(visit.motherId) ?? []
  existing.push(visit.date)
  visitsByMother.set(visit.motherId, existing)
}

const mothers: Mother[] = mothersRaw.map((mother) => {
  const dates = visitsByMother.get(mother.id)
  if (!dates || dates.length === 0) return mother
  // Sort ascending so the max (most recent) date is last
  const sorted = [...dates].sort()
  return { ...mother, lastVisitDate: sorted[sorted.length - 1] }
})

// Sort mothers by lastVisitDate ascending (most overdue first per MOTH-02)
mothers.sort((a, b) => {
  if (a.lastVisitDate === null && b.lastVisitDate === null) return 0
  if (a.lastVisitDate === null) return -1
  if (b.lastVisitDate === null) return 1
  return a.lastVisitDate.localeCompare(b.lastVisitDate)
})

// ── Vaccinations (3–7 per mother) ─────────────────────────────────────────────
const vaccinations: Vaccination[] = mothers.flatMap((mother) => {
  const count = faker.number.int({ min: 3, max: 7 })
  return Array.from({ length: count }, () => {
    const staffId = faker.helpers.arrayElement(staffIds)
    return createVaccination(mother.id, staffId)
  })
})

// ── Weight records (2–8 per mother) ──────────────────────────────────────────
const weightRecords: WeightRecord[] = mothers.flatMap((mother) => {
  const count = faker.number.int({ min: 2, max: 8 })
  return Array.from({ length: count }, () => {
    const staffId = faker.helpers.arrayElement(staffIds)
    return createWeightRecord(mother.id, staffId)
  })
})

// ── Lab reports (3–6 per mother) ──────────────────────────────────────────────
const labReports: LabReport[] = mothers.flatMap((mother) => {
  const count = faker.number.int({ min: 3, max: 6 })
  return Array.from({ length: count }, () => {
    const staffId = faker.helpers.arrayElement(staffIds)
    return createLabReport(mother.id, staffId)
  })
})

// ── Clinic sessions (20 total) ────────────────────────────────────────────────
const sessions: ClinicSession[] = Array.from({ length: 20 }, () => {
  const leadClinicianId = faker.helpers.arrayElement(staffIds)
  // 5–20 attendees drawn from real motherIds
  const attendeeCount = faker.number.int({ min: 5, max: 20 })
  const attendeeMotherIds = faker.helpers.arrayElements(motherIds, attendeeCount)
  return createClinicSession(leadClinicianId, attendeeMotherIds)
})

// ── Export ────────────────────────────────────────────────────────────────────
export const db = {
  staff,
  mothers,
  visits,
  vaccinations,
  weightRecords,
  labReports,
  sessions,
}
