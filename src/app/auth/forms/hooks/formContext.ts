import { IForm } from "@/interfaces/Form";
import { IRecordStep } from "@/interfaces/Record";

export interface IFormContext {
    form?: IForm
    setForm: (form: IForm) => void
    findFormById: (formId: string) => Promise<void>
    lastReachedStep: number
    setLastReachedStep: (lastReachedStep: number) => void
    currentStep?: IRecordStep
    setCurrentStep: (currentStep: IRecordStep) => void
}