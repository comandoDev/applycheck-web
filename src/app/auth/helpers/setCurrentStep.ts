import { useForm } from "@/app/auth/forms/hooks/FormContext/useForm"
import { IField } from "@/interfaces/Form"

interface ISetCurrentStep {
    key: string
    value: string
    field: IField
}

export const setCurrentStep = ({
    field,
    key,
    value
}: ISetCurrentStep) => {
    const formContext = useForm()
    
    const currentStep = formContext?.currentStep 

    let exists = false

    currentStep?.fields.map(stepField => {
        if (stepField.key === field.key) {
            stepField[key] = value
            exists = true
        }
    })

    if (!exists) {
        currentStep?.fields.push({
            key: field.key,
            [key]: value
        })
    }

    formContext?.setCurrentStep(currentStep!)
}