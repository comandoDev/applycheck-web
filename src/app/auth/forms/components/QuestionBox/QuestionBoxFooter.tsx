import { IField } from "@/interfaces/Form"
import { CameraPlus, ChatText, PlusCircle, Trash, TrashSimple, WarningDiamond } from "@phosphor-icons/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "../../hooks/FormContext/useForm"
import FileInput from "./FileInput"
import { Image } from "antd"
import { useFile } from "../../hooks/FileContext/useFile"
import { ClipLoader } from "react-spinners"

const QuestionBoxFooter = ({ field }: { field: IField }) => {
    const formContext = useForm()
    const fileContext = useFile()

    const [selectedIndex, setSelectedIndex] = useState<number>()
    const [showBox, setShowBox] = useState<boolean>()

    const [actionPlan, setActionPlan] = useState<string>('')
    const [observation, setObservation] = useState<string>('')
    const [files, setFiles] = useState<Array<string>>([])

    useEffect(() => {
        const filledField = formContext?.filledFields?.find(filledField => filledField.key === field.key)

        if (filledField?.actionPlan) {
            setActionPlan(filledField?.actionPlan)
            setValuesToCurrentStep('actionPlan', filledField?.actionPlan)
        }

        if (filledField?.observation) {
            setObservation(filledField?.observation)
            setValuesToCurrentStep('observation', filledField?.observation)
        }

        const files = filledField?.files || (fileContext?.fieldKey === field.key ? fileContext.files : undefined)

        console.log({ files }, 'USE EFFECT')

        if (files?.length) {
            setFiles(files)
            files.map(file => setValuesToCurrentStep('files', file))
        }
    }, [formContext?.filledFields, fileContext?.files])
    
    const handleOnClick = (index: number) => {
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

    const handleTrashOnClick = (deletedFile: string) => {
        const updatedFiles = files.filter(file => file !== deletedFile)
        
        setFiles(updatedFiles)

        updatedFiles.map(file => setValuesToCurrentStep('files', file))

        fileContext?.setFiles(updatedFiles)
        if (!updatedFiles.length) handleOnClick(2)
    }

    const setValuesToCurrentStep = (key: 'files' | 'actionPlan' |  'observation', value: string) => {
        const currentStep = formContext?.currentStep 
        console.log({ currentStep })
        let exists = false

        currentStep?.fields.map(stepField => {
            if (stepField.key === field.key) {
                if(key === 'files') {
                    if (!stepField.files) stepField.files = []
                    console.log({ stepFieldFiles: stepField.files })
                    stepField.files.push(value)
                } else {
                    stepField[key] = value
                }
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
                <div className={`flex justify-center items-center ${(selectedIndex === 0) && 'text-principal'}`} onClick={() => handleOnClick(0)}>
                    <WarningDiamond size={20} weight="fill" className="mr-1" />
                    <span>Plano Ação</span>    
                </div>    
                <div className={`flex justify-center items-center ${(selectedIndex === 1) && 'text-principal'}`} onClick={() => handleOnClick(1)}>
                    <ChatText size={20} weight="fill" className="mr-1" />
                    <span>Observação</span>    
                </div>        
                <div className={`flex justify-center items-center ${(selectedIndex === 2) && 'text-principal'}`} onClick={() => handleOnClick(2)}>
                    <CameraPlus size={20} weight="fill" className="mr-1" />
                    <span>Mídia</span>    
                </div>    
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

            { (files.length && showBox && selectedIndex === 2) && (
                <div>
                    <div className="flex flex-col w-full border-gray-300">
                        {files.map(file => {
                            return (
                                <div className="flex justify-between items-center text-red-500 mt-4 pt-4 border-t-2">
                                    <Image
                                        key={file}
                                        width={100}
                                        src={file}
                                    />
                                    <Trash size={32} onClick={() => handleTrashOnClick(file)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) }

            { (fileContext?.loading && showBox && selectedIndex === 2) && (
                <div className="flex justify-center items-center text-red-500 mt-4 pt-4 border-t-2 border-gray-300">
                    <ClipLoader
                        color={'#287AF8'}
                        loading={fileContext.loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) }

            { (showBox && selectedIndex === 2) && (
                <div className="flex justify-center w-full mt-5 text-principal">
                    <label htmlFor={field.key}><PlusCircle size={36} /></label>
                    <FileInput 
                        field={field}
                        inputId={field.key}
                    />
                </div>
            ) }
        </>
    )
}

export default QuestionBoxFooter