import { IRecordActionPlan } from "@/interfaces/Record"

export interface IActionPlanContext {
    actionPlan?: IRecordActionPlan
    setActionPlan: (actionPlan: IRecordActionPlan) => void
    fieldKey?: string
    setFieldKey: (file: string) => void
}