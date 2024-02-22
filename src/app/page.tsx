'use client'

import SignatureCanvas from "./auth/forms/components/QuestionBox/SignatureCanvas"

export default () => {
    return (
        <div className="w-screen h-screen flex justify-center">
            <>
                <div className="fixed bottom-10 m-auto bg-red-500 hover:bg-red-600 p-3 pl-12 pr-12 text-white rounded-xl">ASSINAR</div>
                <SignatureCanvas />
            </>
        </div>
    )
}