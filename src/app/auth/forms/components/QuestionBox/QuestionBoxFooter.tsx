import { IField } from "@/interfaces/Form"
import { CameraPlus, ChatText, WarningDiamond } from "@phosphor-icons/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "../../hooks/useForm"
import FileInput from "./FileInput"

const QuestionBoxFooter = ({ field }: { field: IField }) => {
    const formContext = useForm()

    const [selectedIndex, setSelectedIndex] = useState<number>()
    const [showBox, setShowBox] = useState<boolean>()

    const [actionPlan, setActionPlan] = useState<string>('')
    const [observation, setObservation] = useState<string>('')

    useEffect(() => {
        const filledField = formContext?.filledFields?.find(filledField => filledField.key === field.key)

        if (filledField?.actionPlan) {
            setActionPlan(filledField?.actionPlan)
            setValuesToCurrentStep(filledField?.actionPlan, 0)
        }
        if (filledField?.observation) {
            setObservation(filledField?.observation)
            setValuesToCurrentStep(filledField?.observation, 1)
        }
    }, [formContext?.filledFields])
    
    const onClick = (index: number) => {
        if (showBox && selectedIndex === index) {
            setSelectedIndex(3)
            setShowBox(false)    
        } else {
            setSelectedIndex(index)
            setShowBox(true)
        }
    }

    const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (selectedIndex === 0) {
            setValuesToCurrentStep('actionPlan', value)
            setActionPlan(value)
        }
        if (selectedIndex === 1) {
            setValuesToCurrentStep('observation', value)
            setObservation(value)
        }
    }

    const setValuesToCurrentStep = (key: string, value: string) => {
        const currentStep = formContext?.currentStep 

        let exists = false

        currentStep?.fields.find(stepField => {
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

    return (
        <>
            <div className="w-full flex justify-between text-xs text-center text-gray-500 font-bold"> 
                <div className={`flex justify-center items-center ${(selectedIndex === 0) && 'text-principal'}`} onClick={() => onClick(0)}>
                    <WarningDiamond size={20} weight="fill" className="mr-1" />
                    <span>Plano Ação</span>    
                </div>    
                <div className={`flex justify-center items-center ${(selectedIndex === 1) && 'text-principal'}`} onClick={() => onClick(1)}>
                    <ChatText size={20} weight="fill" className="mr-1" />
                    <span>Observação</span>    
                </div>        
                <label htmlFor={field.key} className={`flex justify-center items-center ${(selectedIndex === 2) && 'text-principal'}`} onClick={() => onClick(2)}>
                    <CameraPlus size={20} weight="fill" className="mr-1" />
                    <span>Mídia</span>    
                </label>    
            </div>  
            { (showBox && selectedIndex !== 2) && (
                <input 
                    type="text"
                    className="w-full p-5 bg-white border border-gray-300 rounded-lg mt-5"
                    value={(selectedIndex === 0) ? actionPlan : observation}
                    onChange={handleInputOnChange}
                    placeholder={(selectedIndex === 0) ? 'Adicione um plano de ação' : 'Adicione uma observação'}
                />
            ) }
            { (showBox && selectedIndex === 2) && (
                <FileInput inputId={field.key} />
            ) }
        </>
    )
}

export default QuestionBoxFooter