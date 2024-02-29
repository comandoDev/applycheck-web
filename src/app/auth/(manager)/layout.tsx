'use client'

import Header from "./components/Header"
import { ManagerNavbarContextProvider } from "./hooks/NavbarContext/useManagerNavbar"
import { RecordFiltersContextProvider } from "./records/hooks/RecordFiltersContext/useRecordFilter"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <RecordFiltersContextProvider>
      <ManagerNavbarContextProvider>
        <Header />
        <div className='flex flex-col'>
          {children}
        </div>
      </ManagerNavbarContextProvider>
    </RecordFiltersContextProvider>
  )
}

export default Layout
