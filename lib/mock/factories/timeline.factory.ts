import { faker } from '../seed'
import type { TimelineEvent, TimelineEventType } from '../../types/entities'

const EVENT_CONFIGS: Record<TimelineEventType, { titles: string[]; details: string[] }> = {
  'clinic-visit': {
    titles: ['Clinic Visit Recorded', 'Routine Checkup Completed', 'Antenatal Visit Logged'],
    details: [
      'Weight: 62 kg | BP: 120/80',
      'Weight: 58 kg | BP: 110/72',
      'Weight: 65 kg | BP: 118/76',
      'Weight: 60 kg | BP: 125/82',
      'Vitals within normal range',
    ],
  },
  vaccination: {
    titles: ['Tetanus Vaccine (TT1)', 'Tetanus Vaccine (TT2)', 'Flu Vaccine Administered', 'Hepatitis B Vaccine'],
    details: ['Dose Administered', 'Vaccination Completed', 'No adverse reactions noted'],
  },
  ultrasound: {
    titles: ['Ultrasound Scan Uploaded', 'Growth Scan Completed', 'Anomaly Scan Recorded'],
    details: ['Report Available', 'Normal growth pattern observed', 'All measurements within range'],
  },
  'lab-report': {
    titles: ['Blood Test Results Available', 'Urine Test Recorded', 'Lab Report Uploaded'],
    details: ['Results normal', 'Follow-up recommended', 'All values within reference range'],
  },
}

const UPCOMING_CONFIGS: { type: TimelineEventType; title: string; detailPrefix: string }[] = [
  { type: 'clinic-visit', title: 'Next Clinic Visit', detailPrefix: 'Date' },
  { type: 'vaccination', title: 'Upcoming Vaccine', detailPrefix: 'TT2 — Due Soon' },
  { type: 'ultrasound', title: 'Scheduled Ultrasound', detailPrefix: 'Date' },
]

export function createTimelineEvent(
  motherId: string,
  staffId: string,
  overrides?: Partial<TimelineEvent>
): TimelineEvent {
  const type: TimelineEventType = faker.helpers.arrayElement([
    'clinic-visit',
    'vaccination',
    'ultrasound',
    'lab-report',
  ])
  const config = EVENT_CONFIGS[type]

  return {
    id: faker.string.uuid(),
    motherId,
    date: faker.date.recent({ days: 180 }).toISOString().split('T')[0],
    type,
    title: faker.helpers.arrayElement(config.titles),
    detail: faker.helpers.arrayElement(config.details),
    isUpcoming: false,
    createdByStaffId: staffId,
    ...overrides,
  }
}

export function createUpcomingMilestone(
  motherId: string,
  staffId: string,
  overrides?: Partial<TimelineEvent>
): TimelineEvent {
  const config = faker.helpers.arrayElement(UPCOMING_CONFIGS)
  const futureDate = faker.date.soon({ days: 60 }).toISOString().split('T')[0]
  const formattedDate = new Date(futureDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return {
    id: faker.string.uuid(),
    motherId,
    date: futureDate,
    type: config.type,
    title: config.title,
    detail: config.detailPrefix === 'Date' ? `Date: ${formattedDate}` : config.detailPrefix,
    isUpcoming: true,
    createdByStaffId: staffId,
    ...overrides,
  }
}
