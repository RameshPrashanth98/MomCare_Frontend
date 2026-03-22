export type RiskLevel = 'high' | 'medium' | 'low'
export type VaccinationStatus = 'given' | 'due' | 'overdue' | 'not-applicable'

export interface Staff {
  id: string
  name: string
  role: 'midwife' | 'doctor' | 'nurse' | 'supervisor'
  facility: string
  email: string
  phone: string
  lastLogin: string // ISO date
}

export interface Mother {
  id: string
  name: string
  dateOfBirth: string // ISO date
  phone: string
  community: string // village/community name (searchable per MOTH-06)
  nationalId: string // searchable per MOTH-06
  riskLevel: RiskLevel // QUAL-06: must be present
  lmpDate: string // ISO date — QUAL-07: for weeks+days calculation
  edd: string // ISO date
  assignedStaffId: string // resolves to Staff.id
  assignedClinicId: string
  createdAt: string // ISO date
  lastVisitDate: string | null // ISO date, MOTH-02: sort by this
}

export interface Visit {
  id: string
  motherId: string // resolves to Mother.id
  staffId: string // resolves to Staff.id — attending clinician
  createdByStaffId: string // QUAL-08: author tracking
  date: string // ISO date
  type: 'antenatal' | 'postnatal' | 'emergency' | 'routine'
  bloodPressureSystolic: number | null
  bloodPressureDiastolic: number | null
  weight: number | null // kg
  fundalHeight: number | null // cm
  fetalHeartRate: number | null // bpm
  presentingComplaints: string[]
  notes: string
  outcome: string // brief outcome text for list display per MOTH-15
}

export interface Vaccination {
  id: string
  motherId: string
  vaccineId: string
  vaccineName: string
  doseNumber: number
  status: VaccinationStatus // VACC-02: color-coded
  dateGiven: string | null // ISO date, null if not yet given
  scheduledDate: string // ISO date
  administeredByStaffId: string | null // QUAL-08
  createdByStaffId: string // QUAL-08
  deviationReason: string | null // VACC-04
}

export interface WeightRecord {
  id: string
  motherId: string
  date: string // ISO date
  weight: number // kg
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  fundalHeight: number | null // cm
  gestationalAgeWeeks: number
  gestationalAgeDays: number
  createdByStaffId: string // QUAL-08
}

export interface ClinicSession {
  id: string
  name: string
  type: 'antenatal' | 'postnatal' | 'immunization' | 'general'
  date: string // ISO date
  startTime: string // HH:mm
  endTime: string // HH:mm
  location: string
  leadClinicianId: string // resolves to Staff.id
  capacity: number
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  attendeeMotherIds: string[] // resolves to Mother.id[]
  notes: string
}

export type LabReportType = 'blood-test' | 'urine-test' | 'ultrasound'

export interface LabReport {
  id: string
  motherId: string
  type: LabReportType
  reportName: string
  date: string // ISO date
  uploadedBy: string
  createdByStaffId: string
}

export type TimelineEventType = 'clinic-visit' | 'vaccination' | 'ultrasound' | 'lab-report'

export interface TimelineEvent {
  id: string
  motherId: string
  date: string           // ISO date
  type: TimelineEventType
  title: string          // e.g. "Clinic Visit Recorded", "Tetanus Vaccine (TT1)"
  detail: string         // e.g. "Weight: 62 kg | BP: 120/80", "Dose Administered"
  isUpcoming: boolean    // true = future milestone, false = past event
  createdByStaffId: string
}
