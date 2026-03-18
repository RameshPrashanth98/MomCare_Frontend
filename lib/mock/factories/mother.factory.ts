import { faker } from '../seed'
import type { Mother, RiskLevel } from '../../types/entities'

const COMMUNITIES = [
  'Nakuru Town',
  'Naivasha',
  'Gilgil',
  'Molo',
  'Njoro',
  'Rongai',
  'Subukia',
  'Bahati',
  'Laikipia East',
  'Laikipia North',
  'Laikipia West',
  'Kuresoi North',
  'Kuresoi South',
]

const RISK_LEVELS: { value: RiskLevel; weight: number }[] = [
  { value: 'high', weight: 20 },
  { value: 'medium', weight: 30 },
  { value: 'low', weight: 50 },
]

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export function createMother(overrides?: Partial<Mother>): Mother {
  // LMP between 2 and 40 weeks ago to create spread of gestational ages
  const weeksAgo = faker.number.int({ min: 2, max: 40 })
  const lmpDate = new Date()
  lmpDate.setDate(lmpDate.getDate() - weeksAgo * 7)
  const lmpDateStr = lmpDate.toISOString().split('T')[0]

  // EDD = LMP + 280 days
  const eddStr = addDays(lmpDateStr, 280)

  const riskLevel = faker.helpers.weightedArrayElement(RISK_LEVELS)

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName({ sex: 'female' }),
    dateOfBirth: faker.date
      .birthdate({ min: 15, max: 45, mode: 'age' })
      .toISOString()
      .split('T')[0],
    phone: faker.phone.number({ style: 'international' }),
    community: faker.helpers.arrayElement(COMMUNITIES),
    nationalId: faker.string.numeric({ length: 8 }),
    riskLevel,
    lmpDate: lmpDateStr,
    edd: eddStr,
    assignedStaffId: '', // populated by db.ts
    assignedClinicId: faker.string.uuid(),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    lastVisitDate: null, // populated by db.ts after visits are generated
    ...overrides,
  }
}
