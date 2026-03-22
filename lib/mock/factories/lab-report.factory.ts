import { faker } from '../seed'
import type { LabReport, LabReportType } from '../../types/entities'

const REPORT_NAMES: Record<LabReportType, string> = {
  'blood-test': 'Blood Test Report',
  'urine-test': 'Urine Test Report',
  'ultrasound': 'Ultrasound Scan',
}

const UPLOADERS = ['Clinic Staff', 'Radiology Unit', 'Lab Technician']

export function createLabReport(
  motherId: string,
  staffId: string,
  overrides?: Partial<LabReport>
): LabReport {
  const type: LabReportType = faker.helpers.arrayElement([
    'blood-test',
    'urine-test',
    'ultrasound',
  ] as LabReportType[])

  return {
    id: faker.string.uuid(),
    motherId,
    type,
    reportName: REPORT_NAMES[type],
    date: faker.date.recent({ days: 365 }).toISOString().split('T')[0],
    uploadedBy: faker.helpers.arrayElement(UPLOADERS),
    createdByStaffId: staffId,
    ...overrides,
  }
}
