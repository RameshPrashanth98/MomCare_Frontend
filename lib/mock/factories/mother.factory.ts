import { faker } from '../seed'
import type { Mother, RiskLevel } from '../../types/entities'

// Sri Lankan female first and last names
const FIRST_NAMES = [
  'Nadeesha', 'Samanthi', 'Dilini', 'Kavitha', 'Nimali',
  'Chamari', 'Anusha', 'Iresha', 'Tharushi', 'Malini',
  'Kumari', 'Nishanthi', 'Sanduni', 'Rashmi', 'Gayathri',
  'Sewwandi', 'Chathurika', 'Nethmi', 'Hiruni', 'Pavithra',
]

const LAST_NAMES = [
  'Silva', 'Perera', 'Fernando', 'Rajapaksha', 'Jayawardena',
  'Wickramasinghe', 'Bandara', 'Dissanayake', 'Gunasekara', 'Herath',
  'Senanayake', 'Wijesinghe', 'De Silva', 'Karunaratne', 'Samaraweera',
  'Ekanayake', 'Liyanage', 'Mendis', 'Ranasinghe', 'Pathirana',
]

// Sri Lankan areas/communities
export const COMMUNITIES = [
  'Colombo', 'Kandy', 'Galle', 'Matara', 'Kurunegala',
  'Anuradhapura', 'Ratnapura', 'Badulla', 'Jaffna', 'Trincomalee',
  'Batticaloa', 'Nuwara Eliya', 'Kegalle',
]

// Sri Lankan clinic names
export const CLINICS = [
  'Clinic A', 'Clinic B', 'Clinic C', 'Clinic D', 'Clinic E',
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

// Generate Sri Lankan NIC format: YYYYXXXXXV or 9-digit new format
function generateNIC(dob: string): string {
  const year = new Date(dob).getFullYear()
  const digits = faker.string.numeric({ length: 4 })
  // Old format (before 2000): 9 digits + V
  if (year < 2000) {
    const shortYear = String(year).slice(2)
    return `${shortYear}${faker.string.numeric({ length: 5 })}${faker.helpers.arrayElement(['V', 'X'])}`
  }
  // New format: 12 digits starting with birth year
  return `${year}${faker.string.numeric({ length: 8 })}`
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

  const firstName = faker.helpers.arrayElement(FIRST_NAMES)
  const lastName = faker.helpers.arrayElement(LAST_NAMES)
  const name = `${firstName} ${lastName}`

  const dob = faker.date
    .birthdate({ min: 18, max: 42, mode: 'age' })
    .toISOString()
    .split('T')[0]

  return {
    id: faker.string.uuid(),
    name,
    dateOfBirth: dob,
    phone: `+94 ${faker.string.numeric({ length: 2 })} ${faker.string.numeric({ length: 3 })} ${faker.string.numeric({ length: 4 })}`,
    community: faker.helpers.arrayElement(COMMUNITIES),
    nationalId: generateNIC(dob),
    riskLevel,
    lmpDate: lmpDateStr,
    edd: eddStr,
    assignedStaffId: '', // populated by db.ts
    assignedClinicId: faker.helpers.arrayElement(CLINICS),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    lastVisitDate: null, // populated by db.ts after visits are generated
    ...overrides,
  }
}
