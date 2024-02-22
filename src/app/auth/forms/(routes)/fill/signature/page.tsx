'use client'

import { useRouter } from "next/navigation"
import SignatureCanvas from "../../../components/QuestionBox/SignatureCanvas"
import { useSignature } from "../../../hooks/signatureContext/useSignature"
import { Button, message } from "antd"
import { useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"

const signature = () => {
    const signatureContext = useSignature()

    const router = useRouter()

    const [finishLoading, setFinishLoading] = useState<boolean>(false)
    const [clearLoading, setClearLoading] = useState<boolean>(false)

    const handleFinishOnClick = async () => {
        try {
            setFinishLoading(true)

            const signatureImage = signatureContext?.currentCanvas!.toDataURL('image/png')
    
            signatureContext?.setSignature(signatureImage!)
        
            const response = await ManagerRepository.uploadSignature(signatureImage!)

            signatureContext?.setSignature(response.data.data!.signature)

            router.push('/auth/forms/fill')
        } catch (error) {
            message.error((error as any).message)
        } finally {
            setFinishLoading(false)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="w-screen h-screen flex justify-center">
                <div className="flex justify-between p-3 absolute top-0 w-full">
                    <Button
                        size="large"
                        className=""
                        type="dashed"
                        loading={finishLoading}
                        onClick={() => router.push('/auth/forms/fill')}
                        >
                        VOLTAR
                    </Button>
                    <Button
                        size="large"
                        className=""
                        type="default"
                        loading={clearLoading}
                        onClick={() => signatureContext?.setClearCanvas(true)}
                        style={{
                            borderColor: '#287AF8',
                            color: '#287AF8'
                        }}
                        >
                        LIMPAR
                    </Button>
                    <Button
                        size="large"
                        className=""
                        danger={true}
                        loading={finishLoading}
                        onClick={handleFinishOnClick}
                        >
                        FINALIZAR
                    </Button>
                </div>
                <SignatureCanvas />
            </div>
        </div>
    )
}

export default signature