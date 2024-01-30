'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IUser, UserRole } from '@/interfaces/User';
import { message } from 'antd';
import { IAuthContext, IUserSigninProps } from './AuthContext';
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
    setLoading
  }

  return (
    <AuthContext.Provider value={authContextProvider}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)