import { atom } from 'jotai'

// User interface
export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

// Dummy users for testing
const dummyUsers: User[] = [
  {
    id: 'user-1',
    username: 'testikayttaja',
    email: 'testi@example.com',
    createdAt: new Date().toLocaleDateString('fi-FI')
  },
  {
    id: 'user-2', 
    username: 'demokäyttäjä',
    email: 'demo@example.com',
    createdAt: new Date().toLocaleDateString('fi-FI')
  }
]

// Current user state (null means not logged in)
export const currentUserAtom = atom<User | null>(null)

// Available users for testing
export const availableUsersAtom = atom<User[]>(dummyUsers)

// Login atom
export const loginAtom = atom(
  null,
  (get, set, credentials: { username: string; password: string }) => {
    const users = get(availableUsersAtom)
    
    // Simple dummy authentication - just check username
    const user = users.find(u => u.username === credentials.username)
    
    if (user) {
      set(currentUserAtom, user)
      return { success: true, user }
    }
    
    return { success: false, error: 'Käyttäjätunnus ei löydy' }
  }
)

// Logout atom
export const logoutAtom = atom(
  null,
  (_get, set) => {
    set(currentUserAtom, null)
  }
)

// Check if user is authenticated
export const isAuthenticatedAtom = atom(
  (get) => {
    const user = get(currentUserAtom)
    return user !== null
  }
)

// Auto-login for development/testing (optional)
export const initializeUserAtom = atom(
  null,
  (get, set) => {
    const currentUser = get(currentUserAtom)
    const users = get(availableUsersAtom)
    
    // Auto-login first user if no user is logged in (for testing)
    if (!currentUser && users.length > 0) {
      set(currentUserAtom, users[0])
    }
  }
)