import { faker } from '../seed'
import type { Vaccination, VaccinationStatus } from '../../types/entities'

interface VaccineDefinition {
  vaccineId: string
  vaccineName: string
  maxDoses: number
}

const VACCINES: VaccineDefinition[] = [
  { vaccineId: 'TT', vaccineName: 'Tetanus Toxoid (TT)', maxDoses: 5 },
  { vaccineId: 'IPTp', vaccineName: 'IPTp (Malaria Prophylaxis)', maxDoses: 3 },
]

const STATUSES: VaccinationStatus[] = ['given', 'due', 'overdue', 'not-applicable']

export function createVaccination(
  motherId: string,
  staffId: string,
  overrides?: Partial<Vaccination>
): Vaccination {
  const vaccine = faker.helpers.arrayElement(VACCINES)
  const doseNumber = faker.number.int({ min: 1, max: vaccine.maxDoses })
  const status: VaccinationStatus = faker.helpers.weightedArrayElement([
    { value: 'given' as VaccinationStatus, weight: 50 },
    { value: 'due' as VaccinationStatus, weight: 20 },
    { value: 'overdue' as VaccinationStatus, weight: 20 },
    { value: 'not-applicable' as VaccinationStatus, weight: 10 },
  ])

  const isGiven = status === 'given'
  const scheduledDate = faker.date.recent({ days: 270 }).toISOString().split('T')[0]
  const dateGiven = isGiven
    ? faker.date.recent({ days: 270 }).toISOString().split('T')[0]
    : null

  return {
    id: faker.string.uuid(),
    motherId,
    vaccineId: vaccine.vaccineId,
    vaccineName: vaccine.vaccineName,
    doseNumber,
    status,
    dateGiven,
    scheduledDate,
    administeredByStaffId: isGiven ? staffId : null,
    createdByStaffId: staffId,
    deviationReason:
      status === 'overdue'
        ? faker.helpers.arrayElement([
            'Mother unavailable on scheduled date',
            'Stock-out at facility',
            'Contraindication documented',
            null,
          ])
        : null,
    ...overrides,
  }
}
