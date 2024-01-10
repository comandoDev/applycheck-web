import { ChangeEvent, useEffect, useState } from "react"
import QuestionBoxFooter from "./QuestionBoxFooter"
import { IField, InputType } from "@/interfaces/Form"
import { useForm } from "../../hooks/useForm"
import Storage from "@/utils/Storage"

const QuestionBox = ({ field }: { field: IField }) => {
    const formContext = useForm()

    const [value, setValue] = useState<any>()

    const onChange = (targetValue: string): void => {
        setValue(targetValue)

        // const currentStep = formContext?.currentStep 
        const currentStep = Storage.getCurrentStep()

        let exists = false

        currentStep?.fields.find(stepField => {
            if (stepField.key === field.key) {
                stepField.value = targetValue
                exists = true
            }
        })

        if (!exists) {
            currentStep?.fields.push({
                key: field.key,
                value: targetValue
            })
        }

        // formContext?.setCurrentStep(currentStep!)
        Storage.setCurrentStep(currentStep!)
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
                                    className={`w-full bg-zinc-300 text-white font-bold rounded-lg p-3 pl-8 mt-3 hover:bg-principal`}
                                    onClick={() => onChange(option.key)}
                                    >{option.key}</div>
                            })}
                        </>
                    )}
                    {field.type === InputType.text && (
                        <input 
                            className={`w-full rounded-lg p-3 pl-8 mt-3 bg-white border border-gray-300`} 
                            type="text"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            ></input>
                    )}
                    {field.type === InputType.number && (
                        <input 
                            className={`w-full rounded-lg p-3 pl-8 mt-3 bg-white border border-gray-300`} 
                            type="number"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            ></input>
                    )}
                    {field.type === InputType.date && (
                        <input 
                            className={`w-full rounded-lg p-3 pl-8 mt-3 bg-white border border-gray-300`}
                            type="date"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                            ></input>
                    )}
                </div>
            </div>
            <QuestionBoxFooter />        
        </div>
    )
}

export default QuestionBox