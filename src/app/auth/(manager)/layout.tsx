'use client'

import Header from "./components/Header"
import { ManagerNavbarContextProvider } from "./hooks/NavbarContext/useManagerNavbar"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <ManagerNavbarContextProvider>
        <Header />
        <div className='flex flex-col'>
          {children}
        </div>
    </ManagerNavbarContextProvider>
  )
}

export default Layout
