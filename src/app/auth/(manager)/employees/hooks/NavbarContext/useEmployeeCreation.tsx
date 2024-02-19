'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IEmployeeCreationContext } from './EmployeeCreationContext';

const EmployeeCreationContext = createContext<IEmployeeCreationContext | null>(null)

export const EmployeeCreationContextProvider = ({ children }: { children: ReactNode }) => {
  const [updateUsersTable, setUpdateUsersTable] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [name, setName] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [accountName, setAccountName] = useState<string>()
  const [active, setActive] = useState<boolean>()
  const [formsIds, setFormsIds] = useState<Array<string>>([])
  
  const navbarContextProvider = {
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
    password,
    setPassword,
    accountName,
    setAccountName,
    active,
    setActive,
    formsIds,
    setFormsIds
  }

  return (
    <EmployeeCreationContext.Provider value={navbarContextProvider}>
      {children}
    </EmployeeCreationContext.Provider>
  )
}

export const useEmployeeCreation = () => useContext(EmployeeCreationContext)