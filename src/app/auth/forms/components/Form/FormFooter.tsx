'use client'

import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { useForm } from "../../hooks/FormContext/useForm"
import { useRouter } from "next/navigation"
import { message } from "antd"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { useFile } from "../../hooks/FileContext/useFile"
import { useActionPlan } from "../../hooks/ActionPlanContext/useFile"
import { useSignature } from "../../hooks/signatureContext/useSignature"

const FormFooter = () => {
    const fileContext = useFile()
    const actionPlanContext = useActionPlan()
    const signatureContext = useSignature() 

    const router = useRouter()

    const formContext = useForm()

    const [nextloading, setNextLoading] = useState<boolean>()
    const [previousLoading, setpreviousLoading] = useState<boolean>()

    const nextOnClick = async () => {
        try {
            setNextLoading(true)

            const isFinished = await formContext?.isRecordFinished()
            if (isFinished) {
                fileContext?.setFiles([])
                actionPlanContext?.setActionPlan({})
                signatureContext?.setSignature(undefined)
                
                return router.push('/auth/forms')
            }

            await formContext?.findRecordAndSetFilledFields((formContext!.lastReachedStep + 2))

            await EmployeeRepository.updateRecordStep(
                formContext?.record?.id!,
                formContext?.currentStep!
            )
    
            formContext?.setLastReachedStep(formContext.lastReachedStep + 1)
        } catch (error) {
            message.error((error as any).message)
            return router.push('/auth/forms/fill')
        } finally {
            setNextLoading(false)
        }
    }

    const previousOnClick = async () => {
        try {
            setpreviousLoading(true)

            if (!formContext?.lastReachedStep) return router.push('/auth/forms')

            await formContext?.findRecordAndSetFilledFields(formContext.lastReachedStep)

            formContext?.setLastReachedStep(formContext.lastReachedStep - 1)
        } catch (error) {
            message.error((error as any).message)
            return router.push('/auth/forms/fill')
        } finally {
            setpreviousLoading(false)
        }
    }

    return (
        <div className="w-full bg-principal relative bottom-0 p-5 flex justify-between text-white font-medium">
            <div onClick={() => previousOnClick()}>{ previousLoading ? (
                <div className="w-[76px]">
                <ClipLoader
                    color={'white'}
                    loading={previousLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            ) : (<>ANTERIOR</>) }</div>
            <div>{formContext?.lastReachedStep! + 1} de {formContext?.form?.totalSteps}</div>
            <div onClick={() => nextOnClick()}>{ nextloading ? (
                <div className="w-[76px]">
                    <ClipLoader
                        color={'white'}
                        loading={nextloading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (<>PRÓXIMO</>) }</div>
        </div>
    )
}

export default FormFooter