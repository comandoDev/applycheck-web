import { useEffect, useState } from "react"
import QuestionBoxFooter from "./QuestionBoxFooter"
import { IField, InputType } from "@/interfaces/Form"
import { useForm } from "../../hooks/FormContext/useForm"
import FormInput from "@/app/auth/forms/components/QuestionBox/Input"
import { Image } from "antd"
import { useSignature } from "../../hooks/signatureContext/useSignature"
import Link from "next/link"
import { useRouter } from "next/navigation"

const QuestionBox = ({ field, fatherField }: { field: IField, fatherField?: IField }) => {
    const formContext = useForm()
    const signatureContext = useSignature()
    const router = useRouter()
    
    const [value, setValue] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<string>()
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [textArrayValues, setTextArrayValues] = useState<string[]>([''])
    const [existssignature, setExistssignature] = useState<boolean>(false)
    
    useEffect(() => {   
        const signature = signatureContext?.signature

        if (signature) {
            setValues(signature)
            setExistssignature(true)
        }
        
        const filledField = formContext?.filledFields?.find(filledField => filledField.key === field.key)

        if (filledField?.type === InputType.signature) {
            if (!signature) setValues(filledField?.value!, filledField?.nonCompliance!)
            
            setExistssignature(true)
        }
        
        if (filledField?.type !== InputType.signature && !signature) {
            setValues(filledField?.value!, filledField?.nonCompliance!)
        }
    }, [formContext?.filledFields, signatureContext?.signature])

    const handleOnChange = (targetValue: string, nonCompliance?: boolean): void => {
        setValues(targetValue, nonCompliance)
    }

    const handleCheckboxChange = (option: string, nonCompliance?: boolean) => {
        const currentIndex = selectedOptions.indexOf(option)
        const newSelectedOptions = [...selectedOptions]

        if (currentIndex === -1) {
            newSelectedOptions.push(option);
        } else {
            newSelectedOptions.splice(currentIndex, 1)
        }

        setSelectedOptions(newSelectedOptions);
        setValues(newSelectedOptions.join(', '), nonCompliance)
    }

    const handleTextArrayChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newTextArrayValues = [...textArrayValues]
        if(index < 0 || index >= newTextArrayValues.length) return
        newTextArrayValues[index] = e.target.value
        setTextArrayValues(newTextArrayValues)
        setValues(newTextArrayValues.join(', '))
    }    

    const addTextArrayField = () => {
        setTextArrayValues([...textArrayValues, ''])
    }

    const removeTextArrayField = (index: number) => {
        const newTextArrayValues = textArrayValues.filter((_, i) => i !== index)
        setTextArrayValues(newTextArrayValues)
        setValues(newTextArrayValues.join(', '))
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
                stepField.type = field.type
                exists = true
            }
        })

        if (!exists) {
            currentStep?.fields.push({
                key: field.key,
                nonCompliance,
                value: value,
                type: field.type
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
                        {field.type === InputType.checkbox && (
                            <>
                                {field.options?.map(option => {
                                    return (
                                        <div 
                                            key={option.key}
                                            className={`w-full ${selectedOptions.includes(option.key) ? 'bg-principal text-white' : 'border border-gray-200 text-gray-500 bg-zinc-50'} font-bold rounded-lg p-3 pl-8 mt-3`}
                                            onClick={() => handleCheckboxChange(option.key, option.nonCompliance)}
                                        >
                                            {option.key}
                                        </div>
                                    )
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
                        {field.type === InputType.time && (
                            <FormInput 
                                onChange={handleOnChange}
                                placeholder="Selecione um horário"
                                type={InputType.time}
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
                        {field.type === InputType.textArray && (
                            <>
                                {textArrayValues.map((textValue, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <FormInput
                                            onChangeArray={(e) => handleTextArrayChange(index, e)}
                                            placeholder="Digite um valor"
                                            type={InputType.number}
                                            value={textValue}
                                        />
                                        {index > 0 && (
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="25"
                                                height="25" 
                                                fill="#ff0000"
                                                viewBox="0 0 60 60" 
                                                stroke="#ff0000"
                                                className="ml-2 mt-3 cursor-pointer"
                                                onClick={() => removeTextArrayField(index)}
                                            >
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M27.851,0C12.495,0,0,12.495,0,27.852s12.495,27.851,27.851,27.851c15.357,0,27.852-12.494,27.852-27.851 S43.209,0,27.851,0z M27.851,51.213c-12.882,0-23.362-10.48-23.362-23.362c0-12.882,10.481-23.362,23.362-23.362 c12.883,0,23.364,10.48,23.364,23.362C51.215,40.733,40.734,51.213,27.851,51.213z"></path> 
                                                <path d="M38.325,25.607H17.379c-1.239,0-2.244,1.005-2.244,2.244c0,1.239,1.005,2.245,2.244,2.245h20.946 c1.239,0,2.244-1.006,2.244-2.245C40.569,26.612,39.564,25.607,38.325,25.607z"></path> </g> </g> </g>
                                            </svg>
                                        )}
                                    </div>
                                ))}
                                <div className="flex items-center mt-2">
                                    <button
                                        type="button"
                                        onClick={addTextArrayField}
                                        className="flex items-center text-blue-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="28"
                                            fill="currentColor"
                                            viewBox="0 0 260 260"
                                            className="mr-1"
                                        >
                                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,168,128Z"></path>
                                        </svg>
                                        Adicionar Nota
                                    </button>
                                </div>
                            </>
                        )}
                        {field.type === InputType.signature && (
                            <div className="w-full">
                                { !existssignature ? (
                                    <div 
                                        onClick={() => router.push('/auth/forms/fill/signature')}
                                        className="w-full text-center bg-principal rounded-xl p-2 text-white font-bold"
                                    >ASSINAR</div>
                                ) : (
                                    <Image className="w-full" height={200} src={value || signatureContext?.signature} /> 
                                )}
                            </div>
                        )}
                    </div>
                </div>
            { field.type !== InputType.multipleQuestions &&  <QuestionBoxFooter field={field} />  }             
            </div>
        </>
    )
}

export default QuestionBox