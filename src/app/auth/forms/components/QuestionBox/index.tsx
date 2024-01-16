import { useEffect, useState } from "react"
import QuestionBoxFooter from "./QuestionBoxFooter"
import { IField, InputType } from "@/interfaces/Form"
import { useForm } from "../../hooks/useForm"
import FormInput from "@/app/auth/forms/components/QuestionBox/Input"

const QuestionBox = ({ field }: { field: IField }) => {
    const formContext = useForm()

    const [value, setValue] = useState<any>()
    const [selectedOption, setSelectedOption] = useState<string>()

    useEffect(() => {
        const filledField = formContext?.filledFields?.find(filledField => filledField.key === field.key)

        const value = filledField?.value !

        setValue(value)
        setSelectedOption(value)
        setValuesToCurrentStep(value)
    }, [formContext?.filledFields])

    const handleOnChange = (targetValue: string): void => {
        setSelectedOption(targetValue)
        setValue(targetValue)

        setValuesToCurrentStep(targetValue)
    }

    const setValuesToCurrentStep = (value: string): void => {
        const currentStep = formContext?.currentStep 

        let exists = false

        currentStep?.fields.find(stepField => {
            if (stepField.key === field.key) {
                stepField.value = value
                exists = true
            }
        })

        if (!exists) {
            currentStep?.fields.push({
                key: field.key,
                value: value
            })
        }

        formContext?.setCurrentStep(currentStep!)
    }

    return (
        <div className="w-full p-6 border border-gray-150 rounded-lg shadow-xl bg-white mb-5">
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
                <div className="text-selected mb-5">{field.key}</div>
                <div>
                {field.type === InputType.select && (
                        <>
                            {field.options?.map(option => {
                                return <div 
                                    key={option.key}
                                    className={`w-full ${selectedOption === option.key ? 'bg-principal text-white' : 'border border-gray-200 text-gray-500 bg-zinc-50'} font-bold rounded-lg p-3 pl-8 mt-3`}
                                    onClick={() => handleOnChange(option.key)}
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
                </div>
            </div>
            <QuestionBoxFooter field={field} />        
        </div>
    )
}

export default QuestionBox