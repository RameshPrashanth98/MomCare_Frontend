import { faker } from '../seed'
import type { ClinicSession } from '../../types/entities'

const SESSION_TYPES: ClinicSession['type'][] = ['antenatal', 'postnatal', 'immunization', 'general']
const SESSION_STATUSES: ClinicSession['status'][] = [
  'upcoming',
  'in-progress',
  'completed',
  'cancelled',
]

const LOCATIONS = [
  'Nakuru County Referral Hospital — Antenatal Wing',
  'Naivasha District Hospital — Outpatient',
  'Gilgil Health Centre — MCH Clinic',
  'Molo Sub-County Hospital — Maternity',
  'Njoro Health Centre — Community Room',
]

// Generate HH:mm string
function randomTime(startHour: number, endHour: number): string {
  const hour = faker.number.int({ min: startHour, max: endHour })
  const minute = faker.helpers.arrayElement([0, 15, 30, 45])
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function createClinicSession(
  leadClinicianId: string,
  attendeeMotherIds: string[],
  overrides?: Partial<ClinicSession>
): ClinicSession {
  const type = faker.helpers.arrayElement(SESSION_TYPES)
  const startTime = randomTime(7, 12)
  const endTime = randomTime(13, 17)

  return {
    id: faker.string.uuid(),
    name: `${faker.helpers.arrayElement(['Morning', 'Afternoon', 'Weekly'])} ${type.charAt(0).toUpperCase() + type.slice(1)} Clinic`,
    type,
    date: faker.date.soon({ days: 60 }).toISOString().split('T')[0],
    startTime,
    endTime,
    location: faker.helpers.arrayElement(LOCATIONS),
    leadClinicianId,
    capacity: faker.number.int({ min: 10, max: 30 }),
    status: faker.helpers.arrayElement(SESSION_STATUSES),
    attendeeMotherIds,
    notes: faker.lorem.sentence(),
    ...overrides,
  }
}
