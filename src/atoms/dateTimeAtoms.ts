import { atom } from 'jotai'

// Base atom for current date/time
export const currentDateTimeAtom = atom<Date>(new Date())

// Derived atom for formatted Finnish date
export const finnishDateAtom = atom(
  (get) => {
    const date = get(currentDateTimeAtom)
    const longOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const shortOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    
    return {
      long: date.toLocaleDateString('fi-FI', longOptions),
      short: date.toLocaleDateString('fi-FI', shortOptions)
    }
  }
)

// Derived atom for formatted Finnish time
export const finnishTimeAtom = atom(
  (get) => {
    const time = get(currentDateTimeAtom)
    const [hours, minutes, seconds] = [
      time.getHours(),
      time.getMinutes(), 
      time.getSeconds()
    ].map(num => num.toString().padStart(2, '0'))
    
    return `${hours}:${minutes}:${seconds}`
  }
)

// Derived atom for Finnish greeting based on time
export const finnishGreetingAtom = atom(
  (get) => {
    const time = get(currentDateTimeAtom)
    const hour = time.getHours()
    
    if (hour >= 6 && hour < 10) return 'Hyvää huomenta'
    if (hour >= 10 && hour < 14) return 'Hyvää päivää'
    if (hour >= 14 && hour < 18) return 'Hyvää iltapäivää'
    if (hour >= 18 && hour < 22) return 'Hyvää iltaa'
    return 'Hyvää yötä'
  }
)

// Write-only atom to update the current date/time
export const updateDateTimeAtom = atom(
  null,
  (_get, set) => {
    set(currentDateTimeAtom, new Date())
  }
)