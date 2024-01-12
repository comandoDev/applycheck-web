import { IField } from "@/interfaces/Form"
import { CameraPlus, ChatText, WarningDiamond } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useForm } from "../../hooks/useForm"

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

    const onChange = (value: string) => {
        if (selectedIndex == 0) setActionPlan(value)
        if (selectedIndex == 1) setObservation(value)
    
        setValuesToCurrentStep(value, selectedIndex!)
    }

    const setValuesToCurrentStep = (value: string, index: number) => {
        const prop = (index === 0) ? 'actionPlan' : 'observation'

        const currentStep = formContext?.currentStep 

        let exists = false

        currentStep?.fields.find(stepField => {
            if (stepField.key === field.key) {
                stepField[prop] = value
                exists = true
            }
        })

        if (!exists) {
            currentStep?.fields.push({
                key: field.key,
                [prop]: value
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
                <div className={`flex justify-center items-center ${(selectedIndex === 2) && 'text-principal'}`} onClick={() => onClick(2)}>
                    <CameraPlus size={20} weight="fill" className="mr-1" />
                    <span>Mídia</span>    
                </div>    
            </div>  
            { showBox && (
                <input 
                    type="text"
                    className="w-full p-5 bg-white border border-gray-300 rounded-lg mt-5 row-span-1"
                    value={(selectedIndex === 0) ? actionPlan : observation}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={(selectedIndex === 0) ? 'Adicione um plano de ação' : 'Adicione um comentário'}
                />
            ) }
        </>
    )
}

export default QuestionBoxFooter