import { faker } from '../seed'
import type { Visit } from '../../types/entities'

const VISIT_TYPES: Visit['type'][] = ['antenatal', 'postnatal', 'emergency', 'routine']

const COMPLAINTS = [
  'headache',
  'swollen feet',
  'nausea',
  'fatigue',
  'back pain',
  'reduced fetal movement',
  'vaginal bleeding',
  'abdominal pain',
  'dizziness',
  'difficulty breathing',
]

const OUTCOMES = [
  'Reviewed and stable — follow up in 4 weeks',
  'Referred to doctor for further assessment',
  'Medication prescribed, improving',
  'Vitals within normal range',
  'Admitted for observation',
  'Discharged in good condition',
  'Follow-up booked for next week',
  'Education provided, routine review',
]

export function createVisit(
  motherId: string,
  staffId: string,
  createdByStaffId: string,
  overrides?: Partial<Visit>
): Visit {
  const hasVitals = faker.datatype.boolean({ probability: 0.85 })

  return {
    id: faker.string.uuid(),
    motherId,
    staffId,
    createdByStaffId,
    date: faker.date.recent({ days: 180 }).toISOString().split('T')[0],
    type: faker.helpers.arrayElement(VISIT_TYPES),
    bloodPressureSystolic: hasVitals ? faker.number.int({ min: 90, max: 180 }) : null,
    bloodPressureDiastolic: hasVitals ? faker.number.int({ min: 60, max: 120 }) : null,
    weight: hasVitals ? parseFloat(faker.number.float({ min: 45, max: 120, fractionDigits: 1 }).toFixed(1)) : null,
    fundalHeight: hasVitals ? faker.number.int({ min: 10, max: 42 }) : null,
    fetalHeartRate: hasVitals ? faker.number.int({ min: 110, max: 180 }) : null,
    presentingComplaints: faker.helpers.arrayElements(COMPLAINTS, { min: 0, max: 3 }),
    notes: faker.lorem.sentence(),
    outcome: faker.helpers.arrayElement(OUTCOMES),
    ...overrides,
  }
}
