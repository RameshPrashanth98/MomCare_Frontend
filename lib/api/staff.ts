import type { Staff } from '@/lib/types/entities'

export async function listStaff(): Promise<Staff[]> {
  const res = await fetch('/api/staff')
  if (!res.ok) throw new Error('Failed to fetch staff')
  return res.json() as Promise<Staff[]>
}

export async function getStaffMember(id: string): Promise<Staff> {
  const res = await fetch(`/api/staff/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch staff member ${id}`)
  return res.json() as Promise<Staff>
}
