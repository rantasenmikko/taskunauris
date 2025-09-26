import { atom } from 'jotai'
import { currentUserAtom } from './userAtoms'

// Task interface
export interface Task {
  id: string
  userId: string
  name: string
  createdAt: string
  totalDuration: number // in milliseconds
  isCompleted: boolean
  completedAt?: string
}

// Work session interface
export interface WorkSession {
  id: string
  userId: string
  taskId: string
  date: string
  startTime: string
  endTime: string
  duration: number // in milliseconds
  description: string
}

// Work time tracking state atoms
export const isWorkingAtom = atom<boolean>(false)
export const workSessionStartTimeAtom = atom<number | null>(null)
export const totalWorkedTimeAtom = atom<number>(0) // in milliseconds
export const currentSessionStartAtom = atom<number | null>(null) // For tracking actual session start
export const workSessionsHistoryAtom = atom<WorkSession[]>([]) // Completed sessions

// Task management atoms
export const tasksAtom = atom<Task[]>([]) // All tasks
export const currentTaskIdAtom = atom<string | null>(null) // Currently active task
export const activeTaskAtom = atom<Task | null>( // Current task details
  (get) => {
    const tasks = get(tasksAtom)
    const currentTaskId = get(currentTaskIdAtom)
    return tasks.find(task => task.id === currentTaskId) || null
  }
)

// Derived atoms for filtering tasks
export const ongoingTasksAtom = atom<Task[]>(
  (get) => {
    const tasks = get(tasksAtom)
    return tasks.filter(task => !task.isCompleted)
  }
)

export const completedTasksAtom = atom<Task[]>(
  (get) => {
    const tasks = get(tasksAtom)
    return tasks.filter(task => task.isCompleted)
  }
)

// Complete task atom
export const completeTaskAtom = atom(
  null,
  (get, set, taskId: string) => {
    const tasks = get(tasksAtom)
    const currentTaskId = get(currentTaskIdAtom)
    
    // If this task is currently active, stop it first
    if (currentTaskId === taskId) {
      const isWorking = get(isWorkingAtom)
      if (isWorking) {
        set(isWorkingAtom, false)
        set(workSessionStartTimeAtom, null)
      }
      set(currentTaskIdAtom, null)
      set(totalWorkedTimeAtom, 0)
      set(currentSessionStartAtom, null)
    }
    
    // Mark task as completed
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: true, completedAt: new Date().toLocaleDateString('fi-FI') }
        : task
    )
    set(tasksAtom, updatedTasks)
  }
)

// Reopen task atom
export const reopenTaskAtom = atom(
  null,
  (get, set, taskId: string) => {
    const tasks = get(tasksAtom)
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: false, completedAt: undefined }
        : task
    )
    set(tasksAtom, updatedTasks)
  }
)

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

// Create new task atom
export const createTaskAtom = atom(
  null,
  (get, set, taskName: string) => {
    const now = Date.now()
    const currentUser = get(currentUserAtom)
    const userId = currentUser?.id || 'anonymous'
    
    const newTask: Task = {
      id: `task-${now}`,
      userId: userId,
      name: taskName,
      createdAt: new Date().toLocaleDateString('fi-FI'),
      totalDuration: 0,
      isCompleted: false
    }
    
    const currentTasks = get(tasksAtom)
    set(tasksAtom, [newTask, ...currentTasks])
    
    return newTask.id
  }
)

// Switch to task atom (handles mutual exclusion)
export const switchToTaskAtom = atom(
  null,
  (get, set, taskId: string) => {
    const currentTaskId = get(currentTaskIdAtom)
    const isWorking = get(isWorkingAtom)
    
    if (currentTaskId === taskId) {
      // Same task, just toggle its state
      if (isWorking) {
        set(isWorkingAtom, false)
        set(workSessionStartTimeAtom, null)
      } else {
        const currentTotal = get(totalWorkedTimeAtom)
        set(isWorkingAtom, true)
        set(workSessionStartTimeAtom, Date.now() - currentTotal)
        set(currentSessionStartAtom, Date.now())
      }
    } else {
      // Different task, stop current if working and switch
      if (isWorking) {
        // Stop current session
        set(isWorkingAtom, false)
        set(workSessionStartTimeAtom, null)
      }
      
      // Switch to new task
      set(currentTaskIdAtom, taskId)
      set(totalWorkedTimeAtom, 0)
      set(currentSessionStartAtom, null)
      
      // Start new session immediately
      set(isWorkingAtom, true)
      set(workSessionStartTimeAtom, Date.now())
      set(currentSessionStartAtom, Date.now())
    }
  }
)

