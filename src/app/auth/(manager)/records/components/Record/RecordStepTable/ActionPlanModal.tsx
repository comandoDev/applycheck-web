import ActionPlanRepository from "@/Repositories/ActionPlanRepository.ts"
import { IActionPlan } from "@/interfaces/ActionPlan"
import { Modal, ModalFuncProps, message } from "antd"
import { useState } from "react"
import ModalInfoContent from "./ModalInfoContent"
import { useRouter } from "next/navigation"

const ActionPlanModal = ({ actionPlan }: { actionPlan: IActionPlan }) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [solved, setSolved] = useState<boolean>(false)

    const handleCancelClick = async (actionPlanId: string) => {
        setLoading(true)

        try {
            const response = await ActionPlanRepository.solve(actionPlanId)
            setSolved(true)

            message.success(response.data.message)

            router.push(`/auth/records/one/${actionPlan.recordId}`)
        } catch (error) {
            message.error((error as any).message as string)
        } finally {
            setLoading(false)
        }
    }

    const modalInfo = (actionPlan: IActionPlan) => {
        const cancelProps = {
            okCancel: true,
            cancelText: 'Concluir',
            onCancel: () => handleCancelClick(actionPlan.id!),
            cancelButtonProps: {
                danger: true,
                loading
            },
        }

        const props = {
            title: 'Plano de Ação',
            okType: 'dashed',
            ...(actionPlan.solved || solved) ? {} : cancelProps,
            content: <ModalInfoContent actionPlan={actionPlan} />
        } as ModalFuncProps

        return (actionPlan.solved || solved) ? Modal.success(props) : Modal.warning(props)
    }
    
    return (
        <div onClick={() => modalInfo(actionPlan)} className="text-principal cursor-pointer w-full text-center">Ver</div>
    )
}

export default ActionPlanModal