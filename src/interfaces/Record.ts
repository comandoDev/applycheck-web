import { IForm, InputType } from "@/interfaces/Form"
import { IUser } from "@/interfaces/User"
import { IActionPlan } from "./ActionPlan"

interface IRecordStepField {
      key: string
      type: InputType
      value?: string
      nonCompliance?: boolean
      fields?: Array<IRecordStepField>
      files?: Array<string>
      observation?: string
      actionPlan?: IActionPlan
      actionPlanId?: string
      fatherKey?: string
      hasChildren?: boolean
}

interface IRecordStep {
      order: number
      title: string
      fields: Array<IRecordStepField>
}

export enum RecordStatus {
      open = 'aberto',
      analysing = 'analisando',
      conclued = 'concluido',
}

interface INonComplianceStep {
      title: string
      order: number
      nonComplianceCount: number
}

interface IRecord {
      id?: string
      createdAt?: Date
      endTime?: Date
      startTime?: Date
      lastReachedStep?: number
      steps?: Array<IRecordStep>
      status?: RecordStatus
      managerId?: string
      actionPlan?: string
      hasNonCompliance?: boolean
      nonComplianceCount?: number
      employee?: IUser
      form?: IForm
      nonComplianceSteps?: Array<INonComplianceStep>

      tenantId: string
      formId: string
      employeeId: string
}

interface IFilledField { 
      key: string
      type: InputType
      value?: string
      observation?: string
      actionPlan?: IActionPlan
      actionPlanId?: string
      files?: Array<string>
      fields?: Array<IRecordStepField>
      nonCompliance?: boolean
}

interface IRecordParams {
      formId?: string
      employeeId?: string
      status?: RecordStatus
      hasNonCompliance?: boolean
      createdAt?: string
}

export type {
  IRecord,
  IRecordStep,
  IRecordStepField,
  IFilledField,
  INonComplianceStep,
  IRecordParams
}
