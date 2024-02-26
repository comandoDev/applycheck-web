'use client'

import { ISignatureContext } from "./signatureContext"
import { ReactNode, createContext, useContext, useState } from "react"

const SignatureContext = createContext<ISignatureContext | null>(null)

export const SignatureContextProvider = ({ children }: { children: ReactNode }) => {
  const [signature, setSignature] = useState<string>()
  const [fieldKey, setFieldKey] = useState<string>()

  const signatureContextProvider = {
    signature,
    setSignature,
    fieldKey,
    setFieldKey,
  }

  return (
    <SignatureContext.Provider value={signatureContextProvider}>
      {children}
    </SignatureContext.Provider>
  )
}

export const useSignature = () => useContext(SignatureContext)