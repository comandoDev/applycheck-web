'use client'

import { useForm } from "../../hooks/FormContext/useForm"
import { useEffect, useState } from "react"
import { IFormStep } from "@/interfaces/Form"
import QuestionBox from "../../components/QuestionBox"
import FormFooter from "../../components/Form/FormFooter"
import { useRouter } from "next/navigation"
import ProgressBar from "../../components/ProgressBar"
import { Button, message } from "antd"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { DeleteOutlined } from "@ant-design/icons"

const fill = () => {
    const formContext = useForm()

    const router = useRouter()

    const [step, setStep] = useState<IFormStep>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        if (!formContext?.form) return router.push('/auth/forms')

        setStep(formContext?.form?.steps[formContext.lastReachedStep])

        formContext?.setCurrentStep({
            fields: [],
            order: formContext?.form?.steps[formContext.lastReachedStep]?.order!,
            title: formContext?.form?.steps[formContext.lastReachedStep]?.title!
        })
    }, [formContext?.lastReachedStep])

    const handleDeleteOnClick = async () => {
        try {
            setLoading(true)

            const response = await ManagerRepository.deleteRecord(formContext?.record?.id!)
    
            router.push('/auth/forms')
            message.success(response.data.message)

            formContext?.setForm(undefined as any)
            formContext?.setRecord(undefined as any)
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ProgressBar percentage={(formContext!.lastReachedStep/formContext?.form?.totalSteps!) * 100} />
            <div className="flex justify-between items-center p-5">
                <div className="w-full">
                    <Button type="primary" className="bg-principal" onClick={() => router.push('/auth/forms')}>VOLTAR AO MENU</Button>
                </div>
                <div>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                        icon={<DeleteOutlined />}
                        loading={loading}
                        onClick={handleDeleteOnClick}
                        >
                        APAGAR
                    </Button>
                </div>
            </div>
            <div className="p-5 mb-16">
                <h1 className="font-bold text-xl mb-3">{step?.title}</h1>
                { step?.fields.map((field) =>(<QuestionBox field={field} key={field.key}/>) ) }
            </div>
            <FormFooter />
        </>
    )
}

export default fill
