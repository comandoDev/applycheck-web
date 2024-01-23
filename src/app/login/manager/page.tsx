'use client'

import Image from "next/image"
import ManagerForm from "../components/ManagerForm"

const ManagerSignIn = () => {
    return (
        <div className="w-screen h-screen flex">
            <div className="w-[50%] p-20 flex justify-center flex-col">
                <div className="flex items-center">
                    <Image 
                        src="https://denunc.s3.sa-east-1.amazonaws.com/39b16646-330a-4c1f-8a0c-adc30346c791-Group 481767.png"
                        alt=""
                        width={60}
                        height={60}
                        quality={100}
                    />
                    <h1 className="text-principal text-7xl font-bold ml-3">AuditLis</h1>
                </div>
                <span className="text-zinc-500 mt-5 mb-5">Crie checklists adaptados às suas preferências e necessidades.</span>
                <ManagerForm />
            </div>
            <div className="w-[50%] bg-login bg-center bg-cover bg-no-repeat"></div>
        </div>
    )
}

export default ManagerSignIn