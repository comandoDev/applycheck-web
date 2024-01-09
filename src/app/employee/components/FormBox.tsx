'use client'

import { FormType } from "@/interfaces/Form"
import { ArrowCircleRight } from "@phosphor-icons/react"

interface IFromBoxProps {
    title: string
    type: FormType
    description?: string
}

const FormBox = ({
    title,
    type,
    description
}: IFromBoxProps) => {
    return (
        <div className="w-full p-4 rounded-lg border border-gray-150 bg-white text-selected mb-5 shadow-md">
            <div className="w-full flex justify-between mb-3 items-start">
                <div className="flex flex-col">
                    <span className="font-bold">{title}</span>
                    <span className="font-medium">{type}</span>
                </div>
                <div>
                    <ArrowCircleRight size={32} weight="fill" fill="#287AF8"/>
                </div>
            </div>
            <div className="w-full mb-5 max">{description}</div>
            {/* <div className="flex flex-col text-xs text-progress font-bold">
                <span className="ml-1 mb-1">5 de 12</span>
                <div className="w-full h-3 bg-gray-300 rounded-lg">
                    <div className={`w-[80%] h-3 bg-progress rounded-lg`}></div>                
                </div>
            </div> */}
        </div>
    )
}

export default FormBox