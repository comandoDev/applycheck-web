'use client'

import { useAuth } from "@/hooks/useAuth"
import Input from "./Input"
import { FormEvent, useState } from "react"

const SetPasswordForm = ({ accountName }: { accountName:string }) => {
  const authContext = useAuth()

  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      authContext?.setError(undefined)

      await authContext?.setPassword({
        accountName,
        password,
        passwordConfirmation
      })            

      await authContext?.handleEmployeeSignin({
        accountName,
        password
      })
  } 

  return (
    <form onSubmit={onSubmit}>
      <Input 
          placeHolder="Insira sua senha"
          name="password"
          type="text"
          onChange={setPassword}
      />
      <Input 
          placeHolder="Confirme sua senha"
          name="passwordConfirmation"
          type="text"
          onChange={setPasswordConfirmation}
      />

      <Input 
          isSubmit={true}
          value='Entrar'
      />
    </form>
  )
}

export default SetPasswordForm