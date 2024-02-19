'use client'

import { useAuth } from "@/hooks/useAuth"
import Input from "./Input"
import { FormEvent, useState } from "react"

const EmployeeForm = () => {
  const authContext = useAuth()

  const [accountName, setAccountName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      authContext?.setError(undefined)

      await authContext?.handleEmployeeSignin({
          accountName,
          password
      })            
  } 

  return (
    <form onSubmit={onSubmit}>
      <Input 
          placeHolder="Insira seu nome de usuário"
          name="accountName"
          type="text"
          onChange={setAccountName}
      />
      <Input 
          placeHolder="Insira sua senha"
          name="password"
          type="password"
          onChange={setPassword}
      />

      <Input 
          isSubmit={true}
          value='Entrar'
      />
    </form>
  )
}

export default EmployeeForm