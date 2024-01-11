'use client'

import { useEffect } from "react"
import { useForm } from "../../../hooks/useForm"
import { useRouter, useSearchParams } from "next/navigation"
import { Image, message } from "antd"
import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { FileArrowDown } from "@phosphor-icons/react"

const Init = () => {
    const router = useRouter() 

    const searchParams = useSearchParams()
    const formContext = useForm() 
    
    useEffect(() => {
        if (formContext?.lastReachedStep) return router.push('/auth/forms/fill')

        const formId = searchParams.get('formId')

        if (!formId) return router.push('/auth/forms')

        formContext?.findFormById(formId)
    }, [])

    const onClick = async () => {   
        try {
            const response = await EmployeeRepository.createRecord(formContext?.form!.id!)
            
            formContext?.setRecord(response.data.data?.record!)

            router.push('/auth/forms/fill')
        } catch (error) {
            message.error(error?.message as string)
            router.push('/auth/forms')
        }
    }

    return (
        <div>
            <div className="border-b border-gray-400 pb-3">
                <h1 className="text-selected font-bold">{formContext?.form?.title}</h1>
                <h2>{formContext?.form?.description}</h2>
            </div>
            <ul className="mb-5 mt-5 list-disc pl-3">
                { formContext?.form?.steps.map(step => {
                    return <li key={step.order} className="text-selected text-xs font-medium mt-1">{step.title}</li>
                }) }
            </ul>
            { formContext?.form?.procedureFile && (
                <a href={`${formContext?.form?.procedureFile}`} className="flex justify-between items-center text-xs text-selected font-bold p-3 bg-zinc-200 border border-zinc-400 rounded-3xl">
                    <span className="">Visualizar Arquivo de Procedimento</span>
                    <FileArrowDown size={24} />
                </a>
            ) } 
            <div className="fixed left-0 bottom-5 w-full flex justify-center pl-5 pr-5">
                <div onClick={onClick} className="p-3 bg-principal text-white font-bold text-center rounded-lg w-full">INICIAR</div>
            </div>
        </div>
    )
}

export default Init