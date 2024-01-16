'use client'

import { useForm } from "../../hooks/useForm"
import { useEffect, useState } from "react"
import { IFormStep } from "@/interfaces/Form"
import QuestionBox from "../../components/QuestionBox"
import FormFooter from "../../components/FormFooter"
import { useRouter } from "next/navigation"
import ProgressBar from "../../components/ProgressBar"

const fill = () => {
    const formContext = useForm()

    const router = useRouter()

    const [step, setStep] = useState<IFormStep>()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        if (!formContext?.form) return router.push('/auth/forms')

        setStep(formContext?.form?.steps[formContext.lastReachedStep])

        formContext?.setCurrentStep({
            fields: [],
            order: formContext?.form?.steps[formContext.lastReachedStep]!.order!,
            title: formContext?.form?.steps[formContext.lastReachedStep]!.title!
        })
    }, [formContext?.lastReachedStep])

    return (
        <>
            <ProgressBar percentage={(formContext!.lastReachedStep/formContext?.form?.totalSteps!) * 100} />
            <div className="p-5">
                <h1 className="font-bold text-xl mb-5">{step?.title}</h1>
                { step?.fields.map(field =>(<QuestionBox field={field} key={field.key}/>) ) }
            </div>
            <FormFooter />
        </>
    )
}

export default fill