'use client'

import { useAuth } from "@/hooks/useAuth"
import Input from "./Input"
import { FormEvent, useState } from "react"
import Link from "next/link"

const ManagerForm = () => {
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
        <form className="w-[70%] flex flex-col" onSubmit={onSubmit}>
            <div className="">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-zinc-600 mb-2">Email</label>
                    <Input 
                        placeHolder="Insira seu email"
                        name="email"
                        type="email"
                        onChange={setEmail}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-zinc-600 mb-2">Password</label>
                    <Input 
                        placeHolder="Insira sua senha"
                        name="password"
                        onChange={setPassword}
                    />
                </div>
            </div>
            <div className="flex justify-between mb-10">
                <div className="flex">
                    <input type="checkbox" className="cursor-pointer"/>
                    <span className="text-zinc-500 text-xs ml-1">Mantenha-me conectado</span>
                </div>
                <Link href='' className="text-principal text-xs">Esqueceu a senha ?</Link>
            </div>
            <Input 
                isSubmit={true}
                value='Entrar'
            />
        </form>
    )
}

export default ManagerForm