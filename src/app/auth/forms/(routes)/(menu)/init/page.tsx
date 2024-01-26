'use client'

import { useEffect, useState } from "react"
import { useForm } from "../../../hooks/FormContext/useForm"
import { useRouter, useSearchParams } from "next/navigation"
import { Steps, message } from "antd"
import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { FileArrowDown } from "@phosphor-icons/react"
import InitLoading from "../components/InitLoading"
import { ClipLoader } from "react-spinners"

const Init = () => {
    const router = useRouter() 

    const searchParams = useSearchParams()
    const formContext = useForm() 

    const [isStarted, setIsStarted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setLoading(true)
        // if (formContext?.lastReachedStep! >= 0 && formContext?.record) return router.push('/auth/forms/fill')
        if (formContext?.lastReachedStep! >= 0 && formContext?.record?.steps?.length) setIsStarted(true)

        const formId = searchParams.get('formId')
        if (!formId) return router.push('/auth/forms')

        const fetch = async () => {
            try {
                await formContext?.findFormById(formId)
            } catch (error) {
                router.push('/auth/forms')
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    const onClick = async () => {   
        setButtonLoading(true) 

        try {
            if (isStarted) return router.push('/auth/forms/fill')

            const response = await EmployeeRepository.createRecord(formContext?.form!.id!)

            formContext?.setRecord(response.data.data?.record!)

            router.push('/auth/forms/fill')
        } catch (error) {
            message.error((error as any)?.message)
        } finally {
            setButtonLoading(false)
        }
    }

    return !loading ? (
        <>
            <div>
                <div className="border-b border-gray-400 pb-3">
                    <h1 className="text-zinc-500 font-bold mb-2">{formContext?.form?.title}</h1>
                    <h2 className="text-zinc-400">{formContext?.form?.description}</h2>
                </div>
                <Steps
                    className="mb-5 mt-5"
                    direction="vertical"
                    size="small"
                    current={1}
                    items={formContext?.form?.steps.map(step => {
                        return {
                            title: step.title,
                            status: formContext.record?.steps![(step.order - 1)] ? 'finish' : 'wait'
                        }
                    })}
                />
                { formContext?.form?.procedureFile && (
                    <a href={`${formContext?.form?.procedureFile}`} className="flex justify-between items-center text-xs text-selected font-bold p-3 bg-zinc-200 border border-zinc-400 rounded-3xl">
                        <span className="">Visualizar Arquivo de Procedimento</span>
                        <FileArrowDown size={24} />
                    </a>
                ) } 
                <div className="fixed left-0 bottom-5 w-full flex justify-center pl-5 pr-5">
                    <div onClick={onClick} className="p-3 bg-principal text-white font-bold text-center rounded-lg w-full">
                        { !buttonLoading ? (
                            <>
                                { isStarted ? 'CONTINUAR' : 'INICIAR' }
                            </>
                        ) : (
                            <ClipLoader
                                color={'white'}
                                loading={buttonLoading}
                                size={18}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    ) : (
        <InitLoading isStarted={isStarted} />
    )
}

export default Init