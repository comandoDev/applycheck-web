'use client'

import { useAuth } from "@/hooks/useAuth"
import Input from "./Input"
import { FormEvent, useState } from "react"

const PasswordForm = ({ userId }: { userId: string }) => {
    const authContext = useAuth()

    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await authContext?.handleUserSetPassword({
            userId,
            password,
            passwordConfirmation
        })
    }

    return (
        <form className="w-[70%] flex flex-col" onSubmit={handleFormSubmit}>
            <div className="">
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-zinc-600 mb-2">Senha</label>
                    <Input 
                        placeHolder="Insira sua senha"
                        name="password"
                        type="text"
                        onChange={setPassword}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passwordConfirmation" className="text-zinc-600 mb-2">Confirmar Senha</label>
                    <Input 
                        placeHolder="Confirme sua senha"
                        name="passwordConfirmation"
                        type="text"
                        onChange={setPasswordConfirmation}
                    />
                </div>
            </div>
            <Input 
                isSubmit={true}
                value='Confirmar'
            />
        </form>
    )
}

export default PasswordForm