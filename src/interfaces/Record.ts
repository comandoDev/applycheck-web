interface IRecordStepField {
      key: string
      value?: string
      nonCompliance?: boolean
      fields?: Array<IRecordStepField>
      file?: string
      observation?: string
}

interface IRecordStep {
      order: number
      title: string
      fields: Array<IRecordStepField>
}

enum RecordStatus {
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

export type {
  IRecord,
  IRecordStep,
  IRecordStepField,
  RecordStatus
}
