'use client'

import { IActionPlan } from "@/interfaces/ActionPlan"
import { IActionPlanContext } from "./actionPlanContext"
import { ReactNode, createContext, useContext, useState } from "react"

const ActionPlanContext = createContext<IActionPlanContext | null>(null)

export const ActionPlanContextProvider = ({ children }: { children: ReactNode }) => {
  const [actionPlan, setActionPlan] = useState<Partial<IActionPlan>>()
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