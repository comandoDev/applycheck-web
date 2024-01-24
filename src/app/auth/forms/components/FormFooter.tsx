import EmployeeRepository from "@/Repositories/EmployeeRepository"
import { useForm } from "../hooks/FormContext/useForm"
import { useRouter } from "next/navigation"
import { message } from "antd"

const FormFooter = () => {
    const router = useRouter()

    const formContext = useForm()

    const onClickNext = async () => {
        try {
            const isFinished = await formContext?.isRecordFinished()
            if (isFinished) return router.push('/auth/forms')

            await formContext?.findRecordAndSetFilledFields((formContext!.lastReachedStep + 2))

            await EmployeeRepository.updateRecordStep(
                formContext?.record?.id!,
                formContext?.currentStep!
            )
    
            formContext?.setLastReachedStep(formContext.lastReachedStep + 1)

            // return router.push('/auth/forms/fill')
        } catch (error) {
            message.error((error as any).message)
            return router.push('/auth/forms/fill')
        }
    }

    const onClickPrevious = async () => {
        try {
            if (!formContext?.lastReachedStep) return router.push('/auth/forms')

            await formContext?.findRecordAndSetFilledFields(formContext.lastReachedStep)

            formContext?.setLastReachedStep(formContext.lastReachedStep - 1)

            // return router.push('/auth/forms/fill')
        } catch (e) {
            
        }
    }

    return (
        <div className="w-full bg-principal relative bottom-0 p-5 flex justify-between text-white font-medium">
            <div onClick={() => onClickPrevious()}>ANTERIOR</div>
            <div>{formContext?.lastReachedStep! + 1} de {formContext?.form?.totalSteps}</div>
            <div onClick={() => onClickNext()}>PRÓXIMO</div>
        </div>
    )
}

export default FormFooter