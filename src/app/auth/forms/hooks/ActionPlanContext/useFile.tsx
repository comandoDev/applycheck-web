'use client'

import { IRecordActionPlan } from "@/interfaces/Record"
import { IActionPlanContext } from "./actionPlanContext"
import { ReactNode, createContext, useContext, useState } from "react"

const ActionPlanContext = createContext<IActionPlanContext | null>(null)

export const ActionPlanContextProvider = ({ children }: { children: ReactNode }) => {
  const [actionPlan, setActionPlan] = useState<IRecordActionPlan>()
  const [fieldKey, setFieldKey] = useState<string>()

  const actionPlanContextProvider = {
    actionPlan,
    setActionPlan,
    fieldKey,
    setFieldKey,
  }

  return (
    <ActionPlanContext.Provider value={actionPlanContextProvider}>
      {children}
    </ActionPlanContext.Provider>
  )
}

export const useActionPlan = () => useContext(ActionPlanContext)