import { IForm } from "@/interfaces/Form";
import { IFilledField, IRecord, IRecordStep } from "@/interfaces/Record";

export interface IFormContext {
    form?: IForm
    setForm: (form: IForm) => void
    record?: IRecord
    setRecord: (record: IRecord) => void
    findFormById: (formId: string) => Promise<void>
    lastReachedStep: number
    setLastReachedStep: (lastReachedStep: number) => void
    currentStep?: IRecordStep
    setCurrentStep: (currentStep: IRecordStep) => void
    filledFields?: Array<IFilledField>
    setFilledFields: (filledFields: Array<IFilledField>) => void
    findRecordAndSetFilledFields: (number: number) => Promise<void>
    isRecordFinished: () => Promise<boolean>
}