'use client'

import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { useRouter, useSearchParams } from "next/navigation"
import Storage from "@/utils/Storage"
import { message } from "antd"
import EmployeeRepository from "@/Repositories/EmployeeRepository"

const Init = () => {
    const router = useRouter() 

    const searchParams = useSearchParams()
    const formContext = useForm() 
    
    useEffect(() => {
        const formId = searchParams.get('formId')

        if (!formId) return router.push('/auth/employee')

        formContext?.findFormById(formId)

        if (Storage.getLastReachedStep()) router.push('/auth/forms/fill')
    }, [])

    const onClick = async () => {   
        try {
            await EmployeeRepository.createRecord(Storage.getForm()!.id!)

            router.push('/auth/forms/fill')
        } catch (error) {
            message.error(error as string)
            router.push('/auth/employee')
        }
    }

    return (
        <>
            <h1>{formContext?.form?.title}</h1>
            <h2>{formContext?.form?.type}</h2>
            <div onClick={onClick} className="p-3 bg-principal text-white font-bold text-center rounded-lg">INICIAR</div>
        </>
    )
}

export default Init