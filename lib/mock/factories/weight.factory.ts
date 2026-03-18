import { faker } from '../seed'
import type { WeightRecord } from '../../types/entities'

export function createWeightRecord(
  motherId: string,
  staffId: string,
  overrides?: Partial<WeightRecord>
): WeightRecord {
  const gestationalAgeWeeks = faker.number.int({ min: 4, max: 42 })
  const gestationalAgeDays = faker.number.int({ min: 0, max: 6 })
  const hasHeight = faker.datatype.boolean({ probability: 0.8 })

  return {
    id: faker.string.uuid(),
    motherId,
    date: faker.date.recent({ days: 270 }).toISOString().split('T')[0],
    weight: parseFloat(faker.number.float({ min: 45, max: 120, fractionDigits: 1 }).toFixed(1)),
    bloodPressureSystolic: faker.number.int({ min: 90, max: 180 }),
    bloodPressureDiastolic: faker.number.int({ min: 60, max: 120 }),
    fundalHeight: hasHeight ? faker.number.int({ min: 10, max: 42 }) : null,
    gestationalAgeWeeks,
    gestationalAgeDays,
    createdByStaffId: staffId,
    ...overrides,
  }
}
