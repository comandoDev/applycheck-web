'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { INavbarContext, SelectedOption } from './NavbarContext';

const NavbarContext = createContext<INavbarContext | null>(null)

export const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false)
  const [selected, setSelected] = useState<SelectedOption>(SelectedOption.forms)

  const navbarContextProvider = {
    show, 
    setShow,
    selected,
    setSelected
  }

  return (
    <NavbarContext.Provider value={navbarContextProvider}>
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbar = () => useContext(NavbarContext)