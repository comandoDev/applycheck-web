export enum InputType {
    multipleQuestions = 'multipleQuestions',
    select = 'select',
    text = 'text',
    number = 'number',
    date = 'date',
    time = 'time',
    signature = 'signature',
    textArray = 'textArray',
    checkbox = 'checkbox'
}

interface ISelectOption {
    key: string
    nonCompliance?: boolean
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

export enum FormType {
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
    totalSteps: number
}

export type {
  IField,
  IForm,
  IFormStep,
  ISelectOption
}
