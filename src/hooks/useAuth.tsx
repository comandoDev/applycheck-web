'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IUser } from '@/interfaces/User';
import { message } from 'antd';
import { IAuthContext } from './AuthContext';
import Storage from '@/utils/Storage';
import UserRepository from '@/Repositories/UserRepository';

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>()
  const [userToken, setUserToken] = useState<string>()
  const [error, setError] = useState()

  const handleUserSignin = async (email: string, password: string) => {
    try {
      const response = await UserRepository.signin({
        email,
        password
      })

      const data = response.data.data

      setUser(data?.user)
      setUserToken(data?.token)

      Storage.setUser(data?.user!)
      Storage.setUserToken(data?.token!)
      
      message.success(response.data.message)
    } catch (error) {
      setError(error as any)
      message.error((error as any).message)
    }

  }

  const logout = () => {
    Storage.clear()
  }

  const authContextProvider = {
    user,
    userToken,
    error,
    logout,
    setError,
    handleUserSignin
  }

  return (
    <AuthContext.Provider value={authContextProvider}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)