import { IUser } from '@/interfaces/User'

class Storage {
  setUser (user: IUser): void {
    if (this.isWindowDefined()) localStorage.setItem('user', JSON.stringify(user))
  }

  getUser (): IUser | null {
    if (!this.isWindowDefined()) return null

    const user = localStorage.getItem('user')
    if (!user) return null

    return JSON.parse(user)
  }

  setUserToken (token: string): void {
    if (this.isWindowDefined()) localStorage.setItem('userToken', token)
  }

  getUserToken (): string | null {
    if (!this.isWindowDefined()) return null

    return localStorage.getItem('userToken')
  }

  clear (): void {
    if (this.isWindowDefined()) localStorage.clear()
  }

  isWindowDefined () {
    return typeof window !== 'undefined'
  }
}

export default new Storage()
