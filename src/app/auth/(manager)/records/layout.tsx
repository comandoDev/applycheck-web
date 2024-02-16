'use client'

import { RecordFiltersContextProvider } from "./hooks/RecordFiltersContext/useRecordFilter"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
      <RecordFiltersContextProvider>
        <div className='flex flex-col'>
          {children}
        </div>
      </RecordFiltersContextProvider>
  )
}

export default Layout
