'use client'

import { useRouter } from "next/navigation"
import { useSignature } from "../../../hooks/signatureContext/useSignature"
import { Button, message } from "antd"
import { useRef, useState } from "react"
import ManagerRepository from "@/Repositories/ManagerRepository"
import { ReactSketchCanvas } from "react-sketch-canvas"

const signature = () => {
    const signatureContext = useSignature()

    const router = useRouter()

    const [finishLoading, setFinishLoading] = useState<boolean>(false)

    const canvasRef = useRef()

    const getImage = async (): Promise<string> => {
        if (!canvasRef.current) {
            message.error('Assinatura inválida!')
            throw new Error()
        }

        return await (canvasRef.current as any)
            .exportImage("png")
    }

        const handleClear = () => {
        if (canvasRef.current ) {
        (canvasRef.current as any)
            .clearCanvas()
        }
    }

    const handleFinishOnClick = async () => {
        try {
            setFinishLoading(true)

            const signatureImage = await getImage()
    
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
                    onClick={() => router.push('/auth/forms/fill')}
                    >
                    VOLTAR
                </Button>
                <Button
                    size="large"
                    className=""
                    type="default"
                    onClick={handleClear}
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
            <ReactSketchCanvas
                ref={canvasRef as any} 
                strokeWidth={5} 
                strokeColor="black"
                className="w-full h-full"
            />
        </div>
    </div>
    )
}

export default signature