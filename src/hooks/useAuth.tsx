'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { ISetUserPasswordProps, IUser, UserRole } from '@/interfaces/User';
import { message } from 'antd';
import { IAuthContext, IManagerSigninProps, IEmployeeSigninProps } from './AuthContext';
import Storage from '@/utils/Storage';
import UserRepository from '@/Repositories/UserRepository';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const [user, setUser] = useState<IUser>()
  const [userToken, setUserToken] = useState<string>()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleManagerSignin = async ({ email, password }: IManagerSigninProps) => {
    try {
      setLoading(true)

      const response = await UserRepository.signin({
        email,
        password
      })

      const { user, token } = response.data.data!

      setUser(user)
      setUserToken(token)

      Storage.setUser(user)
      Storage.setUserToken(token!)
      
      message.success(response.data.message)

      return router.push('/auth/records')
    } catch (error) {
      setError(error as any)
      message.error((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmployeeSignin = async ({ accountName, password }: IEmployeeSigninProps) => {
    try {
      setLoading(true)

      const existsPassword = await hasPassword(accountName) 

      if(!existsPassword) return router.push(`/login/password/${accountName}`)

      const response = await UserRepository.employeeSignin({
        accountName,
        password
      })

      const { user, token } = response.data.data!

      setUser(user)
      setUserToken(token)

      Storage.setUser(user)
      Storage.setUserToken(token!)
      
      message.success(response.data.message)

      return router.push('/auth/forms')
    } catch (error) {
      setError(error as any)
      message.error((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    const userRole = Storage.getUser()?.role
    Storage.clear()

    if (userRole === UserRole.employee) return router.push('/login')

    router.push('/login/manager')
  }

  const hasPassword = async (accountName: string): Promise<boolean> => {
    const response = await UserRepository.hasPassword(accountName)

    const hasPassword = response.data.data?.hasPassword!

    return hasPassword
  }


  const setPassword = async ({
    accountName,
    password,
    passwordConfirmation
  }: ISetUserPasswordProps): Promise<void> => {
    try {
      setLoading(true)

      await UserRepository.setPassword({
        accountName,
        password, 
        passwordConfirmation
      })
    } catch (error) {
      setError(error as any)
      message.error((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  const authContextProvider = {
    user,
    userToken,
    error,
    logout,
    setError,
    handleManagerSignin,
    handleEmployeeSignin,
    loading,
    setLoading,
    setPassword
  }

  return (
    <AuthContext.Provider value={authContextProvider}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)