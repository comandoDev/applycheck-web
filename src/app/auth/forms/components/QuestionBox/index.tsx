import { useEffect, useState } from "react"
import QuestionBoxFooter from "./QuestionBoxFooter"
import { IField, InputType } from "@/interfaces/Form"
import { useForm } from "../../hooks/FormContext/useForm"
import FormInput from "@/app/auth/forms/components/QuestionBox/Input"

const QuestionBox = ({ field, fatherField }: { field: IField, fatherField?: IField }) => {
    const formContext = useForm()

    const [value, setValue] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<string>()

    useEffect(() => {   
        const filledField = formContext?.filledFields?.find(filledField => filledField.key === field.key)
        setValues(filledField?.value!, filledField?.nonCompliance!)
    }, [formContext?.filledFields])

    const handleOnChange = (targetValue: string, nonCompliance?: boolean): void => {
        setValues(targetValue, nonCompliance)
    }

    const setValues = (value: string, nonCompliance?: boolean) => {
        setSelectedOption(value)
        setValue(value)
        setValuesToCurrentStep(value, nonCompliance)
    }

    const setValuesToCurrentStep = (value: string, nonCompliance?: boolean): void => {
        const currentStep = formContext?.currentStep 
        let exists = false

        currentStep?.fields.map(stepField => {
            if (stepField.key === field.key) {
                if (field.type === InputType.multipleQuestions) stepField.hasChildren = true
                if (fatherField) stepField.fatherKey = fatherField.key
                stepField.nonCompliance = nonCompliance
                stepField.value = value
                exists = true
            }
        })

        if (!exists) {
            currentStep?.fields.push({
                key: field.key,
                nonCompliance,
                value: value
            })
        }

        formContext?.setCurrentStep(currentStep!)
    }

    return (
        <>
            <div className="w-full p-6 border border-gray-150 rounded-lg shadow-sm bg-white mt-5">
                <div className="border-b-2 border-gray-300 pb-4 mb-4">
                    <div className="text-selected mb-5">{field.key}</div>
                    <div>
                        {field.type === InputType.select && (
                            <>
                                {field.options?.map(option => {
                                    return <div 
                                        key={option.key}
                                        className={`w-full ${selectedOption === option.key ? 'bg-principal text-white' : 'border border-gray-200 text-gray-500 bg-zinc-50'} font-bold rounded-lg p-3 pl-8 mt-3`}
                                        onClick={() => handleOnChange(option.key, option.nonCompliance)}
                                        >{option.key}</div>
                                })}
                            </>
                        )}
                        {field.type === InputType.text && (
                            <FormInput 
                                onChange={handleOnChange}
                                placeholder="Digite um valor"
                                type={InputType.text}
                                value={value}
                            />
                        )}
                        {field.type === InputType.number && (
                            <FormInput 
                                onChange={handleOnChange}
                                placeholder="Digite um número"
                                type={InputType.number}
                                value={value}
                            />
                        )}
                        {field.type === InputType.date && (
                            <FormInput 
                                onChange={handleOnChange}
                                placeholder="Selecione uma data"
                                type={InputType.date}
                                value={value}
                            />
                        )}
                        {field.type === InputType.multipleQuestions && (
                            <>
                                {  field.fields?.map(f => {
                                    return <QuestionBox fatherField={field} field={f} key={f.key} />
                                })}
                            </>
                        )}
                    </div>
                </div>
            { field.type !== InputType.multipleQuestions &&  <QuestionBoxFooter field={field} />  }             
            </div>
        </>
    )
}

export default QuestionBox