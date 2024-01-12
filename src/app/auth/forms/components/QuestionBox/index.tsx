import { useEffect, useState } from "react"
import QuestionBoxFooter from "./QuestionBoxFooter"
import { IField, InputType } from "@/interfaces/Form"
import { useForm } from "../../hooks/useForm"

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

    const onChange = (targetValue: string): void => {
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

    const defaultStyle = 'w-full rounded-lg p-3 pl-4 mt-3 bg-white border border-gray-300'
    
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
                                    onClick={() => onChange(option.key)}
                                    >{option.key}</div>
                            })}
                        </>
                    )}
                    {field.type === InputType.text && (
                        <input 
                            className={`${defaultStyle}`} 
                            type="text"
                            placeholder="Digite um valor"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            />
                    )}
                    {field.type === InputType.number && (
                        <input 
                            className={`${defaultStyle}`} 
                            type="number"
                            placeholder="Digite um número"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                           />
                    )}
                    {field.type === InputType.date && (
                        <input 
                            className={`${defaultStyle}`}
                            type="date"
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Selecione uma data"
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