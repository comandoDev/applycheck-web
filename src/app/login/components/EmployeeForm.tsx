'use client'

import { useAuth } from "@/hooks/useAuth"
import Input from "./Input"
import { FormEvent, useState } from "react"

const EmployeeForm = () => {
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