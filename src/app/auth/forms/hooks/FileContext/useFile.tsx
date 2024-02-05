'use client'

import { IFileContext } from "./fileContext"
import { ReactNode, createContext, useContext, useState } from "react"

const FileContext = createContext<IFileContext | null>(null)

export const FileContextProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<Array<string>>([])
  const [fieldKey, setFieldKey] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const fileContextProvider = {
    files,
    setFiles,
    fieldKey,
    setFieldKey,
    loading,
    setLoading
  }

  return (
    <FileContext.Provider value={fileContextProvider}>
      {children}
    </FileContext.Provider>
  )
}

export const useFile = () => useContext(FileContext)