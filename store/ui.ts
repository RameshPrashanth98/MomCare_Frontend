import { create } from 'zustand'

interface UIStore {
  isRegisterMotherOpen: boolean
  isLogVisitOpen: boolean
  activeMotherFilter: 'all' | 'high-risk' | 'overdue' | 'my-patients'
  isAuthenticated: boolean
  setAuthenticated: (v: boolean) => void
  openRegisterMother: () => void
  closeRegisterMother: () => void
  openLogVisit: () => void
  closeLogVisit: () => void
  setMotherFilter: (f: UIStore['activeMotherFilter']) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isRegisterMotherOpen: false,
  isLogVisitOpen: false,
  activeMotherFilter: 'all',
  isAuthenticated: false,
  setAuthenticated: (v) => set({ isAuthenticated: v }),
  openRegisterMother: () => set({ isRegisterMotherOpen: true }),
  closeRegisterMother: () => set({ isRegisterMotherOpen: false }),
  openLogVisit: () => set({ isLogVisitOpen: true }),
  closeLogVisit: () => set({ isLogVisitOpen: false }),
  setMotherFilter: (f) => set({ activeMotherFilter: f }),
}))
