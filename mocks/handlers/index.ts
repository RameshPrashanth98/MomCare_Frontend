import { mothersHandlers } from './mothers'
import { visitsHandlers } from './visits'
import { vaccinationsHandlers } from './vaccinations'
import { weightHandlers } from './weight'
import { sessionsHandlers } from './sessions'
import { staffHandlers } from './staff'

export const handlers = [
  ...mothersHandlers,
  ...visitsHandlers,
  ...vaccinationsHandlers,
  ...weightHandlers,
  ...sessionsHandlers,
  ...staffHandlers,
]
