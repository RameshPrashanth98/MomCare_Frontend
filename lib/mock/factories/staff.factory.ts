import { faker } from '../seed'
import type { Staff } from '../../types/entities'

const STAFF_NAMES = [
  'Malani Jayawardena', 'Nirmala Perera', 'Sumana Bandara', 'Champa Dissanayake',
  'Anoma Silva', 'Renuka Fernando', 'Priyanthi Herath', 'Dilrukshi Senanayake',
  'Kumudini Wijesinghe', 'Sriyani Gunasekara', 'Padmini Karunaratne', 'Ranjani Mendis',
]

const ROLES: Staff['role'][] = ['midwife', 'doctor', 'nurse', 'supervisor']
const FACILITIES = [
  'Colombo General Hospital',
  'Kandy Teaching Hospital',
  'Galle District Hospital',
  'Kurunegala Health Centre',
  'Matara MOH Office',
]

export function createStaff(overrides?: Partial<Staff>): Staff {
  const role = faker.helpers.arrayElement(ROLES)
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(STAFF_NAMES),
    role,
    facility: faker.helpers.arrayElement(FACILITIES),
    email: faker.internet.email().toLowerCase(),
    phone: `+94 ${faker.string.numeric({ length: 2 })} ${faker.string.numeric({ length: 3 })} ${faker.string.numeric({ length: 4 })}`,
    lastLogin: faker.date.recent({ days: 30 }).toISOString(),
    ...overrides,
  }
}
