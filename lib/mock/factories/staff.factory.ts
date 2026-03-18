import { faker } from '../seed'
import type { Staff } from '../../types/entities'

const ROLES: Staff['role'][] = ['midwife', 'doctor', 'nurse', 'supervisor']
const FACILITIES = [
  'Nakuru County Referral Hospital',
  'Laikipia North Health Centre',
  'Gilgil Sub-County Hospital',
  'Naivasha District Hospital',
  'Molo Health Centre',
]

export function createStaff(overrides?: Partial<Staff>): Staff {
  const role = faker.helpers.arrayElement(ROLES)
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role,
    facility: faker.helpers.arrayElement(FACILITIES),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number({ style: 'international' }),
    lastLogin: faker.date.recent({ days: 30 }).toISOString(),
    ...overrides,
  }
}
