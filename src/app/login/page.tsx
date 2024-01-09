'use client'

import { FormEvent, useState } from "react"
import Input from "./components/Input"
import UserRepository from "@/Repositories/UserRepository"
import { useAuth } from "@/hooks/useAuth"
import { redirect, useRouter } from "next/navigation"

const SignIn = () => {
    const router = useRouter()

    const authContext = useAuth()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showEmailError, setShowEmailError] = useState<boolean>(false)
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false)

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await authContext?.handleUserSignin(email, password)

        if (!authContext?.error) return router.push('/employee/auth')
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
                        setShowError={setShowEmailError}
                        showError={showEmailError}
                    />
                    <Input 
                        placeHolder="Insira sua senha"
                        name="password"
                        onChange={setPassword}
                        setShowError={setShowPasswordError}
                        showError={showPasswordError}
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