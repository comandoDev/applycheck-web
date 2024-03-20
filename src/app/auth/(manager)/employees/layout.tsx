'use client'

import { UserCreationContextProvider } from "./hooks/NavbarContext/useUserCreation"


const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <UserCreationContextProvider>
        <div className='flex flex-col'>
          {children}
        </div>
    </UserCreationContextProvider>
  )
}

export default Layout
