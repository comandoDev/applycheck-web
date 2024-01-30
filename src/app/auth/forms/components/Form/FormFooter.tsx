'use client'

import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { useForm } from "../../hooks/FormContext/useForm"
import { useRouter } from "next/navigation"
import { message } from "antd"
import { useState } from "react"
import { ClipLoader } from "react-spinners"

const FormFooter = () => {
    const router = useRouter()

    const formContext = useForm()

    const [nextloading, setNextLoading] = useState<boolean>()
    const [previousLoading, setpreviousLoading] = useState<boolean>()

    const onClickNext = async () => {
        try {
            setNextLoading(true)

            const isFinished = await formContext?.isRecordFinished()
            if (isFinished) return router.push('/auth/forms')

            await formContext?.findRecordAndSetFilledFields((formContext!.lastReachedStep + 2))

            console.log({ currentStep: formContext?.currentStep })
            console.log({ fields: formContext?.currentStep?.fields })

            await EmployeeRepository.updateRecordStep(
                formContext?.record?.id!,
                formContext?.currentStep!
            )
    
            formContext?.setLastReachedStep(formContext.lastReachedStep + 1)

            // return router.push('/auth/forms/fill')
        } catch (error) {
            message.error((error as any).message)
            return router.push('/auth/forms/fill')
        } finally {
            setNextLoading(false)
        }
    }

    const onClickPrevious = async () => {
        try {
            setpreviousLoading(true)

            if (!formContext?.lastReachedStep) return router.push('/auth/forms')

            await formContext?.findRecordAndSetFilledFields(formContext.lastReachedStep)

            formContext?.setLastReachedStep(formContext.lastReachedStep - 1)

            // return router.push('/auth/forms/fill')
        } catch (e) {
            
        } finally {
            setpreviousLoading(false)
        }
    }

    return (
        <div className="w-full bg-principal relative bottom-0 p-5 flex justify-between text-white font-medium">
            <div onClick={() => onClickPrevious()}>{ previousLoading ? (
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
            <div onClick={() => onClickNext()}>{ nextloading ? (
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