// Action atom for starting/stopping work sessions
export const toggleWorkSessionAtom = atom(
  null,
  (get, set) => {
    const isWorking = get(isWorkingAtom)
    const currentTotal = get(totalWorkedTimeAtom)
    const currentTaskId = get(currentTaskIdAtom)
    
    if (!isWorking && currentTaskId !== null) {
      // Start work session for current task
      set(isWorkingAtom, true)
      set(workSessionStartTimeAtom, Date.now() - currentTotal)
      set(currentSessionStartAtom, Date.now())
    } else if (isWorking) {
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
    set(currentTaskIdAtom, null)
  }
)

// Complete work session atom
export const completeWorkSessionAtom = atom(
  null,
  (get, set, description: string) => {
    const sessionStart = get(currentSessionStartAtom)
    const totalWorked = get(totalWorkedTimeAtom)
    const currentTaskId = get(currentTaskIdAtom)
    
    if (sessionStart !== null && totalWorked > 0 && currentTaskId !== null) {
      const now = Date.now()
      const currentSessions = get(workSessionsHistoryAtom)
      const currentUser = get(currentUserAtom)
      const userId = currentUser?.id || 'anonymous'
      
      const newSession: WorkSession = {
        id: `session-${now}`,
        userId: userId,
        taskId: currentTaskId,
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
        duration: totalWorked,
        description: description
      }
      
      // Add new session to history
      set(workSessionsHistoryAtom, [newSession, ...currentSessions])
      
      // Update task total duration
      const tasks = get(tasksAtom)
      const updatedTasks = tasks.map(task => 
        task.id === currentTaskId 
          ? { ...task, totalDuration: task.totalDuration + totalWorked }
          : task
      )
      set(tasksAtom, updatedTasks)
      
      // Reset current session
      set(isWorkingAtom, false)
      set(workSessionStartTimeAtom, null)
      set(totalWorkedTimeAtom, 0)
      set(currentSessionStartAtom, null)
      set(currentTaskIdAtom, null)
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

// Combined atom to complete session and task together
export const completeTaskAndSessionAtom = atom(
  null,
  (get, set, data: { taskId: string; sessionDescription?: string }) => {
    const { taskId, sessionDescription } = data
    const currentTaskId = get(currentTaskIdAtom)
    const totalWorked = get(totalWorkedTimeAtom)
    
    // First, complete the current work session if this task is active and has worked time
    if (currentTaskId === taskId && totalWorked > 0) {
      const description = sessionDescription || 'Tehtävä merkitty valmiiksi'
      set(completeWorkSessionAtom, description)
    }
    
    // Then mark the task as completed
    set(completeTaskAtom, taskId)
  }
)

// User-filtered atoms (for future backend compatibility)
// These atoms filter tasks and sessions by current user
export const userTasksAtom = atom(
  (get) => {
    const allTasks = get(tasksAtom)
    const currentUser = get(currentUserAtom)
    
    if (!currentUser) {
      return allTasks // Return all tasks if no user logged in (backward compatibility)
    }
    
    return allTasks.filter(task => task.userId === currentUser.id)
  }
)

export const userWorkSessionsAtom = atom(
  (get) => {
    const allSessions = get(workSessionsHistoryAtom)
    const currentUser = get(currentUserAtom)
    
    if (!currentUser) {
      return allSessions // Return all sessions if no user logged in
    }
    
    return allSessions.filter(session => session.userId === currentUser.id)
  }
)

// Update the filtered task atoms to use user-filtered tasks
export const userOngoingTasksAtom = atom(
  (get) => {
    const userTasks = get(userTasksAtom)
    return userTasks.filter(task => !task.isCompleted)
  }
)

export const userCompletedTasksAtom = atom(
  (get) => {
    const userTasks = get(userTasksAtom)
    return userTasks.filter(task => task.isCompleted)
  }
)