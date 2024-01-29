'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IManagerNavbarContext, ManagerNavbarSelectedOption } from './ManagerNavbarContext';

const ManagerNavbarContext = createContext<IManagerNavbarContext | null>(null)

export const ManagerNavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<ManagerNavbarSelectedOption>(ManagerNavbarSelectedOption.records)

  const navbarContextProvider = {
    selected,
    setSelected
  }

  return (
    <ManagerNavbarContext.Provider value={navbarContextProvider}>
      {children}
    </ManagerNavbarContext.Provider>
  )
}

export const useManagerNavbar = () => useContext(ManagerNavbarContext)