'use client'

import { FormEvent, useState } from "react"
import Input from "./components/Input"
import { useAuth } from "@/hooks/useAuth"

const SignIn = () => {
    const authContext = useAuth()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        authContext?.setError(undefined)

        await authContext?.handleUserSignin({
            email,
            password
        })            
    }

    return (
        <div className="h-screen w-full p-10 flex justify-center items-center">
            <div>
                <div className="text-principal font-bold text-5xl w-full mb-8 flex justify-center items-center">
                    <div className="mr-1">
                        <img src="https://denunc.s3.sa-east-1.amazonaws.com/8c62d577-f36f-4a5d-883d-2a56cb5262ea-Prancheta 1@4x 1.png" />
                    </div>
                    <span>AuditLis</span>
                </div>
                <form onSubmit={onSubmit}>
                    <Input 
                        placeHolder="Insira seu email"
                        name="email"
                        type="email"
                        onChange={setEmail}
                    />
                    <Input 
                        placeHolder="Insira sua senha"
                        name="password"
                        onChange={setPassword}
                    />

                    <Input 
                        isSubmit={true}
                        value='Entrar'
                    />
                </form>
            </div>
        </div>
    )
}

export default SignIn