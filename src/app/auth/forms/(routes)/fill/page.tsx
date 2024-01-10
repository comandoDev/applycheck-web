'use client'

import { useForm } from "../../hooks/useForm"
import { useEffect, useState } from "react"
import { IForm, IFormStep } from "@/interfaces/Form"
import QuestionBox from "../../components/QuestionBox"
import Link from "next/link"
import Footer from "../../components/Footer"
import { FormContext } from "antd/es/form/context"
import Storage from "@/utils/Storage"

const fill = () => {
    const formContext = useForm()

    const [step, setStep] = useState<IFormStep>()

    useEffect(() => {
        // console.log({ lastReachedStep: FormContext.lastReachedStep })

        // setStep(formContext?.form?.steps[formContext.lastReachedStep])
        setStep(Storage.getForm()?.steps[(Storage.getLastReachedStep() + - 1) || 0])

        // formContext?.setCurrentStep({
        //     fields: [],
        //     order: formContext?.form?.steps[formContext.lastReachedStep]!.order!,
        //     title: formContext?.form?.steps[formContext.lastReachedStep]!.title!
        // })

        Storage.setCurrentStep({
            fields: [],
            order: Storage.getForm()?.steps[(Storage.getLastReachedStep() + - 1) || 0]!.order!,
            title: Storage.getForm()?.steps[(Storage.getLastReachedStep() + - 1) || 0]!.title!
        })
    }, [])

    return (
        <>
            <div className="p-5">
                <h1 className="font-bold text-xl mb-5">{step?.title}</h1>
                { step?.fields.map(field =>(<QuestionBox field={field}/>) ) }
                {/* <Pagination defaultCurrent={1} total={formContext?.form?.totalSteps} pageSize={1}  /> */}
                {/* <Link href='' className="p-3 bg-principal text-white font-bold text-center rounded-lg" onClick={() => {
                    console.log({ currentStep: formContext?.currentStep })
                }}>PRÓXIMO</Link> */}
            </div>
            <Footer />
        </>
    )
}

export default fill
