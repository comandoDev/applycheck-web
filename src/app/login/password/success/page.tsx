'use client'

import { CheckCircle } from "@phosphor-icons/react"

const PasswordSuccess = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <CheckCircle className="text-white animate-bounce" size={278} />
            <h1 className="text-2xl text-white">Senha registrada com sucesso, vá até o APP para efetuar login e preencher os checklists</h1>
        </div>
    )
}

export default PasswordSuccess