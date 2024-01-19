import { IUser } from '@/interfaces/User'

class Storage {
  setUser (user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser (): IUser | null {
    const user = localStorage.getItem('user')
    if (!user) return null

    return JSON.parse(user)
  }

  setUserToken (token: string): void {
    localStorage.setItem('userToken', token)
  }

  getUserToken (): string | null {
    return localStorage.getItem('userToken')
  }

  clear (): void {
    localStorage.clear()
  }
}

export default new Storage()
