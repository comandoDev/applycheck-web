import Link from "next/link"
import { useForm } from "../hooks/useForm"
import { useRouter } from "next/navigation"
import Storage from "@/utils/Storage"
import EmployeeRepository from "@/Repositories/EmployeeRepository"

const Footer = () => {
    const formContext = useForm()

    const onClickNext = async () => {
        const response = await EmployeeRepository.updateRecordStep(
            Storage.getForm()?.id,
            Storage.getCurrentStep()
        )

        console.log({ response })

        // formContext?.setLastReachedStep(formContext.lastReachedStep + 1)

        Storage.setLastReachedStep((Storage.getLastReachedStep() + 1))

        // return router.push('/auth/forms/filla')
    }

    const onClickPrevious = async () => {
        if (Storage.getLastReachedStep()! <= 0) return

        // formContext?.setLastReachedStep(formContext.lastReachedStep - 1)

        Storage.setLastReachedStep((Storage.getLastReachedStep() - 1))

        // return router.push('/auth/forms/fill')
    }


    return (
        <div className="w-full bg-principal relative bottom-0 p-5 flex justify-between text-white font-medium">
            <a href="/auth/forms/fill" onClick={() => onClickPrevious}>ANTERIOR</a>
            <div>2 de 10</div>
            <div onClick={() => onClickNext}>PRÓXIMO</div>
        </div>
    )
}

export default Footer