'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IUserCreationContext } from './UserCreationContext';
import { UserRole } from '@/interfaces/User';

const UserCreationContext = createContext<IUserCreationContext>({ } as IUserCreationContext)

export const UserCreationContextProvider = ({ children }: { children: ReactNode }) => {
  const [updateUsersTable, setUpdateUsersTable] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [name, setName] = useState<string>()
  const [accountName, setAccountName] = useState<string>()
  const [active, setActive] = useState<boolean>()
  const [formsIds, setFormsIds] = useState<Array<string>>([])
  const [search, setSearch] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [role, setRole] = useState<UserRole>()

  const clearProps = () => {
    setId('')
    setName('')
    setAccountName('')
    setEmail('')
    setFormsIds([])
  }
  
  const userCreationContextContextProvider = {
    updateUsersTable, 
    setUpdateUsersTable,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    id,
    setId,
    name,
    setName,
    accountName,
    setAccountName,
    active,
    setActive,
    formsIds,
    setFormsIds,
    search,
    setSearch,
    email,
    setEmail,
    role,
    setRole,
    clearProps
  }

  return (
    <UserCreationContext.Provider value={userCreationContextContextProvider}>
      {children}
    </UserCreationContext.Provider>
  )
}

export const useUserCreation = () => useContext(UserCreationContext)