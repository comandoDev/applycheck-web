import Input from "./Input"
import { useAuth } from "@/hooks/useAuth"
import { FormEvent, useEffect, useState } from "react"

const SetManagerPasswordForm = ({ email }: { email: string }) => {
    const authContext = useAuth()

    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        authContext?.setError(undefined)
  
        await authContext?.setPassword({
          email,
          password,
          passwordConfirmation
        })            
  
        await authContext?.handleManagerSignin({
          email,
          password
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
                            type="password"
                            onChange={setPassword}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="passwordConfirmation" className="text-zinc-600 mb-2">Confirme sua senha</label>
                        <Input 
                            placeHolder="Confime sua senha"
                            name="passwordConfirmation"
                            type="password"
                            onChange={setPasswordConfirmation}
                        />
                    </div>
                </div>
                <Input 
                    isSubmit={true}
                    value='Cadastrar Senha'
                />
            </form>
    )
}

export default SetManagerPasswordForm