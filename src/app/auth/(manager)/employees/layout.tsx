'use client'

import { EmployeeCreationContextProvider } from "./hooks/NavbarContext/useEmployeeCreation"


const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <EmployeeCreationContextProvider>
        <div className='flex flex-col'>
          {children}
        </div>
    </EmployeeCreationContextProvider>
  )
}

export default Layout
