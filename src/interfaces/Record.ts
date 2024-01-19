interface IRecordStepField {
      key: string
      value?: string
      nonCompliance?: boolean
      fields?: Array<IRecordStepField>
      file?: string
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

      tenantId: string
      formId: string
      employeeId: string
}

interface IFilledField { 
      key: string,
      value?: string
      observation?: string
      actionPlan?: string
      file?: string
      fields?: Array<IRecordStepField>
}

export type {
  IRecord,
  IRecordStep,
  IRecordStepField,
  IFilledField
}
