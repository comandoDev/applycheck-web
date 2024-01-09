enum InputType {
    multipleQuestion = 'multipleQuestions',
    select = 'select',
    text = 'text',
    number = 'number',
    date = 'date',
    hour = 'hour'
}

interface ISelectOption {
    key: string
    nonCompliance: boolean
}

interface IField {
    key: string
    type: InputType
    fields?: Array<IField>
    options?: Array<ISelectOption>
    observation?: boolean
    attachFile?: boolean
    actionPlan?: boolean
  }

interface IFormStep {
    title: string
    order: number
    fields: Array<IField>
}

enum FormType {
    inspeçãoInterna = 'inspeçãoInterna',
    inspeçãoExterna = 'inspeçãoExterna',
    inspeçãoVeicular = 'inspeçãoVeicular'
}

interface IForm {
    id?: string
    tenantId: string
    createdAt?: Date
    description?: string
    procedureFile?: string

    type: FormType
    steps: Array<IFormStep>
    managerId: string
    title: string
}

export type {
  FormType,
  IField,
  IForm,
  IFormStep,
  InputType,
  ISelectOption
}
