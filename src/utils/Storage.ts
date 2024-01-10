import { IForm } from '@/interfaces/Form'
import { IRecordStep } from '@/interfaces/Record'
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

  setForm (form: IForm): void {
    localStorage.setItem('form', JSON.stringify(form))
  }

  getForm (): IForm | null {
    const form = localStorage.getItem('form')
    if (!form) return null

    return JSON.parse(form)
  }

  setLastReachedStep (lastReachedStep: number): void {
    localStorage.setItem('lastReachedStep', JSON.stringify(lastReachedStep))
  }

  getLastReachedStep (): number | null {
    const lastReachedStep = localStorage.getItem('lastReachedStep')
    if (!lastReachedStep) return null

    return JSON.parse(lastReachedStep)
  }

  setCurrentStep (currentStep: IRecordStep): void {
    localStorage.setItem('currentStep', JSON.stringify(currentStep))
  }

  getCurrentStep (): IRecordStep | null {
    const currentStep = localStorage.getItem('currentStep')
    if (!currentStep) return null

    return JSON.parse(currentStep)
  }

  clear (): void {
    localStorage.clear()
  }
}

export default new Storage()
