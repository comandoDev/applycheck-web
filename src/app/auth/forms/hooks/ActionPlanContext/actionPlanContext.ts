import { IActionPlan } from "@/interfaces/ActionPlan"

export interface IActionPlanContext {
    actionPlan?: Partial<IActionPlan>
    setActionPlan: (actionPlan: Partial<IActionPlan>) => void
    fieldKey?: string
    setFieldKey: (file: string) => void
}