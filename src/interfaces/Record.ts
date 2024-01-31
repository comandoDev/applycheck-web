import { IForm } from "@/interfaces/Form"
import { IUser } from "@/interfaces/User"

interface IRecordStepField {
      key: string
      value?: string
      nonCompliance?: boolean
      fields?: Array<IRecordStepField>
      files?: Array<string>
      observation?: string
      actionPlan?: string
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
      key: string,
      value?: string
      observation?: string
      actionPlan?: string
      files?: Array<string>
      fields?: Array<IRecordStepField>
      nonCompliance?: boolean
}

export type {
  IRecord,
  IRecordStep,
  IRecordStepField,
  IFilledField,
  INonComplianceStep
}
