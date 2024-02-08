'use client'

import { ManagerNavbarContextProvider } from "@/app/auth/records/hooks/NavbarContext/useManagerNavbar"
import Header from "./components/Header"
import { RecordFiltersContextProvider } from "./hooks/RecordFiltersContext/useRecordFilter"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <ManagerNavbarContextProvider>
      <RecordFiltersContextProvider>
        <Header />
        <div className='flex flex-col'>
          {children}
        </div>
      </RecordFiltersContextProvider>
    </ManagerNavbarContextProvider>
  )
}

export default Layout
