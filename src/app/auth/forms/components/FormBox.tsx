'use client'

import { FormType } from "@/interfaces/Form"
import { ArrowCircleRight } from "@phosphor-icons/react"
import Link from "next/link"
import { useForm } from "../hooks/useForm"
import { useEffect, useState } from "react"

interface IFromBoxProps {
    id: string
    title: string
    type: FormType
    description?: string
    inProgressId?: string
}

const FormBox = ({
    id,
    title,
    type,
    description,
    inProgressId
}: IFromBoxProps) => {
    const formContext = useForm()

    const [percentage, setPercentage] = useState<number>(50)

    useEffect(() => {
        if (formContext?.lastReachedStep) setPercentage(Math.ceil(((formContext?.lastReachedStep! / formContext?.form!.totalSteps! * 100)) / 10) * 10 )
    })

    const formBox = (
        <div className={`w-full p-4 rounded-lg border border-gray-150 ${inProgressId && inProgressId !== id ? 'bg-zinc-100 animate-pulse' : 'bg-white'} text-selected mb-5 shadow-md`} key={id}>
                <div className="w-full flex justify-between mb-3 items-start">
                    <div className="flex flex-col">
                        <span className="font-bold">{title}</span>
                        <span className="font-medium">{type}</span>
                    </div>
                    <div>
                        <ArrowCircleRight size={32} weight="fill" fill={`${(!inProgressId || inProgressId === id) ? '#287AF8' : '#979797'}`} />
                    </div>
                </div>
                <div className="w-full mb-5 max">{description && (description.slice(0, 50) + '...')}</div>
                { (inProgressId && inProgressId === id) && (
                    <div className="flex flex-col text-xs text-progress font-bold">
                    <span className="ml-1 mb-1">{formContext?.lastReachedStep} de {formContext?.form?.totalSteps}</span>
                    <div className="w-full h-3 bg-gray-300 rounded-lg">
                        <div className={`w-[${percentage}%] h-3 bg-progress rounded-lg`}></div>                
                    </div>
                </div>
                ) }
            </div>
    )

    return (!inProgressId || inProgressId === id) ? (
        <Link href={`/auth/forms/init?formId=${id}`} key={id}>
            {formBox}
        </Link>
    ) : formBox
}

export default FormBox