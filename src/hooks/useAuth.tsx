'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IUser, UserRole } from '@/interfaces/User';
import { message } from 'antd';
import { IAuthContext, IUserSigninProps } from './AuthContext';
import Storage from '@/utils/Storage';
import UserRepository, { ISetPasswordProps } from '@/Repositories/UserRepository';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const [user, setUser] = useState<IUser>()
  const [userToken, setUserToken] = useState<string>()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleUserSignin = async ({ email, password }: IUserSigninProps) => {
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

      if (user.role === UserRole.manager) return router.push('/auth/records')

      return router.push('/auth/forms')
    } catch (error) {
      setError(error as any)
      message.error((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  const handleUserSetPassword = async ({
    userId,
    password,
    passwordConfirmation
  }: ISetPasswordProps) => {
    try {
      setLoading(true)

      const response = await UserRepository.setPassword({
        userId,
        password,
        passwordConfirmation
      })

      message.success(response.data.message)

      return router.push('/login/password/success')
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

  const authContextProvider = {
    user,
    userToken,
    error,
    logout,
    setError,
    handleUserSignin,
    loading,
    setLoading,
    handleUserSetPassword
  }

  return (
    <AuthContext.Provider value={authContextProvider}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)