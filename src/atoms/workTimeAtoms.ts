import { atom } from 'jotai'

// Work session interface
export interface WorkSession {
  id: string
  date: string
  startTime: string
  endTime: string
  duration: number // in milliseconds
}

// Work time tracking state atoms
export const isWorkingAtom = atom<boolean>(false)
export const workSessionStartTimeAtom = atom<number | null>(null)
export const totalWorkedTimeAtom = atom<number>(0) // in milliseconds
export const currentSessionStartAtom = atom<number | null>(null) // For tracking actual session start
export const workSessionsHistoryAtom = atom<WorkSession[]>([]) // Completed sessions

// Derived atom for formatted work time display
export const formattedWorkTimeAtom = atom(
  (get) => {
    const totalMs = get(totalWorkedTimeAtom)
    const totalSeconds = Math.floor(totalMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
)

// Derived atom for work session status text
export const workStatusAtom = atom(
  (get) => {
    const isWorking = get(isWorkingAtom)
    return isWorking ? 'Työskentelee' : 'Tauko'
  }
)

// Action atom for starting/stopping work sessions
export const toggleWorkSessionAtom = atom(
  null,
  (get, set) => {
    const isWorking = get(isWorkingAtom)
    const currentTotal = get(totalWorkedTimeAtom)
    
    if (!isWorking) {
      // Start work session
      set(isWorkingAtom, true)
      set(workSessionStartTimeAtom, Date.now() - currentTotal)
      set(currentSessionStartAtom, Date.now())
    } else {
      // Stop work session
      set(isWorkingAtom, false)
      set(workSessionStartTimeAtom, null)
    }
  }
)

// Atom to update work time while working
export const updateWorkTimeAtom = atom(
  null,
  (get, set) => {
    const isWorking = get(isWorkingAtom)
    const sessionStartTime = get(workSessionStartTimeAtom)
    
    if (isWorking && sessionStartTime !== null) {
      const now = Date.now()
      const totalWorked = now - sessionStartTime
      set(totalWorkedTimeAtom, totalWorked)
    }
  }
)

// Reset work time atom
export const resetWorkTimeAtom = atom(
  null,
  (_get, set) => {
    set(isWorkingAtom, false)
    set(workSessionStartTimeAtom, null)
    set(totalWorkedTimeAtom, 0)
    set(currentSessionStartAtom, null)
  }
)

// Complete work session atom
export const completeWorkSessionAtom = atom(
  null,
  (get, set) => {
    const sessionStart = get(currentSessionStartAtom)
    const totalWorked = get(totalWorkedTimeAtom)
    
    if (sessionStart !== null && totalWorked > 0) {
      const now = Date.now()
      const currentSessions = get(workSessionsHistoryAtom)
      
      const newSession: WorkSession = {
        id: `session-${now}`,
        date: new Date(sessionStart).toLocaleDateString('fi-FI'),
        startTime: new Date(sessionStart).toLocaleTimeString('fi-FI', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        endTime: new Date(now).toLocaleTimeString('fi-FI', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        duration: totalWorked
      }
      
      // Add new session to history
      set(workSessionsHistoryAtom, [newSession, ...currentSessions])
      
      // Reset current session
      set(isWorkingAtom, false)
      set(workSessionStartTimeAtom, null)
      set(totalWorkedTimeAtom, 0)
      set(currentSessionStartAtom, null)
    }
  }
)

// Formatted duration helper atom
export const formatDurationAtom = atom(
  null,
  (_get, _set, duration: number) => {
    const totalSeconds = Math.floor(duration / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours}t ${minutes}min ${seconds}s`
    }
    return `${minutes}min ${seconds}s`
  }
)