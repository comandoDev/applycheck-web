'use client'

import { createContext, ReactNode, useContext, useState } from 'react';
import { IRecordFiltersContext } from './RecordFiltersContext';

const RecordFiltersContext = createContext<IRecordFiltersContext | null>(null)

export const RecordFiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const [formId, setFormId] = useState<string | null>(null)
  const [employeeId, setEmployeeId] = useState<string | null>(null)

  const recordFiltersContextProvider = {
    formId,
    setFormId,
    employeeId,
    setEmployeeId
  }

  return (
    <RecordFiltersContext.Provider value={recordFiltersContextProvider}>
      {children}
    </RecordFiltersContext.Provider>
  )
}

export const useRecordFiltersContext = () => useContext(RecordFiltersContext)